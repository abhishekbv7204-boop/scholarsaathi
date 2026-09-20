import {
  ConditionEvaluation,
  ConditionResult,
  EligibilityResult,
  EligibilityStatus,
  OverallEligibilityStatus,
  Scholarship,
  ScholarshipConditionRule,
  ScholarshipMatch,
  StudentProfile,
} from '../types';

/**
 * Format Indian currency with rupees symbol
 */
export function formatCurrencyINR(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === '') return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Map EligibilityStatus enum to user-facing display string
 */
export function mapStatusToDisplay(status: EligibilityStatus): OverallEligibilityStatus {
  switch (status) {
    case 'LIKELY_ELIGIBLE':
      return 'Likely Eligible';
    case 'NEEDS_VERIFICATION':
      return 'Needs Verification';
    case 'NOT_ELIGIBLE':
      return 'Not Eligible';
  }
}

/**
 * Map user-facing display string to EligibilityStatus enum
 */
export function mapDisplayToStatus(status: OverallEligibilityStatus): EligibilityStatus {
  switch (status) {
    case 'Likely Eligible':
      return 'LIKELY_ELIGIBLE';
    case 'Needs Verification':
      return 'NEEDS_VERIFICATION';
    case 'Not Eligible':
      return 'NOT_ELIGIBLE';
  }
}

/**
 * Helper to normalize student profile fields safely (handles aliases and empty states)
 */
export function normalizeStudentProfile(student: StudentProfile) {
  const state = (student.state || '').trim();
  const district = (student.district || '').trim();
  const course = (student.course || '').trim();
  const specialization = (student.specialization || student.branch || '').trim();
  const year = (student.year || student.yearOfStudy || '').trim();

  let percentage: number | null = null;
  const rawPct = student.percentage !== undefined ? student.percentage : student.academicPercentage;
  if (rawPct !== undefined && rawPct !== null && rawPct !== '') {
    const parsed = typeof rawPct === 'number' ? rawPct : parseFloat(String(rawPct));
    if (!isNaN(parsed)) percentage = parsed;
  }

  let familyIncome: number | null = null;
  const rawIncome = student.familyIncome !== undefined ? student.familyIncome : student.annualFamilyIncome;
  if (rawIncome !== undefined && rawIncome !== null && rawIncome !== '') {
    const parsed = typeof rawIncome === 'number' ? rawIncome : parseFloat(String(rawIncome));
    if (!isNaN(parsed)) familyIncome = parsed;
  }

  const category = (student.category || '').trim();
  const institutionType = (student.institutionType || '').trim();
  const gender = (student.gender || '').trim();

  let disabilityStatus: 'Yes' | 'No' | null = null;
  if (student.disabilityStatus !== undefined && student.disabilityStatus !== null) {
    if (typeof student.disabilityStatus === 'boolean') {
      disabilityStatus = student.disabilityStatus ? 'Yes' : 'No';
    } else {
      const s = String(student.disabilityStatus).trim().toLowerCase();
      if (s === 'yes' || s === 'true' || s === 'pwd') disabilityStatus = 'Yes';
      else if (s === 'no' || s === 'false' || s === 'none') disabilityStatus = 'No';
    }
  }

  const hostelStatus = (student.hostelStatus || student.accommodation || '').trim();

  return {
    state,
    district,
    course,
    specialization,
    year,
    percentage,
    familyIncome,
    category,
    institutionType,
    gender,
    disabilityStatus,
    hostelStatus,
  };
}

/**
 * Evaluates a single condition against a student profile deterministically.
 */
