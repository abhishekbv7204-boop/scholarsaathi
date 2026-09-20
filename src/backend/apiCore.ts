import { SCHOLARSHIPS_DATASET } from '../data/scholarships';
import { evaluateAllScholarships } from '../services/eligibilityEngine';
import { Scholarship, ScholarshipMatch, StudentProfile } from '../types';
import { GoogleGenAI } from '@google/genai';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

/**
 * Filter options for GET /api/scholarships
 */
export interface ScholarshipFilters {
  state?: string;
  category?: string;
  course?: string;
  query?: string;
}

/**
 * 1. GET /api/scholarships implementation
 */
export function getScholarshipsList(filters: ScholarshipFilters = {}) {
  let list = [...SCHOLARSHIPS_DATASET];

  if (filters.state) {
    const s = filters.state.toLowerCase();
    list = list.filter(
      (item) =>
        (item.state && item.state.toLowerCase() === s) ||
        (item.eligibleStates && item.eligibleStates.some((st) => st.toLowerCase() === s)) ||
        item.state === 'All India'
    );
  }

  if (filters.category) {
    const c = filters.category.toLowerCase();
    list = list.filter(
      (item) =>
        !item.categories ||
        item.categories.length === 0 ||
        item.categories.some((cat) => cat.toLowerCase() === c || cat.toLowerCase() === 'all')
    );
  }

  if (filters.course) {
    const cr = filters.course.toLowerCase();
    list = list.filter(
      (item) =>
        !item.courses ||
        item.courses.length === 0 ||
        item.courses.some((course) => course.toLowerCase().includes(cr))
    );
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.provider && item.provider.toLowerCase().includes(q))
    );
  }

  return {
    scholarships: list,
    count: list.length,
    total: SCHOLARSHIPS_DATASET.length,
  };
}

/**
 * 2. GET /api/scholarships/:id implementation
 */
export function getScholarshipById(id: string): { scholarship: Scholarship | null } {
  const found = SCHOLARSHIPS_DATASET.find((s) => s.id === id) || null;
  return { scholarship: found };
}

/**
 * 3. POST /api/eligibility/check implementation
 * Calls the SAME deterministic eligibility engine used across ScholarSaathi.
 */
export function checkEligibilityCore(studentProfile: StudentProfile): {
  results: ScholarshipMatch[];
  evaluatedAt: string;
  totalEvaluated: number;
} {
  if (!studentProfile) {
    throw new Error('studentProfile is required in request body');
  }

  // Pure deterministic evaluation using the official dataset and rule engine
  const results = evaluateAllScholarships(SCHOLARSHIPS_DATASET, studentProfile);

  return {
    results,
    evaluatedAt: new Date().toISOString(),
    totalEvaluated: results.length,
  };
}

/**
 * Deterministic local fallback generator for assistant explanations
 */
