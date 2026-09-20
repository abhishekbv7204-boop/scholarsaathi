export type CourseOption =
  | 'B.E.'
  | 'B.Tech'
  | 'B.Sc'
  | 'B.Com'
  | 'B.A.'
  | 'Diploma'
  | 'Other'
  | string;

export type YearOfStudy = '1st' | '2nd' | '3rd' | '4th' | string;

export type InstitutionType =
  | 'Government'
  | 'Government-aided'
  | 'Private'
  | 'Other'
  | string;

export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'Other' | string;

export type AccommodationType = 'Day Scholar' | 'Hosteller' | string;

export type GenderType = 'Male' | 'Female' | 'Transgender' | 'Other' | string;

export type DisabilityType = 'Yes' | 'No' | 'None' | boolean | string;

/**
 * Reusable Student Profile definition.
 * Safely handles optional and alias properties.
 */
export interface StudentProfile {
  name?: string;
  state: string;
  district: string;
  age?: number | string;
  course: CourseOption;
  specialization?: string;
  branch?: string; // alias for specialization
  year?: YearOfStudy;
  yearOfStudy?: YearOfStudy; // alias for year
  percentage?: number | string;
  academicPercentage?: number | string; // alias for percentage
  familyIncome?: number | string;
  annualFamilyIncome?: number | string; // alias for familyIncome
  category: SocialCategory;
  institutionType: InstitutionType;
  gender?: GenderType;
  disabilityStatus?: DisabilityType;
  hostelStatus?: AccommodationType;
  accommodation?: AccommodationType; // alias for hostelStatus
}

/**
 * Condition evaluation status
 */
export type ConditionStatus =
  | 'PASS'
  | 'FAIL'
  | 'NEEDS_VERIFICATION'
  | 'passed'
  | 'failed'
  | 'needs_verification';

/**
 * Primary Eligibility Statuses
 */
export type EligibilityStatus =
  | 'LIKELY_ELIGIBLE'
  | 'NEEDS_VERIFICATION'
  | 'NOT_ELIGIBLE';

export type OverallEligibilityStatus =
  | 'Likely Eligible'
  | 'Needs Verification'
  | 'Not Eligible';

/**
 * Result of evaluating a single condition
 */
export interface ConditionResult {
  requirement: string;
  studentValue: string;
  requiredValue: string;
  status: 'PASS' | 'FAIL' | 'NEEDS_VERIFICATION';
  explanation: string;
}

/**
 * UI-compatible evaluation structure (backwards-compatible with existing pages)
 */
export interface ConditionEvaluation {
  id: string;
  condition: string; // alias for requirement
  requirement: string;
  studentValue: string;
  requiredValue: string;
  resultStatus: 'PASS' | 'FAIL' | 'NEEDS_VERIFICATION';
  status: 'passed' | 'failed' | 'needs_verification'; // for UI compatibility
  explanation: string;
  isRequired: boolean;
}

/**
 * Overall Eligibility Result for a scholarship
 */
export interface EligibilityResult {
  scholarshipId: string;
  scholarshipName: string;
  overallStatus: EligibilityStatus;
  conditions: ConditionResult[];
  passedCount: number;
  failedCount: number;
  verificationCount: number;
  explanation: string;
}

export interface ScholarshipConditionRule {
  id: string;
  name: string;
  description: string;
  type:
    | 'state'
    | 'course'
    | 'year'
    | 'category'
    | 'institution'
    | 'min_percentage'
    | 'max_income'
    | 'accommodation'
    | 'gender'
    | 'disability'
    | 'manual_verification';
  isRequired: boolean;
  requiredValueDisplay: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  state: string; // 'All India' or specific state like 'Karnataka'
  eligibleStates: string[];
  categories: SocialCategory[];
  courses: CourseOption[];
  eligibleYears: YearOfStudy[];
  years: YearOfStudy[]; // alias for eligibleYears
  institutionTypes: InstitutionType[];
  minPercentage: number;
  minimumPercentage: number; // alias for minPercentage
  maxFamilyIncome: number; // in INR
  maximumIncome: number; // alias for maxFamilyIncome
  documents: string[];
  conditions: ScholarshipConditionRule[];
  benefits: string;
  applicationInformation: string;
  sourceTitle: string;
  sourceUrl: string;
  lastVerified: string;
  isDemo: boolean;
  genderRequirement?: 'Female' | 'Male' | 'Transgender' | 'All';
  disabilityRequirement?: boolean | string;
  hostelRequirement?: 'Hosteller' | 'Day Scholar' | 'All';
  accommodationAllowed?: AccommodationType[];
  awardAmount?: string;
  applicationDeadline?: string;
  deadline?: string; // alias for applicationDeadline
}

export interface ScholarshipMatch {
  scholarship: Scholarship;
  status: OverallEligibilityStatus;
  eligibilityStatus: EligibilityStatus;
  result: EligibilityResult;
  evaluations: ConditionEvaluation[];
  passedCount: number;
  failedCount: number;
  needsVerificationCount: number;
  explanation: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description?: string;
  requiredForScholarshipIds: string[];
}

export type ActivePage =
  | 'landing'
  | 'profile'
  | 'results'
  | 'details'
  | 'why'
  | 'documents'
  | 'dashboard'
  | 'assistant'
  | 'help'
  | 'how-it-works'
  | 'scholarships';