export function evaluateSingleCondition(
  rule: ScholarshipConditionRule,
  student: StudentProfile,
  scholarship: Scholarship
): ConditionResult {
  const normalized = normalizeStudentProfile(student);

  switch (rule.type) {
    case 'state': {
      const eligibleStates = scholarship.eligibleStates || (scholarship.state ? [scholarship.state] : ['All India']);
      const isAllIndia =
        eligibleStates.some((s) => s.toLowerCase() === 'all india') ||
        (scholarship.state && scholarship.state.toLowerCase() === 'all india');

      const requiredDisplay = isAllIndia ? 'All India (Any State/UT)' : eligibleStates.join(', ');

      if (isAllIndia) {
        return {
          requirement: rule.name || 'State Domicile',
          studentValue: normalized.state || 'Any State / UT',
          requiredValue: requiredDisplay,
          status: 'PASS',
          explanation: `National scheme open across India. Your domicile (${normalized.state || 'All India'}) qualifies.`,
        };
      }

      if (!normalized.state) {
        return {
          requirement: rule.name || 'State Domicile',
          studentValue: 'Not specified in profile',
          requiredValue: requiredDisplay,
          status: 'NEEDS_VERIFICATION',
          explanation: `State domicile not provided in profile; scheme mandates residence in ${requiredDisplay}.`,
        };
      }

      const stateMatches = eligibleStates.some(
        (s) => s.trim().toLowerCase() === normalized.state.toLowerCase()
      );

      return {
        requirement: rule.name || 'State Domicile',
        studentValue: normalized.state,
        requiredValue: requiredDisplay,
        status: stateMatches ? 'PASS' : 'FAIL',
        explanation: stateMatches
          ? `State domicile (${normalized.state}) matches required eligible state (${requiredDisplay}).`
          : `State mismatch: Scheme requires domicile in ${requiredDisplay}, but your profile indicates ${normalized.state}.`,
      };
    }

    case 'course': {
      const requiredCourses = scholarship.courses || [];
      const requiredDisplay = requiredCourses.join(', ');

      if (!normalized.course) {
        return {
          requirement: rule.name || 'Degree Course',
          studentValue: 'Not specified',
          requiredValue: requiredDisplay,
          status: 'NEEDS_VERIFICATION',
          explanation: `Course not provided; scheme requires enrollment in [${requiredDisplay}].`,
        };
      }

      const courseMatches = requiredCourses.some(
        (c) => c.trim().toLowerCase() === normalized.course.toLowerCase()
      );

      const studentDisplay = normalized.specialization
        ? `${normalized.course} (${normalized.specialization})`
        : normalized.course;

      return {
        requirement: rule.name || 'Degree Course',
        studentValue: studentDisplay,
        requiredValue: requiredDisplay,
        status: courseMatches ? 'PASS' : 'FAIL',
        explanation: courseMatches
          ? `Your degree program (${normalized.course}) is accepted under the approved course curriculum.`
          : `Course mismatch: This scholarship accepts [${requiredDisplay}], but you are enrolled in ${normalized.course}.`,
      };
    }

    case 'year': {
      const requiredYears = scholarship.eligibleYears || scholarship.years || [];
      const requiredDisplay = requiredYears.map((y) => `${y} Year`).join(', ');

      if (!normalized.year) {
        return {
          requirement: rule.name || 'Year of Study',
          studentValue: 'Not specified',
          requiredValue: requiredDisplay,
          status: 'NEEDS_VERIFICATION',
          explanation: `Year of study not provided; scheme is open to [${requiredDisplay}].`,
        };
      }

      const yearMatches = requiredYears.some(
        (y) => y.trim().toLowerCase() === normalized.year.toLowerCase()
      );

      return {
        requirement: rule.name || 'Year of Study',
        studentValue: `${normalized.year} Year`,
        requiredValue: requiredDisplay,
        status: yearMatches ? 'PASS' : 'FAIL',
        explanation: yearMatches
          ? `Your current year of study (${normalized.year} Year) is within the eligible cohort.`
          : `Year of study mismatch: Scholarship is open to [${requiredDisplay}], but your profile is ${normalized.year} Year.`,
      };
    }

    case 'min_percentage': {
      const minPercentage =
        scholarship.minPercentage !== undefined ? scholarship.minPercentage : scholarship.minimumPercentage;

      if (normalized.percentage === null) {
        return {
          requirement: rule.name || 'Academic Marks Cut-off',
          studentValue: 'Not specified',
          requiredValue: `≥ ${minPercentage}%`,
          status: 'NEEDS_VERIFICATION',
          explanation: `Academic score not specified. Scheme mandates a minimum academic cutoff of ${minPercentage}%.`,
        };
      }

      const passed = normalized.percentage >= minPercentage;

      return {
        requirement: rule.name || 'Academic Marks Cut-off',
        studentValue: `${normalized.percentage}%`,
        requiredValue: `≥ ${minPercentage}%`,
        status: passed ? 'PASS' : 'FAIL',
        explanation: passed
          ? `Your academic score (${normalized.percentage}%) meets or exceeds the required minimum cut-off of ${minPercentage}%.`
          : `Academic score below threshold: Your score is ${normalized.percentage}%, which is below the required cut-off of ${minPercentage}%.`,
      };
    }

    case 'max_income': {
      const maxIncome =
        scholarship.maxFamilyIncome !== undefined ? scholarship.maxFamilyIncome : scholarship.maximumIncome;

      if (normalized.familyIncome === null) {
        return {
          requirement: rule.name || 'Family Income Limit',
          studentValue: 'Not specified',
          requiredValue: `≤ ${formatCurrencyINR(maxIncome)}`,
          status: 'NEEDS_VERIFICATION',
          explanation: `Annual family income not specified. Scheme requires family income ≤ ${formatCurrencyINR(maxIncome)}.`,
        };
      }

      const passed = normalized.familyIncome <= maxIncome;

      return {
        requirement: rule.name || 'Family Income Limit',
        studentValue: formatCurrencyINR(normalized.familyIncome),
        requiredValue: `≤ ${formatCurrencyINR(maxIncome)}`,
        status: passed ? 'PASS' : 'FAIL',
        explanation: passed
          ? `Your reported annual family income (${formatCurrencyINR(
              normalized.familyIncome
            )}) is within the allowable ceiling of ${formatCurrencyINR(maxIncome)}.`
          : `Income exceeds ceiling: Your reported income (${formatCurrencyINR(
              normalized.familyIncome
            )}) exceeds the maximum permissible limit of ${formatCurrencyINR(maxIncome)}.`,
      };
    }

    case 'category': {
      const categories = scholarship.categories || [];
      const requiredDisplay = categories.join(', ');

      if (!normalized.category) {
        return {
          requirement: rule.name || 'Social Category Reservation',
          studentValue: 'Not specified',
          requiredValue: requiredDisplay,
          status: 'NEEDS_VERIFICATION',
          explanation: `Category not specified; scheme reservation applies to [${requiredDisplay}].`,
        };
      }

      const isEligible = categories.some((c) => {
        const lower = c.trim().toLowerCase();
        return lower === normalized.category.toLowerCase() || lower === 'general' && normalized.category === 'General';
      });

      return {
        requirement: rule.name || 'Social Category Reservation',
        studentValue: normalized.category,
        requiredValue: requiredDisplay,
        status: isEligible ? 'PASS' : 'FAIL',
        explanation: isEligible
          ? `Your social category (${normalized.category}) is eligible under this scheme's category allocation.`
          : `Category mismatch: This scheme is reserved for [${requiredDisplay}], but your profile is ${normalized.category}.`,
      };
    }

    case 'institution': {
      const allowedInstitutions = scholarship.institutionTypes || [];
      const requiredDisplay = allowedInstitutions.join(', ');

      if (!normalized.institutionType) {
        return {
          requirement: rule.name || 'Institution Type',
          studentValue: 'Not specified',
          requiredValue: requiredDisplay,
          status: 'NEEDS_VERIFICATION',
          explanation: `Institution type not specified; scheme requires college type [${requiredDisplay}].`,
        };
      }

      const isEligible = allowedInstitutions.some(
        (inst) => inst.trim().toLowerCase() === normalized.institutionType.toLowerCase()
      );

      return {
        requirement: rule.name || 'Institution Type',
        studentValue: normalized.institutionType,
        requiredValue: requiredDisplay,
        status: isEligible ? 'PASS' : 'FAIL',
        explanation: isEligible
          ? `Your institution type (${normalized.institutionType}) is recognized under this scheme.`
          : `Institution type mismatch: This scheme applies only to [${requiredDisplay}], but you selected ${normalized.institutionType}.`,
      };
    }

    case 'gender': {
      const requiredGender = scholarship.genderRequirement || 'Female';

      if (!normalized.gender) {
        return {
          requirement: rule.name || 'Gender Requirement',
          studentValue: 'Not specified',
          requiredValue: `${requiredGender} Students Only`,
          status: 'NEEDS_VERIFICATION',
          explanation: `Scheme is exclusively open to ${requiredGender} students; gender was not specified in your profile.`,
        };
      }

      const passed = normalized.gender.toLowerCase() === requiredGender.toLowerCase();

      return {
        requirement: rule.name || 'Gender Requirement',
        studentValue: normalized.gender,
        requiredValue: `${requiredGender} Students Only`,
        status: passed ? 'PASS' : 'FAIL',
        explanation: passed
          ? `Gender requirement met (${normalized.gender}).`
          : `Gender mismatch: This scheme is exclusively for ${requiredGender} candidates, but profile is ${normalized.gender}.`,
      };
    }

    case 'disability': {
      if (normalized.disabilityStatus === null) {
        return {
          requirement: rule.name || 'Disability Status (PwD)',
          studentValue: 'Not specified',
          requiredValue: 'Certified PwD (≥40% Disability)',
          status: 'NEEDS_VERIFICATION',
          explanation:
            'Scheme is dedicated to specially-abled students with ≥40% disability; disability status was not specified in your profile.',
        };
      }

      const passed = normalized.disabilityStatus === 'Yes';

      return {
        requirement: rule.name || 'Disability Status (PwD)',
        studentValue: normalized.disabilityStatus === 'Yes' ? 'PwD Benchmark Candidate' : 'No Benchmark Disability',
        requiredValue: 'Certified PwD (≥40% Disability)',
        status: passed ? 'PASS' : 'FAIL',
        explanation: passed
          ? 'Candidate satisfies the benchmark disability reservation criteria (≥40% PwD).'
          : 'Disability criteria mismatch: Scheme is strictly reserved for candidates with benchmark disability (40%+).',
      };
    }

    case 'accommodation': {
      const requiredHostel = scholarship.hostelRequirement || 'Hosteller';

      if (!normalized.hostelStatus) {
        return {
          requirement: rule.name || 'Hostel Accommodation Status',
          studentValue: 'Not specified',
          requiredValue: `${requiredHostel} Only`,
          status: 'NEEDS_VERIFICATION',
          explanation: `Accommodation mode not specified; scheme requires candidate to be a ${requiredHostel}.`,
        };
      }

      const passed = normalized.hostelStatus.toLowerCase() === requiredHostel.toLowerCase();

      return {
        requirement: rule.name || 'Hostel Accommodation Status',
        studentValue: normalized.hostelStatus,
        requiredValue: `${requiredHostel} Only`,
        status: passed ? 'PASS' : 'FAIL',
        explanation: passed
          ? `Accommodation status (${normalized.hostelStatus}) matches scheme requirements.`
          : `Accommodation mismatch: This subsidy requires you to be a ${requiredHostel}, but your profile indicates ${normalized.hostelStatus}.`,
      };
    }

    case 'manual_verification': {
      return {
        requirement: rule.name || 'Institutional Verification',
        studentValue: 'Pending Institutional Verification',
        requiredValue: rule.requiredValueDisplay || 'Official College Seal / Endorsement',
        status: 'NEEDS_VERIFICATION',
        explanation:
          rule.description ||
          'This condition requires on-the-ground institutional verification (e.g. physical biometric logs or college department seal) that cannot be validated purely by self-reported profile data.',
      };
    }

    default: {
      return {
        requirement: rule.name || 'Scheme Specific Condition',
        studentValue: 'Pending Verification',
        requiredValue: rule.requiredValueDisplay || 'Verification against official notice',
        status: 'NEEDS_VERIFICATION',
        explanation: rule.description || 'Condition requires verification against official circular.',
      };
    }
  }
}

