import { ScholarshipMatch, StudentProfile } from '../types';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  referenceScholarshipId?: string;
}

export const DEFAULT_SUGGESTED_QUESTIONS = [
  'Why did I get this result?',
  'What documents do I need?',
  'Explain this scholarship',
  'What should I verify?',
  'What does family income limit mean?',
  'What should I check before applying?',
];

/**
 * Service call to backend POST /api/assistant.
 * Keeps API keys secure on server side and handles fallback/unavailable state gracefully.
 */
export async function askScholarSaathiAssistant({
  question,
  studentProfile,
  scholarship,
  eligibilityResult,
}: {
  question: string;
  studentProfile: StudentProfile | null;
  scholarship: any;
  eligibilityResult: any;
}): Promise<string> {
  try {
    const response = await fetch('/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        studentProfile,
        scholarship,
        eligibilityResult,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data && typeof data.answer === 'string' && data.answer.trim()) {
      return data.answer;
    }
    return "I don't have enough verified information in ScholarSaathi to answer that accurately.";
  } catch (err) {
    console.warn('Backend assistant request failed, applying local deterministic fallback:', err);
    try {
      const fallbackMatches = eligibilityResult ? [eligibilityResult] : [];
      const localAnswer = generateLocalAssistantResponse(
        question,
        fallbackMatches,
        studentProfile,
        scholarship?.id
      );
      if (localAnswer) return localAnswer;
    } catch (fallbackErr) {
      console.warn('Local fallback generator error:', fallbackErr);
    }
    return 'Assistant is operating in offline mode. You can view the full eligibility explanation and evidence above.';
  }
}

/**
 * Generate a deterministic, grounded answer strictly based on active scholarship matches and student profile.
 */