export function generateLocalAssistantAnswer(
  question: string,
  studentProfile: any,
  scholarship: any,
  eligibilityResult: any
): string {
  const q = (question || '').toLowerCase().trim();

  if (!scholarship) {
    return (
      "I don't have enough verified information in ScholarSaathi to answer that accurately. " +
      'Please select a scholarship from your results or browse list so I can explain its specific rules.'
    );
  }

  const name = scholarship.name || 'this scholarship';
  const provider = scholarship.provider || 'the issuing authority';
  const sourceTitle = scholarship.sourceTitle || 'Official Portal';
  const sourceUrl = scholarship.sourceUrl || '';
  const documents: string[] = Array.isArray(scholarship.documents) ? scholarship.documents : [];
  const status =
    eligibilityResult?.overallStatus ||
    eligibilityResult?.status ||
    'Needs Verification';

  const conditions: any[] =
    eligibilityResult?.conditions ||
    eligibilityResult?.evaluations ||
    [];

  const passedConds = conditions.filter(
    (c) => c.status === 'PASS' || c.status === 'passed'
  );
  const failedConds = conditions.filter(
    (c) => c.status === 'FAIL' || c.status === 'failed'
  );
  const pendingConds = conditions.filter(
    (c) =>
      c.status === 'NEEDS_VERIFICATION' || c.status === 'needs_verification'
  );

  // 1. "Why did I get this result?" / "Why am I not eligible?" / "Why am I eligible?"
  if (
    q.includes('why did i get') ||
    q.includes('why this result') ||
    q.includes('why am i') ||
    q.includes('why not eligible') ||
    q.includes('why eligible') ||
    q.includes('reason')
  ) {
    let text = `For **${name}**, your deterministic status is **${status}**.\n\n`;

    if (status === 'LIKELY_ELIGIBLE' || status === 'Likely Eligible') {
      text += `You satisfy all mandatory baseline criteria in our verified dataset:\n`;
      passedConds.forEach((p) => {
        const condName = p.requirement || p.condition || 'Requirement';
        text += `• **${condName}**: ${p.explanation || 'Requirement satisfied'}\n`;
      });
      text += `\n*Please remember: ScholarSaathi provides guidance based on verified criteria. Always verify final guidelines and submit applications on the official portal (${sourceTitle}: ${sourceUrl}).*`;
      return text;
    }

    if (status === 'NEEDS_VERIFICATION' || status === 'Needs Verification') {
      text += `You meet the general qualification filters, but additional institutional verification is required:\n`;
      pendingConds.forEach((p) => {
        const condName = p.requirement || p.condition || 'Verification Item';
        text += `• **${condName}**: ${p.explanation || p.requiredValue || 'Verification needed'}\n`;
      });
      text += `\n*Ensure you obtain the required certificates from your college or competent authority before applying on the official portal (${sourceTitle}).*`;
      return text;
    }

    // Not Eligible
    text += `You do not meet one or more mandatory eligibility requirements for this scheme:\n`;
    if (failedConds.length > 0) {
      failedConds.forEach((f) => {
        const condName = f.requirement || f.condition || 'Rule';
        text += `• **${condName}**: ${f.explanation || `Required: ${f.requiredValue}, Your profile: ${f.studentValue}`}\n`;
      });
    } else {
      text += `• Profile values do not match the scheme criteria.\n`;
    }
    text += `\n*Note: ScholarSaathi deterministic engine evaluated your profile against published criteria. Check ${sourceTitle} for any revised guidelines.*`;
    return text;
  }

  // 2. "What documents do I need?"
  if (
    q.includes('document') ||
    q.includes('documents') ||
    q.includes('paper') ||
    q.includes('papers') ||
    q.includes('certificate')
  ) {
    if (documents.length === 0) {
      return (
        `No specific documents are listed in the current dataset for **${name}**. ` +
        `Please consult ${sourceTitle} (${sourceUrl}) for the full checklist of required uploads.`
      );
    }
    let text = `For **${name}**, you need the following verified documents:\n\n`;
    documents.forEach((doc, idx) => {
      text += `${idx + 1}. **${doc}**\n`;
    });
    text += `\n*Ensure documents are updated for the current academic session. Verify full upload specifications on ${sourceTitle} (${sourceUrl}).*`;
    return text;
  }

  // 3. "Explain this scholarship"
  if (
    q.includes('explain') ||
    q.includes('overview') ||
    q.includes('about') ||
    q.includes('summary') ||
    q.includes('details')
  ) {
    const incomeDisplay = scholarship.maximumIncome
      ? `₹${Number(scholarship.maximumIncome).toLocaleString('en-IN')}/year`
      : 'As per scheme rules';
    const marksDisplay = scholarship.minimumPercentage
      ? `${scholarship.minimumPercentage}%`
      : 'Passing marks';

    let text = `**${name}** is offered by **${provider}**.\n\n`;
    if (scholarship.description) {
      text += `${scholarship.description}\n\n`;
    }
    text += `• **Key Benefit**: ${scholarship.awardAmount || scholarship.benefits || 'Financial assistance / fee waiver'}\n`;
    text += `• **Annual Income Ceiling**: ${incomeDisplay}\n`;
    text += `• **Academic Requirement**: Minimum ${marksDisplay}\n`;
    text += `• **Scope**: ${scholarship.state || 'All India'}\n\n`;
    text += `*Always verify latest dates, eligibility, and official notifications directly at ${sourceTitle} (${sourceUrl}).*`;
    return text;
  }

  // 4. "What should I verify?"
  if (
    q.includes('verify') ||
    q.includes('verification') ||
    q.includes('what should i check') ||
    q.includes('check before applying')
  ) {
    let text = `Before applying for **${name}**, check and verify the following:\n\n`;
    if (pendingConds.length > 0) {
      pendingConds.forEach((p) => {
        const condName = p.requirement || p.condition || 'Item';
        text += `• **${condName}**: ${p.explanation || 'Verify institutional documentation'}\n`;
      });
    } else {
      text += `• Confirm your college is registered on the state/central scholarship portal.\n`;
      text += `• Verify that your Aadhaar is linked to your active bank account for DBT payments.\n`;
      text += `• Confirm current year income and caste certificates are valid and unexpired.\n`;
    }
    text += `\n*Visit the official portal at ${sourceTitle} (${sourceUrl}) to verify active application dates.*`;
    return text;
  }

  // 5. "What does family income limit mean?"
  if (q.includes('family income') || q.includes('income limit') || q.includes('income ceiling')) {
    const limit = scholarship.maximumIncome
      ? `₹${Number(scholarship.maximumIncome).toLocaleString('en-IN')}`
      : 'the specified ceiling';
    return (
      `The family income limit for **${name}** is **${limit} per year**.\n\n` +
      `• This means the combined gross annual income of both parents/guardians from all sources (salary, business, agriculture, pension) must not exceed this amount.\n` +
      `• You must submit a valid Government Income Certificate issued by the competent revenue authority (such as Tahsildar or Revenue Inspector) for the current financial year.\n\n` +
      `*Verify the exact certificate issuing authority guidelines on ${sourceTitle} (${sourceUrl}).*`
    );
  }

  // Fallback for unverified questions
  return (
    "I don't have enough verified information in ScholarSaathi to answer that accurately. " +
    `You can review verified details for **${name}** on the official portal: [${sourceTitle}](${sourceUrl}).`
  );
}