/**
 * Deterministic Eligibility Engine.
 * Evaluates student profile against scholarship rules strictly and transparently.
 *
 * Rules:
 * 1. If ANY clearly required condition fails -> NOT_ELIGIBLE
 * 2. If all checkable conditions pass -> LIKELY_ELIGIBLE
 * 3. If no condition clearly fails, but one or more conditions need verification / missing profile data -> NEEDS_VERIFICATION
 * 4. Every condition produces PASS, FAIL, or NEEDS_VERIFICATION.
 */
export function checkEligibility(
  student: StudentProfile,
  scholarship: Scholarship
): EligibilityResult {
  // Ensure all configured rules are evaluated
  const conditions: ConditionResult[] = (scholarship.conditions || []).map((rule) =>
    evaluateSingleCondition(rule, student, scholarship)
  );

  // If scholarship defines genderRequirement but conditions did not include a gender rule, evaluate it
  if (
    scholarship.genderRequirement &&
    scholarship.genderRequirement !== 'All' &&
    !scholarship.conditions.some((c) => c.type === 'gender')
  ) {
    conditions.push(
      evaluateSingleCondition(
        {
          id: 'auto-gender',
          name: 'Gender Requirement',
          description: `Scheme restricted to ${scholarship.genderRequirement} candidates.`,
          type: 'gender',
          isRequired: true,
          requiredValueDisplay: `${scholarship.genderRequirement} Only`,
        },
        student,
        scholarship
      )
    );
  }

  // If scholarship defines disabilityRequirement but conditions did not include disability rule, evaluate it
  if (
    scholarship.disabilityRequirement &&
    !scholarship.conditions.some((c) => c.type === 'disability')
  ) {
    conditions.push(
      evaluateSingleCondition(
        {
          id: 'auto-disability',
          name: 'Disability Status (PwD)',
          description: 'Restricted to candidates with certified benchmark disability (40%+).',
          type: 'disability',
          isRequired: true,
          requiredValueDisplay: 'Certified PwD (≥40%)',
        },
        student,
        scholarship
      )
    );
  }

  // If scholarship defines hostelRequirement but conditions did not include accommodation rule, evaluate it
  if (
    scholarship.hostelRequirement &&
    scholarship.hostelRequirement !== 'All' &&
    !scholarship.conditions.some((c) => c.type === 'accommodation')
  ) {
    conditions.push(
      evaluateSingleCondition(
        {
          id: 'auto-hostel',
          name: 'Accommodation Status',
          description: `Restricted to ${scholarship.hostelRequirement} students.`,
          type: 'accommodation',
          isRequired: true,
          requiredValueDisplay: `${scholarship.hostelRequirement} Only`,
        },
        student,
        scholarship
      )
    );
  }

  let passedCount = 0;
  let failedCount = 0;
  let verificationCount = 0;

  for (const c of conditions) {
    if (c.status === 'PASS') {
      passedCount++;
    } else if (c.status === 'FAIL') {
      failedCount++;
    } else if (c.status === 'NEEDS_VERIFICATION') {
      verificationCount++;
    }
  }

  let overallStatus: EligibilityStatus;
  let explanation = '';

  if (failedCount > 0) {
    overallStatus = 'NOT_ELIGIBLE';
    const failedNames = conditions
      .filter((c) => c.status === 'FAIL')
      .map((c) => c.requirement)
      .join(', ');
    explanation = `This scholarship does not match one or more currently checkable requirements (${failedNames}).`;
  } else if (verificationCount > 0) {
    overallStatus = 'NEEDS_VERIFICATION';
    explanation = `Some conditions require verification (${verificationCount} requirement(s) pending institutional proof or additional documentation).`;
  } else {
    overallStatus = 'LIKELY_ELIGIBLE';
    explanation = `You appear likely to meet the currently checkable requirements (${passedCount} conditions satisfied based on self-reported profile).`;
  }

  return {
    scholarshipId: scholarship.id,
    scholarshipName: scholarship.name,
    overallStatus,
    conditions,
    passedCount,
    failedCount,
    verificationCount,
    explanation,
  };
}

