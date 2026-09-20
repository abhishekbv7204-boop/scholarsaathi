import React from 'react';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Sparkles,
  XCircle,
  AlertTriangle,
  Check,
  X,
  Award,
  Send,
  Square,
  CheckSquare,
} from 'lucide-react';
import { ScholarshipMatch, StudentProfile } from '../types';
import { EvidenceSection } from '../components/EvidenceSection';
import { useLanguage } from '../context/LanguageContext';

interface ScholarshipDetailsPageProps {
  match: ScholarshipMatch;
  student: StudentProfile | null;
  onBack: () => void;
  onViewWhyResult: (scholarshipId: string) => void;
  onAskAssistant: (scholarshipId: string) => void;
  preparedDocs?: Record<string, boolean>;
  onToggleDoc?: (docName: string) => void;
}

export const ScholarshipDetailsPage: React.FC<ScholarshipDetailsPageProps> = ({
  match,
  student,
  onBack,
  onViewWhyResult,
  onAskAssistant,
  preparedDocs = {},
  onToggleDoc,
}) => {
  const { language, t, translateDoc } = useLanguage();
  const { scholarship, status, evaluations, passedCount, failedCount, needsVerificationCount } = match;

  const totalDocs = scholarship.documents.length;
  const readyDocsCount = scholarship.documents.filter((d) => !!preparedDocs[d]).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 w-full overflow-x-hidden" id="main-content">
      {/* Top Back Navigation */}
      <div>
        <button
          id="details-back-to-results-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2545] hover:underline focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{t.buttons.back}</span>
        </button>
      </div>

      {/* 1. OVERVIEW SECTION */}
      <header className="rounded-lg border border-slate-300 bg-white p-5 sm:p-8 space-y-5 shadow-xs" aria-labelledby="scheme-overview-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          {/* Accessible Status Badge - Never relies on color alone */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {status === 'Likely Eligible' && (
              <span className="inline-flex items-center gap-1.5 rounded border-2 border-emerald-600 bg-emerald-50 px-3 py-1 font-bold text-emerald-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wide font-black">{t.status.likelyEligible}</span>
                <span className="rounded bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.5">PASS</span>
                <span className="text-[11px] font-semibold text-emerald-800">[Criteria Satisfied]</span>
              </span>
            )}
            {status === 'Needs Verification' && (
              <span className="inline-flex items-center gap-1.5 rounded border-2 border-amber-600 bg-amber-50 px-3 py-1 font-bold text-amber-950">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wide font-black">{t.status.needsVerification}</span>
                <span className="rounded bg-amber-700 text-white text-[10px] font-black px-1.5 py-0.5">VERIFY</span>
                <span className="text-[11px] font-semibold text-amber-800">[Document Check]</span>
              </span>
            )}
            {status === 'Not Eligible' && (
              <span className="inline-flex items-center gap-1.5 rounded border-2 border-rose-600 bg-rose-50 px-3 py-1 font-bold text-rose-950">
                <XCircle className="h-4 w-4 text-rose-700 shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wide font-black">{t.status.notEligible}</span>
                <span className="rounded bg-rose-700 text-white text-[10px] font-black px-1.5 py-0.5">FAIL</span>
                <span className="text-[11px] font-semibold text-rose-800">[Criteria Not Met]</span>
              </span>
            )}

            <span className="rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-700">
              {scholarship.state
                ? `${language === 'kn' ? 'ರಾಜ್ಯ' : 'State Domicile'}: ${scholarship.state}`
                : language === 'kn'
                ? 'ಕೇಂದ್ರ / ರಾಷ್ಟ್ರೀಯ ಯೋಜನೆ'
                : 'Central / All India'}
            </span>

            {scholarship.isDemo ? (
              <span className="rounded border border-amber-300 bg-amber-50 px-2.5 py-0.5 font-bold text-amber-900">
                {language === 'kn' ? 'ಡೆಮೊ ದತ್ತಾಂಶ' : 'Demo Data'}
              </span>
            ) : (
              <span className="rounded border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-900">
                {language === 'kn' ? 'ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಮೂಲ' : 'Verified Official Source'}
              </span>
            )}

            <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              <span>{language === 'kn' ? 'ಲೆಕ್ಕಪರಿಶೋಧನೆ' : 'Audited'}: {scholarship.lastVerified}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="details-why-result-header-btn"
              onClick={() => onViewWhyResult(scholarship.id)}
              className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#0b2545] hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0b2545]" aria-hidden="true" />
              <span>{t.buttons.whyThisResult}</span>
            </button>

            {scholarship.sourceUrl ? (
              <a
                id="details-official-source-link"
                href={scholarship.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
              >
                <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                <span>{t.buttons.officialSource}</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Title and Overview Metadata */}
        <div>
          <h1 id="scheme-overview-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
            {scholarship.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <span>
                {language === 'kn' ? 'ಇಲಾಖೆ' : 'Department / Provider'}: <strong>{scholarship.provider}</strong>
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <span>
                {language === 'kn' ? 'ನೆರವು' : 'Financial Assistance'}:{' '}
                <strong>{scholarship.awardAmount || (language === 'kn' ? 'ಸರ್ಕಾರಿ ನಿಯಮಗಳ ಪ್ರಕಾರ' : 'As per government norms')}</strong>
              </span>
            </span>
            {scholarship.deadline && (
              <>
                <span>•</span>
                <span>
                  {language === 'kn' ? 'ಕೊನೆಯ ದಿನಾಂಕ' : 'Deadline'}: <strong>{scholarship.deadline}</strong>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Overview Description */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
          <strong className="text-slate-900 block uppercase tracking-wider text-[11px]">
            {language === 'kn' ? 'ಯೋಜನೆಯ ವಿವರಣೆ:' : 'Scheme Overview:'}
          </strong>
          <p>{scholarship.description}</p>
        </div>
      </header>

      {/* 2. STATUTORY EVIDENCE & AUDIT TRAIL (HIGH VISUAL PRIORITY) */}
      <EvidenceSection scholarship={scholarship} />

      {/* 3. WHY THIS RESULT PANEL */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-4 shadow-xs" aria-labelledby="why-result-heading">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
            <h2 id="why-result-heading" className="text-lg font-bold text-[#0b2545]">
              {t.buttons.whyThisResult}
            </h2>
          </div>

          <button
            onClick={() => onViewWhyResult(scholarship.id)}
            className="text-xs font-bold text-[#0b2545] hover:underline inline-flex items-center gap-1 min-h-8"
          >
            <span>{language === 'kn' ? 'ಸಂಪೂರ್ಣ ಪುರಾವೆ ವೀಕ್ಷಿಸಿ' : 'Full Evidence Audit'}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Responsible Phrasing Alert Box */}
        <div
          className={`rounded-lg border p-4 text-xs sm:text-sm leading-relaxed ${
            status === 'Likely Eligible'
              ? 'border-emerald-400 bg-emerald-50/80 text-emerald-950'
              : status === 'Needs Verification'
              ? 'border-amber-400 bg-amber-50/80 text-amber-950'
              : 'border-rose-400 bg-rose-50/80 text-rose-950'
          }`}
        >
          <div className="font-bold mb-1 text-sm">
            {status === 'Likely Eligible' &&
              (language === 'kn'
                ? 'ಸ್ಥಿತಿ: ನೀವು ಪ್ರಸ್ತುತ ಪರಿಶೀಲಿಸಬಹುದಾದ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪೂರೈಸುವ ಸಾಧ್ಯತೆಯಿದೆ.'
                : 'Status: You appear likely to meet the currently checkable requirements.')}
            {status === 'Needs Verification' &&
              (language === 'kn'
                ? 'ಸ್ಥಿತಿ: ಕೆಲವು ಷರತ್ತುಗಳಿಗೆ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿದೆ.'
                : 'Status: Some conditions require verification.')}
            {status === 'Not Eligible' &&
              (language === 'kn'
                ? 'ಸ್ಥಿತಿ: ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಪರಿಶೀಲಿಸಬಹುದಾದ ಅವಶ್ಯಕತೆಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.'
                : 'Status: This scholarship does not match one or more currently checkable requirements.')}
          </div>
          <p className="text-slate-800">
            {match.explanation ||
              (status === 'Likely Eligible'
                ? language === 'kn'
                  ? `ಎಲ್ಲಾ ${passedCount} ಪರಿಶೀಲಿಸಿದ ಷರತ್ತುಗಳು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತವೆ.`
                  : `You appear likely to meet the currently checkable requirements. All ${passedCount} evaluated conditions match your self-reported student profile.`
                : status === 'Needs Verification'
                ? language === 'kn'
                  ? `ಕೆಲವು ಷರತ್ತುಗಳಿಗೆ ಭೌತಿಕ ದಾಖಲೆಗಳು ಅಥವಾ ಸಂಸ್ಥೆಯ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.`
                  : `Some conditions require verification. ${needsVerificationCount} requirement(s) require physical institutional documents or additional verification.`
                : language === 'kn'
                ? `ಈ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಅರ್ಹತಾ ಷರತ್ತುಗಳಿಗೆ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.`
                : `This scholarship does not match one or more currently checkable requirements (${failedCount} requirement(s) did not match).`)}
          </p>
        </div>

        {/* Score metrics */}
        <div className="flex flex-wrap gap-2 text-xs pt-1">
          <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
            <span>
              {language === 'kn' ? 'ಉತ್ತೀರ್ಣ ಷರತ್ತುಗಳು' : 'Passed Requirements'}: {passedCount}
            </span>
          </span>

          {needsVerificationCount > 0 && (
            <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded inline-flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
              <span>
                {language === 'kn' ? 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ' : 'Requiring Verification'}: {needsVerificationCount}
              </span>
            </span>
          )}

          {failedCount > 0 && (
            <span className="font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded inline-flex items-center gap-1">
              <XCircle className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
              <span>
                {language === 'kn' ? 'ಹೊಂದಿಕೆಯಾಗದ ಷರತ್ತುಗಳು' : 'Failed'}: {failedCount}
              </span>
            </span>
          )}
        </div>
      </section>

      {/* 3. BENEFITS & APPLICATION INFORMATION SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Benefits and Application Information">
        {/* Benefits */}
        <div className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Award className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            <h2 className="text-base font-bold text-[#0b2545]">
              {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ಪ್ರಯೋಜನಗಳು' : 'Scholarship Benefits'}
            </h2>
          </div>
          <div className="rounded border border-emerald-200 bg-emerald-50/50 p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <p>{scholarship.benefits}</p>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'kn'
              ? 'ಹಣವನ್ನು ನೇರವಾಗಿ ವಿದ್ಯಾರ್ಥಿಯ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ (DBT).'
              : 'Disbursements are credited directly to Aadhaar-seeded student bank accounts via Direct Benefit Transfer (DBT).'}
          </p>
        </div>

        {/* Application Information */}
        <div className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Send className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
            <h2 className="text-base font-bold text-[#0b2545]">
              {language === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ' : 'Application Procedure'}
            </h2>
          </div>
          <div className="rounded border border-blue-200 bg-blue-50/50 p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <p>{scholarship.applicationInformation}</p>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'kn'
              ? 'ಆಧಾರ್, ಕಾಲೇಜು ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಅಂಕಪಟ್ಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಒಂದೇ ರೀತಿಯಾಗಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
              : 'Ensure that your demographic name matches identically across Aadhaar, College Bonafide, and SSC marks card.'}
          </p>
        </div>
      </section>

      {/* 4. ELIGIBILITY SECTION */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-4 shadow-xs" aria-labelledby="eligibility-table-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 id="eligibility-table-heading" className="text-lg font-bold text-[#0b2545]">
              {language === 'kn' ? 'ಅರ್ಹತಾ ಮಾನದಂಡಗಳ ಹೋಲಿಕೆ' : 'Eligibility Criteria Comparison'}
            </h2>
            <p className="text-xs text-slate-600">
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಈ ವಿದ್ಯಾರ್ಥಿವೇತನದ ನಿಯಮಗಳ ನೇರ ಹೋಲಿಕೆ.'
                : "Comparison between your profile values and this scholarship's checkable rules."}
            </p>
          </div>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-300" aria-label="Scheme conditions comparison table">
            <thead className="bg-[#0b2545] text-white font-bold">
              <tr>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">
                  {language === 'kn' ? 'ಅವಶ್ಯಕತೆ' : 'Requirement'}
                </th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">
                  {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ' : 'Student Information'}
                </th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">
                  {language === 'kn' ? 'ಯೋಜನೆಯ ಮಾನದಂಡ' : 'Scholarship Requirement'}
                </th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-24 text-center">
                  {language === 'kn' ? 'ಸ್ಥಿತಿ' : 'Status'}
                </th>
                <th scope="col" className="px-4 py-3">
                  {language === 'kn' ? 'ವಿವರಣೆ' : 'Explanation'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {evaluations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200 align-top">
                    {item.condition}
                  </td>
                  <td className="px-4 py-3 text-slate-800 border-r border-slate-200 font-semibold align-top">
                    {item.studentValue}
                  </td>
                  <td className="px-4 py-3 text-slate-800 border-r border-slate-200 font-medium align-top">
                    {item.requiredValue}
                  </td>
                  <td className="px-3 py-3 font-bold border-r border-slate-200 text-center align-top">
                    {item.status === 'passed' && (
                      <span className="inline-flex items-center gap-1 text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-xs font-black">
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>PASS</span>
                      </span>
                    )}
                    {item.status === 'needs_verification' && (
                      <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-[11px] font-black">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                        <span>VERIFY</span>
                      </span>
                    )}
                    {item.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-xs font-black">
                        <X className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
                        <span>FAIL</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 leading-relaxed align-top">
                    {item.explanation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View Responsive Cards */}
        <div className="block md:hidden space-y-3" aria-label="Mobile conditions list">
          {evaluations.map((item) => (
            <article
              key={item.id}
              className={`rounded-lg border p-4 space-y-2.5 ${
                item.status === 'passed'
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : item.status === 'needs_verification'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-rose-300 bg-rose-50/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {language === 'kn' ? 'ಅವಶ್ಯಕತೆ' : 'Requirement'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.condition}</h3>
                </div>

                {item.status === 'passed' && (
                  <span className="inline-flex items-center gap-1 text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-xs font-black shrink-0">
                    <Check className="h-3 w-3 text-emerald-700" aria-hidden="true" />
                    <span>PASS</span>
                  </span>
                )}
                {item.status === 'needs_verification' && (
                  <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-[11px] font-black shrink-0">
                    <AlertTriangle className="h-3 w-3 text-amber-700" aria-hidden="true" />
                    <span>VERIFY</span>
                  </span>
                )}
                {item.status === 'failed' && (
                  <span className="inline-flex items-center gap-1 text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-xs font-black shrink-0">
                    <X className="h-3 w-3 text-rose-700" aria-hidden="true" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="rounded border border-slate-200 bg-white p-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ' : 'Student Information'}
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">{item.studentValue}</p>
                </div>
                <div className="rounded border border-slate-200 bg-white p-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {language === 'kn' ? 'ಯೋಜನೆಯ ಮಾನದಂಡ' : 'Scholarship Requirement'}
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">{item.requiredValue}</p>
                </div>
              </div>

              <div className="rounded bg-white p-2.5 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">{language === 'kn' ? 'ವಿವರಣೆ: ' : 'Explanation: '}</strong>
                <span>{item.explanation}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. REQUIRED DOCUMENTS CHECKLIST WITH INTERACTIVE TICKING */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-4 shadow-xs" aria-labelledby="required-docs-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
            <div>
              <h2 id="required-docs-heading" className="text-base sm:text-lg font-bold text-[#0b2545]">
                {language === 'kn' ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ' : 'Required Documents Checklist'} ({totalDocs})
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'kn'
                  ? 'ದಾಖಲೆ ಸಿದ್ಧವಾಗಿದ್ದರೆ ಗುರುತಿಸಿ. ಈ ಪಟ್ಟಿಯನ್ನು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ನೆನಪಿಡಲಾಗುತ್ತದೆ.'
                  : 'Tick each document to track your readiness. Checklist is persisted automatically to your device.'}
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-[#0b2545] bg-slate-100 border border-slate-200 px-3 py-1 rounded">
            {readyDocsCount} of {totalDocs} {language === 'kn' ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready'}
          </div>
        </div>

        {/* Interactive Checklist items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scholarship.documents.map((doc, idx) => {
            const isReady = !!preparedDocs[doc];
            return (
              <div
                key={idx}
                onClick={() => onToggleDoc && onToggleDoc(doc)}
                className={`flex items-center justify-between gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                  isReady
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
                role="checkbox"
                aria-checked={isReady}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    if (onToggleDoc) onToggleDoc(doc);
                  }
                }}
              >
                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    className="focus-visible:outline-2 focus-visible:outline-[#0b2545] shrink-0 min-h-8 min-w-8 flex items-center justify-center"
                    aria-label={`Mark ${translateDoc(doc)} as ${isReady ? 'not ready' : 'ready'}`}
                  >
                    {isReady ? (
                      <CheckSquare className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Square className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    )}
                  </button>
                  <span className={`font-semibold ${isReady ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                    {translateDoc(doc)}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded border shrink-0 ${
                    isReady
                      ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                      : 'border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  {isReady ? (language === 'kn' ? '☑ ಸಿದ್ಧವಾಗಿದೆ' : '☑ Ready') : (language === 'kn' ? '☐ ಸಿದ್ಧವಿಲ್ಲ' : '☐ Not ready')}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            {language === 'kn'
              ? 'ಯಾವುದೇ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪಡೆಯಲು ಸಹಾಯ ಬೇಕೇ? ಸಹಾಯ ಸಹಾಯಕನನ್ನು ಕೇಳಿ.'
              : 'Need help procuring any certificate? Ask the built-in guidance assistant.'}
          </span>
          <button
            onClick={() => onAskAssistant(scholarship.id)}
            className="inline-flex items-center gap-1.5 font-bold text-[#0b2545] hover:underline min-h-9"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#0b2545]" aria-hidden="true" />
            <span>
              {language === 'kn'
                ? 'ಈ ಯೋಜನೆಯ ಬಗ್ಗೆ ಸಹಾಯ ಸಹಾಯಕನನ್ನು ಕೇಳಿ'
                : 'Ask Guidance Assistant about this scheme'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