export function generateLocalAssistantResponse(
  question: string,
  matches: ScholarshipMatch[],
  student: StudentProfile | null,
  activeScholarshipId?: string
): string {
  if (!student) {
    return 'Please complete your student profile or click "Try Demo" so I can analyze your eligibility against our structured dataset.';
  }

  const q = question.toLowerCase().trim();
  const selectedMatch = activeScholarshipId
    ? matches.find((m) => m.scholarship.id === activeScholarshipId)
    : matches.find((m) => m.status === 'Likely Eligible') || matches[0];

  // 1. "Why did I get this result?" or questions about results/status
  if (
    q.includes('why did i get') ||
    q.includes('why this result') ||
    q.includes('why am i') ||
    q.includes('why eligible') ||
    q.includes('why not eligible')
  ) {
    if (!selectedMatch) {
      return 'I do not have any evaluated scholarships yet. Please run an eligibility check first.';
    }

    const { scholarship, status, evaluations } = selectedMatch;
    const passed = evaluations.filter((e) => e.status === 'passed');
    const failed = evaluations.filter((e) => e.status === 'failed');
    const pending = evaluations.filter((e) => e.status === 'needs_verification');

    let response = `For "${scholarship.name}", your status is: **${status}**.\n\n`;

    if (status === 'Likely Eligible') {
      response += `Here is why you are likely eligible:\n`;
      passed.forEach((p) => {
        response += `• **${p.condition}**: ${p.explanation} (Your value: ${p.studentValue} | Required: ${p.requiredValue})\n`;
      });
      response += `\n*Note: ScholarSaathi provides guidance based on demo dataset rules. Always verify final guidelines with official authority.*`;
    } else if (status === 'Needs Verification') {
      response += `All baseline criteria passed, but manual verification is required:\n`;
      pending.forEach((p) => {
        response += `• ⚠ **${p.condition}**: ${p.explanation} (Required: ${p.requiredValue})\n`;
      });
      response += `\nYou will need to obtain the necessary institutional certificates before applying.`;
    } else {
      response += `This scheme is marked **Not Eligible** because one or more required rules were not met:\n`;
      failed.forEach((f) => {
        response += `• ✕ **${f.condition}**: ${f.explanation} (Your profile: ${f.studentValue} | Required: ${f.requiredValue})\n`;
      });
    }

    return response;
  }

  // 2. "What documents do I need?" or document queries
  if (q.includes('document') || q.includes('documents') || q.includes('papers') || q.includes('certificate')) {
    if (!selectedMatch) {
      // Gather all unique documents across Likely Eligible scholarships
      const eligibleMatches = matches.filter((m) => m.status === 'Likely Eligible');
      const docs = Array.from(
        new Set(eligibleMatches.flatMap((m) => m.scholarship.documents))
      );

      if (docs.length === 0) {
        return 'Based on current evaluated scholarships, no documents are currently queued. Review your profile or select a scholarship.';
      }

      return (
        `Here are the key documents required for your potential matches:\n\n` +
        docs.map((d, i) => `${i + 1}. ${d}`).join('\n') +
        `\n\nYou can track and check off these documents directly in the **Document Checklist** tab.`
      );
    }

    return (
      `For **${selectedMatch.scholarship.name}**, the required documents from our dataset are:\n\n` +
      selectedMatch.scholarship.documents.map((d, i) => `${i + 1}. ${d}`).join('\n') +
      `\n\nMake sure all certificates (income, caste, bonafide) are updated for the current financial year.`
    );
  }

  // 3. "Which condition did I fail?" or failure queries
  if (q.includes('fail') || q.includes('failed') || q.includes('disqualified') || q.includes('which condition')) {
    const failedMatches = matches.filter((m) => m.status === 'Not Eligible');
    if (failedMatches.length === 0) {
      return 'Great news! In your current evaluation, there are no failed scholarships. All matching criteria either passed or require verification.';
    }

    let report = `Here are the specific conditions that failed in your evaluated scholarships:\n\n`;
    failedMatches.forEach((m) => {
      const failedConds = m.evaluations.filter((e) => e.status === 'failed');
      report += `**${m.scholarship.name}**:\n`;
      failedConds.forEach((f) => {
        report += `• ✕ **${f.condition}**: ${f.explanation}\n`;
      });
      report += `\n`;
    });
    return report;
  }

  // 4. "Explain this scholarship" or scholarship overview
  if (q.includes('explain') || q.includes('about') || q.includes('overview') || q.includes('details')) {
    if (!selectedMatch) {
      return 'Please choose a scholarship card from the Results or Details page, and I will explain its rules and award details.';
    }

    const s = selectedMatch.scholarship;
    return (
      `**${s.name}**\n\n` +
      `• **Provider**: ${s.provider}\n` +
      `• **Award Value**: ${s.awardAmount || 'Standard government grant'}\n` +
      `• **Scope**: ${s.state} (Eligible Courses: ${s.courses.join(', ')})\n` +
      `• **Income Ceiling**: ₹${s.maximumIncome.toLocaleString('en-IN')}\n` +
      `• **Min Marks**: ${s.minimumPercentage}%\n` +
      `• **Official Source**: [${s.sourceTitle}](${s.sourceUrl})\n\n` +
      `**Description**: ${s.description}\n\n` +
      `*Dataset status: DEMO DATA (Last verified: ${s.lastVerified})*`
    );
  }

  // 5. General / fallback answering strictly grounded in dataset
  // Search if user mentioned any specific scholarship keyword
  const keywordMatch = matches.find(
    (m) =>
      m.scholarship.name.toLowerCase().includes(q) ||
      m.scholarship.provider.toLowerCase().includes(q)
  );

  if (keywordMatch) {
    return (
      `Regarding **${keywordMatch.scholarship.name}**:\n` +
      `Your current evaluated status is **${keywordMatch.status}** with ${keywordMatch.passedCount} conditions passed and ${keywordMatch.failedCount} conditions failed.\n` +
      `Official Source: ${keywordMatch.scholarship.sourceTitle} (${keywordMatch.scholarship.sourceUrl}).`
    );
  }

  // If outside available dataset
  return (
    "I don't have enough information in the current dataset. Please verify the official source.\n\n" +
    "You can ask me about:\n" +
    "• Why you received a specific eligibility status\n" +
    "• Required documents and certificates\n" +
    "• Which specific rules or income cut-offs passed or failed\n" +
    "• Details regarding any scholarship in our dataset."
  );
}