/**
 * Builds a complete ScholarshipMatch object for UI consumption.
 */
export function evaluateScholarshipMatch(
  scholarship: Scholarship,
  student: StudentProfile
): ScholarshipMatch {
  const result = checkEligibility(student, scholarship);
  const status = mapStatusToDisplay(result.overallStatus);

  // Map ConditionResult to ConditionEvaluation for UI component compatibility
  const evaluations: ConditionEvaluation[] = result.conditions.map((c, index) => {
    const id = (scholarship.conditions[index] && scholarship.conditions[index].id) || `c-${index}`;
    const isRequired =
      (scholarship.conditions[index] && scholarship.conditions[index].isRequired) !== undefined
        ? scholarship.conditions[index].isRequired
        : true;

    const mappedStatus: 'passed' | 'failed' | 'needs_verification' =
      c.status === 'PASS' ? 'passed' : c.status === 'FAIL' ? 'failed' : 'needs_verification';

    return {
      id,
      condition: c.requirement,
      requirement: c.requirement,
      studentValue: c.studentValue,
      requiredValue: c.requiredValue,
      status: mappedStatus,
      resultStatus: c.status,
      explanation: c.explanation,
      isRequired,
    };
  });

  return {
    scholarship,
    status,
    eligibilityStatus: result.overallStatus,
    result,
    evaluations,
    passedCount: result.passedCount,
    failedCount: result.failedCount,
    needsVerificationCount: result.verificationCount,
    explanation: result.explanation,
  };
}

/**
 * Evaluates all scholarships in the dataset against the given student profile.
 * Sorts with Likely Eligible first, then Needs Verification, then Not Eligible.
 */
export function evaluateAllScholarships(
  scholarships: Scholarship[],
  student: StudentProfile
): ScholarshipMatch[] {
  const matches = scholarships.map((s) => evaluateScholarshipMatch(s, student));

  // Natural sorting: Likely Eligible -> Needs Verification -> Not Eligible
  const priorityOrder: Record<OverallEligibilityStatus, number> = {
    'Likely Eligible': 1,
    'Needs Verification': 2,
    'Not Eligible': 3,
  };

  return matches.sort((a, b) => {
    const orderDiff = priorityOrder[a.status] - priorityOrder[b.status];
    if (orderDiff !== 0) return orderDiff;
    // Secondary sort: highest passed count
    return b.passedCount - a.passedCount;
  });
}