/**
 * 4. POST /api/assistant implementation
 * Supports Amazon Bedrock (when configured in AWS), Google Gemini, or Deterministic Local Fallback.
 */
export async function handleAssistantQuery({
  question,
  studentProfile,
  scholarship,
  eligibilityResult,
}: {
  question: string;
  studentProfile?: any;
  scholarship?: any;
  eligibilityResult?: any;
}): Promise<string> {
  if (!question || typeof question !== 'string' || !question.trim()) {
    throw new Error('Question is required');
  }

  const systemInstruction = `
You are the ScholarSaathi AI Assistant, an informative, supportive guide for Indian students navigating scholarships.

IMPORTANT RULES & ARCHITECTURAL DIRECTIVES:
1. The deterministic eligibility engine is the absolute source of truth. You MUST NOT independently determine or recalculate scholarship eligibility. Do NOT override the engine's status (Likely Eligible, Needs Verification, Not Eligible).
2. AI is strictly used to explain structured scholarship information and condition results in simple, student-friendly language.
3. GROUNDING: Answer ONLY using the provided structured scholarship data, student profile, condition results, and documents.
4. STRICT NEGATIVE CONSTRAINTS:
   - Do NOT invent scholarships.
   - Do NOT invent eligibility requirements.
   - Do NOT invent application deadlines.
   - Do NOT invent benefits or award amounts.
   - Do NOT claim official eligibility (always clarify that ScholarSaathi provides guidance based on verified criteria, not official grants).
   - Do NOT override the deterministic engine.
   - Do NOT fabricate sources. Only refer to the provided official sourceTitle and sourceUrl.
5. FALLBACK RULE: If the user asks for information not present in the provided structured context, respond with:
   "I don't have enough verified information in ScholarSaathi to answer that accurately."
6. SIMPLE LANGUAGE: Keep responses concise, clear, empathetic, and student-friendly. Use bullet points where appropriate.
7. SOURCE AWARENESS: Whenever discussing a scholarship, mention that students must verify the latest official guidelines and deadlines on the official source.
`.trim();

  const contextPayload = {
    scholarship: scholarship
      ? {
          name: scholarship.name,
          provider: scholarship.provider,
          description: scholarship.description,
          state: scholarship.state,
          courses: scholarship.courses,
          minimumPercentage: scholarship.minimumPercentage || scholarship.minPercentage,
          maximumIncome: scholarship.maximumIncome || scholarship.maxFamilyIncome,
          awardAmount: scholarship.awardAmount || scholarship.benefits,
          documents: scholarship.documents,
          sourceTitle: scholarship.sourceTitle,
          sourceUrl: scholarship.sourceUrl,
          lastVerified: scholarship.lastVerified,
        }
      : null,
    studentProfile: studentProfile
      ? {
          name: studentProfile.name,
          state: studentProfile.state,
          course: studentProfile.course,
          year: studentProfile.year || studentProfile.yearOfStudy,
          percentage: studentProfile.percentage || studentProfile.academicPercentage,
          familyIncome: studentProfile.familyIncome || studentProfile.annualFamilyIncome,
          category: studentProfile.category,
          institutionType: studentProfile.institutionType,
          gender: studentProfile.gender,
          disabilityStatus: studentProfile.disabilityStatus,
          hostelStatus: studentProfile.hostelStatus || studentProfile.accommodation,
        }
      : null,
    eligibilityResult: eligibilityResult
      ? {
          overallStatus: eligibilityResult.overallStatus || eligibilityResult.status,
          passedCount: eligibilityResult.passedCount,
          failedCount: eligibilityResult.failedCount,
          verificationCount:
            eligibilityResult.verificationCount || eligibilityResult.needsVerificationCount,
          conditions: (eligibilityResult.conditions || eligibilityResult.evaluations || []).map(
            (c: any) => ({
              requirement: c.requirement || c.condition,
              studentValue: c.studentValue,
              requiredValue: c.requiredValue,
              status: c.status || c.resultStatus,
              explanation: c.explanation,
            })
          ),
        }
      : null,
  };

  const userPrompt = `
User Question: "${question}"

Structured Context:
${JSON.stringify(contextPayload, null, 2)}

Provide a concise, simple, student-friendly explanation following all instructions.
`.trim();

  // Mode A: Check if Amazon Bedrock is explicitly enabled or configured with credentials/IAM role
  const hasAwsCredsOrRole = Boolean(
    process.env.AWS_ACCESS_KEY_ID ||
    process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI ||
    process.env.AWS_EXECUTION_ENV ||
    process.env.AWS_LAMBDA_FUNCTION_NAME
  );
  const useBedrock =
    process.env.USE_AWS_BEDROCK === 'true' ||
    (Boolean(process.env.AWS_BEDROCK_MODEL_ID) && hasAwsCredsOrRole);

  if (useBedrock) {
    try {
      const region = process.env.AWS_REGION || 'us-east-1';
      const modelId =
        process.env.AWS_BEDROCK_MODEL_ID || 'anthropic.claude-3-haiku-20240307-v1:0';

      const bedrock = new BedrockRuntimeClient({ region });

      if (modelId.startsWith('anthropic.')) {
        const payload = {
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 600,
          system: systemInstruction,
          messages: [{ role: 'user', content: userPrompt }],
          temperature: 0.2,
        };

        const command = new InvokeModelCommand({
          modelId,
          contentType: 'application/json',
          accept: 'application/json',
          body: JSON.stringify(payload),
        });

        const res = await bedrock.send(command);
        const decoded = new TextDecoder().decode(res.body);
        const jsonRes = JSON.parse(decoded);
        const answer = jsonRes.content?.[0]?.text;
        if (answer) return answer;
      }
    } catch (bedrockErr) {
      console.warn('AWS Bedrock invocation skipped/failed, trying next provider:', bedrockErr);
    }
  }

  // Mode B: Check if Google Gemini API key is configured
  const rawApiKey = process.env.GEMINI_API_KEY;
  const hasValidApiKey =
    rawApiKey &&
    rawApiKey.trim() !== '' &&
    rawApiKey !== 'MY_GEMINI_API_KEY';

  if (hasValidApiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: rawApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const answer = response.text;
      if (answer) return answer;
    } catch (geminiErr) {
      console.warn('Gemini API call failed, falling back to deterministic local answer:', geminiErr);
    }
  }

  // Mode C: Deterministic Local Generator
  return generateLocalAssistantAnswer(
    question,
    studentProfile,
    scholarship,
    eligibilityResult
  );
}
