import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  User,
  RotateCcw,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { ScholarshipMatch, StudentProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DashboardPageProps {
  student: StudentProfile | null;
  matches: ScholarshipMatch[];
  preparedDocs: Record<string, boolean>;
  onCheckAgain: () => void;
  onSelectScholarship: (id: string) => void;
  onViewWhyResult: (id: string) => void;
  onGoToDocuments: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  student,
  matches,
  preparedDocs,
  onCheckAgain,
  onSelectScholarship,
  onViewWhyResult,
  onGoToDocuments,
}) => {
  const { language, t, translateDoc } = useLanguage();

  const likelyMatches = matches.filter((m) => m.status === 'Likely Eligible');
  const needsVerificationMatches = matches.filter((m) => m.status === 'Needs Verification');
  const notEligibleMatches = matches.filter((m) => m.status === 'Not Eligible');

  const totalPreparedCount = Object.values(preparedDocs).filter(Boolean).length;
  const studentDisplayName = student?.name || (language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ' : 'Candidate');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 w-full overflow-x-hidden" id="main-content">
      {/* Top Institutional Header */}
      <header className="rounded-lg border border-slate-300 bg-[#0b2545] p-5 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded border border-slate-400/40 bg-white/10 px-2.5 py-0.5 text-xs font-bold text-slate-200">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              <span>
                {language === 'kn' ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಅಭ್ಯರ್ಥಿ ಪೋರ್ಟಲ್' : 'ScholarSaathi Candidate Portal'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'kn' ? `ಸ್ವಾಗತ, ${studentDisplayName}` : `Welcome, ${studentDisplayName}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಸಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಹೊಂದಾಣಿಕೆಗಳು, ಷರತ್ತುಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ದಾಖಲೆಗಳ ಸಿದ್ಧತೆಯ ಅವಲೋಕನ.'
                : 'Overview of your active scholarship matches, condition verifications, and document preparation progress.'}
            </p>
          </div>

          <button
            id="dashboard-check-again-btn"
            onClick={onCheckAgain}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{language === 'kn' ? 'ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ' : 'Update Profile'}</span>
          </button>
        </div>
      </header>

      {/* Required Stat Cards Row */}
      <section aria-label="Eligibility summary counts" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Potential Matches */}
        <div className="rounded-lg border border-emerald-300 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.status.likelyEligible}
            </span>
            <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-900">
            {likelyMatches.length} {language === 'kn' ? 'ಯೋಜನೆಗಳು' : 'Schemes'}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            {language === 'kn'
              ? 'ಎಲ್ಲಾ ಪರಿಶೀಲಿಸಿದ ಕಡ್ಡಾಯ ಷರತ್ತುಗಳು ಉತ್ತೀರ್ಣವಾಗಿವೆ.'
              : 'All evaluated mandatory conditions passed.'}
          </p>
        </div>

        {/* Card 2: Needs Verification */}
        <div className="rounded-lg border border-amber-300 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.status.needsVerification}
            </span>
            <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-900">
            {needsVerificationMatches.length} {language === 'kn' ? 'ಯೋಜನೆಗಳು' : 'Schemes'}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            {language === 'kn'
              ? 'ಅಂಕಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತವೆ; ಸಂಸ್ಥೆಯ ಪ್ರಮಾಣಪತ್ರಗಳ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.'
              : 'Meets mark thresholds; requires offline institutional certificates.'}
          </p>
        </div>

        {/* Card 3: Not Eligible */}
        <div className="rounded-lg border border-rose-300 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.status.notEligible}
            </span>
            <XCircle className="h-5 w-5 text-rose-700" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-rose-900">
            {notEligibleMatches.length} {language === 'kn' ? 'ಯೋಜನೆಗಳು' : 'Schemes'}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            {language === 'kn'
              ? 'ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಶಾಸನಬದ್ಧ ಮಾನದಂಡಗಳು ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.'
              : 'One or more statutory criteria (income, category) mismatch.'}
          </p>
        </div>
      </section>

      {/* Main Grid: Profile Summary & Document Checklist Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <section aria-labelledby="profile-summary-heading" className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
              <h2 id="profile-summary-heading" className="text-sm font-bold text-[#0b2545]">
                {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಸಾರಾಂಶ' : 'Candidate Profile Summary'}
              </h2>
            </div>
            <button
              onClick={onCheckAgain}
              className="text-xs font-bold text-[#0b2545] hover:underline min-h-8"
            >
              {language === 'kn' ? 'ತಿದ್ದುಪಡಿ' : 'Edit'}
            </button>
          </div>

          {student ? (
            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.stateLabel}</span>
                <span className="font-bold text-slate-800">
                  {student.state} ({student.district})
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.courseLabel}</span>
                <span className="font-bold text-slate-800">
                  {student.course} - {student.branch}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.yearLabel}</span>
                <span className="font-bold text-slate-800">{student.yearOfStudy} Year</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.marksLabel}</span>
                <span className="font-bold text-emerald-800">{student.academicPercentage}%</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.annualIncomeLabel}</span>
                <span className="font-bold text-slate-800">
                  ₹{Number(student.annualFamilyIncome).toLocaleString('en-IN')} / year
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.categoryLabel}</span>
                <span className="font-bold text-slate-800">{student.category}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.form.institutionTypeLabel}</span>
                <span className="font-bold text-slate-800">{student.institutionType}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">{t.form.accommodationLabel}</span>
                <span className="font-bold text-slate-800">{student.accommodation}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 mt-4">
              {language === 'kn' ? 'ಯಾವುದೇ ಪ್ರೊಫೈಲ್ ಸಕ್ರಿಯವಾಗಿಲ್ಲ.' : 'No student profile active.'}
            </p>
          )}
        </section>

        {/* Document Checklist Widget */}
        <section aria-labelledby="doc-readiness-heading" className="lg:col-span-2 rounded-lg border border-slate-300 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
                <h2 id="doc-readiness-heading" className="text-sm font-bold text-[#0b2545]">
                  {language === 'kn' ? 'ದಾಖಲೆಗಳ ಸಿದ್ಧತೆಯ ಸ್ಥಿತಿ' : 'Document Readiness Status'}
                </h2>
              </div>
              <button
                onClick={onGoToDocuments}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0b2545] hover:underline min-h-8"
              >
                <span>{language === 'kn' ? 'ಸಂಪೂರ್ಣ ಪಟ್ಟಿ' : 'Full Checklist'}</span>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-700">
                {language === 'kn'
                  ? `ಸಿದ್ಧವಾಗಿರುವ ದಾಖಲೆಗಳು: ${totalPreparedCount} ಸಿದ್ಧವಾಗಿದೆ`
                  : `Tracked certificates: ${totalPreparedCount} prepared`}
              </span>
              <span className="font-bold text-[#0b2545]">
                {Math.round((totalPreparedCount / 7) * 100)}% {language === 'kn' ? 'ಸಿದ್ಧ' : 'Ready'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-2 h-2 w-full rounded bg-slate-200 overflow-hidden" role="progressbar" aria-valuenow={Math.round((totalPreparedCount / 7) * 100)} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="h-full bg-[#0b2545] transition-all duration-300"
                style={{ width: `${Math.round((totalPreparedCount / 7) * 100)}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                <span>{translateDoc('Income Certificate issued by competent Revenue Authority (Tahasildar)')}</span>
              </div>
              <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                <span>{translateDoc('Previous Year Marks Card / Scorecard')}</span>
              </div>
              <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-700 shrink-0" />
                <span>{translateDoc('College Bonafide Student Certificate')}</span>
              </div>
              <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-700 shrink-0" />
                <span>{translateDoc('Aadhaar-seeded Active Bank Account Passbook')}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <button
              onClick={onGoToDocuments}
              className="w-full rounded border border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-[#0b2545] hover:bg-slate-100 transition min-h-11"
            >
              {language === 'kn'
                ? 'ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ತೆರೆಯಿರಿ (ಸಂವಾದಾತ್ಮಕ)'
                : 'Open Document Checklist (Interactive)'}
            </button>
          </div>
        </section>
      </div>

      {/* Recently Checked Scholarships Section */}
      <section aria-labelledby="recent-schemes-heading" className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <h2 id="recent-schemes-heading" className="text-sm font-bold text-[#0b2545]">
              {language === 'kn' ? 'ಪರಿಶೀಲಿಸಿದ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು' : 'Recently Checked Scholarships'}
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {language === 'kn' ? 'ರಚನಾತ್ಮಕ ದತ್ತಾಂಶ ಫಲಿತಾಂಶಗಳು' : 'Structured Dataset Results'}
          </span>
        </div>

        <div className="mt-3 divide-y divide-slate-200">
          {matches.map((m) => (
            <div
              key={m.scholarship.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  {m.status === 'Likely Eligible' && (
                    <span className="inline-flex items-center gap-1 rounded border border-emerald-500 bg-emerald-50 text-emerald-950 px-1.5 py-0.5 text-[10px] font-black uppercase">
                      <CheckCircle2 className="h-3 w-3 text-emerald-700" aria-hidden="true" />
                      <span>PASS</span>
                    </span>
                  )}
                  {m.status === 'Needs Verification' && (
                    <span className="inline-flex items-center gap-1 rounded border border-amber-500 bg-amber-50 text-amber-950 px-1.5 py-0.5 text-[10px] font-black uppercase">
                      <AlertTriangle className="h-3 w-3 text-amber-700" aria-hidden="true" />
                      <span>VERIFY</span>
                    </span>
                  )}
                  {m.status === 'Not Eligible' && (
                    <span className="inline-flex items-center gap-1 rounded border border-rose-500 bg-rose-50 text-rose-950 px-1.5 py-0.5 text-[10px] font-black uppercase">
                      <XCircle className="h-3 w-3 text-rose-700" aria-hidden="true" />
                      <span>FAIL</span>
                    </span>
                  )}
                  <span className="font-bold text-sm text-[#0b2545]">{m.scholarship.name}</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <span>{m.scholarship.provider}</span>
                  <span>•</span>
                  <span>
                    {m.passedCount} {language === 'kn' ? 'ಷರತ್ತುಗಳು ಉತ್ತೀರ್ಣವಾಗಿವೆ' : 'conditions passed'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onViewWhyResult(m.scholarship.id)}
                  className="rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#0b2545] hover:bg-slate-100 transition min-h-9"
                >
                  {t.buttons.whyThisResult}
                </button>
                <button
                  onClick={() => onSelectScholarship(m.scholarship.id)}
                  className="rounded bg-[#0b2545] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#133b68] transition min-h-9"
                >
                  {t.buttons.viewScholarship}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
