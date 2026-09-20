import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Building2,
  FileText,
  Filter,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  Check,
  Calendar,
  Layers,
} from 'lucide-react';
import { OverallEligibilityStatus, ScholarshipMatch } from '../types';
import { EvidenceSection } from '../components/EvidenceSection';
import { useLanguage } from '../context/LanguageContext';

interface ResultsPageProps {
  matches: ScholarshipMatch[];
  onSelectScholarship: (scholarshipId: string) => void;
  onViewWhyResult: (scholarshipId: string) => void;
  onCheckAgain: () => void;
  studentName?: string;
  preparedDocs?: Record<string, boolean>;
  onToggleDoc?: (docName: string) => void;
  apiSource?: 'backend_api' | 'local_engine';
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  matches,
  onSelectScholarship,
  onViewWhyResult,
  onCheckAgain,
  studentName,
  preparedDocs = {},
  onToggleDoc,
  apiSource = 'local_engine',
}) => {
  const { language, t, translateDoc } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<'All' | OverallEligibilityStatus>('All');
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<string | null>(null);

  const totalChecked = matches.length;
  const likelyEligibleCount = matches.filter((m) => m.status === 'Likely Eligible').length;
  const needsVerificationCount = matches.filter((m) => m.status === 'Needs Verification').length;
  const notEligibleCount = matches.filter((m) => m.status === 'Not Eligible').length;

  const filteredMatches = matches.filter((m) => {
    if (statusFilter === 'All') return true;
    return m.status === statusFilter;
  });

  const getStatusLabel = (status: OverallEligibilityStatus) => {
    if (status === 'Likely Eligible') return t.status.likelyEligible;
    if (status === 'Needs Verification') return t.status.needsVerification;
    return t.status.notEligible;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 w-full overflow-x-hidden" id="main-content">
      {/* Top Header */}
      <header className="border-b border-slate-300 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <span>
              {language === 'kn'
                ? 'ಸ್ವಯಂಚಾಲಿತ ನಿಖರ ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶಗಳು'
                : 'Automated Deterministic Assessment Results'}
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
            {t.results.resultsTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-700">
            {studentName ? `${language === 'kn' ? 'ಅಭ್ಯರ್ಥಿ' : 'Profile'}: ${studentName} • ` : ''}
            {language === 'kn'
              ? `${totalChecked} ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.`
              : `Evaluated against ${totalChecked} state and central scholarship schemes using verifiable rule matching.`}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {apiSource === 'backend_api' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                <span>AWS API Gateway / Lambda Engine</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-800 border border-slate-300">
                <ShieldCheck className="h-3 w-3 text-[#0b2545]" aria-hidden="true" />
                <span>Deterministic Engine (Local)</span>
              </span>
            )}
            <span className="text-[11px] text-slate-600">
              {language === 'kn' ? 'ನಿಖರ ನಿಯಮ ಹೊಂದಾಣಿಕೆ ಖಾತರಿ' : 'Zero Rule Divergence Guaranteed'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="results-edit-profile-btn"
            onClick={onCheckAgain}
            className="rounded border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
          >
            {t.nav.editProfile}
          </button>
        </div>
      </header>

      {/* Trust Section */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-1.5 shadow-xs" aria-label="Trust & Verification Notice">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0b2545]">
          <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
          <span>Evidence-based scholarship discovery</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          Eligibility results are based on structured rules and should be verified against the latest official scholarship notification.
        </p>
      </section>

      {/* Summary KPI Cards with Accessible Indicators */}
      <section aria-label="Eligibility summary counts" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total scholarships checked */}
        <div className="rounded-lg border border-slate-300 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-slate-700" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.status.totalChecked}
              </span>
            </div>
            <span className="text-2xl font-black text-slate-900">{totalChecked}</span>
          </div>
          <p className="mt-2 text-xs text-slate-600">
            {language === 'kn'
              ? 'ನಿಮ್ಮ ವಿವರಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ತಪಾಸಣೆ ಮಾಡಲಾದ ಯೋಜನೆಗಳು.'
              : 'Scholarship schemes audited against your profile.'}
          </p>
        </div>

        {/* Likely Eligible */}
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'Likely Eligible' ? 'All' : 'Likely Eligible')}
          className={`text-left rounded-lg border p-5 transition flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-emerald-600 min-h-11 ${
            statusFilter === 'Likely Eligible'
              ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
              : 'border-slate-300 bg-white hover:bg-slate-50'
          }`}
          aria-pressed={statusFilter === 'Likely Eligible'}
          aria-label={`Filter by Likely Eligible: ${likelyEligibleCount} schemes`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                {t.status.likelyEligible}
              </span>
            </div>
            <span className="text-2xl font-black text-emerald-800">{likelyEligibleCount}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-600">{language === 'kn' ? 'ಷರತ್ತುಗಳನ್ನು ಪೂರೈಸುತ್ತದೆ' : 'Meets checkable rules'}</span>
            <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[10px]">
              ✓ {t.status.pass}
            </span>
          </div>
        </button>

        {/* Needs Verification */}
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'Needs Verification' ? 'All' : 'Needs Verification')}
          className={`text-left rounded-lg border p-5 transition flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-amber-600 min-h-11 ${
            statusFilter === 'Needs Verification'
              ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-500'
              : 'border-slate-300 bg-white hover:bg-slate-50'
          }`}
          aria-pressed={statusFilter === 'Needs Verification'}
          aria-label={`Filter by Needs Verification: ${needsVerificationCount} schemes`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                {t.status.needsVerification}
              </span>
            </div>
            <span className="text-2xl font-black text-amber-800">{needsVerificationCount}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-600">{language === 'kn' ? 'ದಾಖಲೆ ದೃಢೀಕರಣ ಅಗತ್ಯ' : 'Institutional proof needed'}</span>
            <span className="font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded text-[10px]">
              ⚠ {t.status.requiringVerification}
            </span>
          </div>
        </button>

        {/* Not Eligible */}
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'Not Eligible' ? 'All' : 'Not Eligible')}
          className={`text-left rounded-lg border p-5 transition flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-rose-600 min-h-11 ${
            statusFilter === 'Not Eligible'
              ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-500'
              : 'border-slate-300 bg-white hover:bg-slate-50'
          }`}
          aria-pressed={statusFilter === 'Not Eligible'}
          aria-label={`Filter by Not Eligible: ${notEligibleCount} schemes`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-700" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-950">
                {t.status.notEligible}
              </span>
            </div>
            <span className="text-2xl font-black text-rose-800">{notEligibleCount}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-600">{language === 'kn' ? 'ಅರ್ಹತಾ ನಿಯಮ ಹೊಂದಿಲ್ಲ' : 'Criteria did not match'}</span>
            <span className="font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded text-[10px]">
              ✕ {t.status.fail}
            </span>
          </div>
        </button>
      </section>

      {/* Filter Tabs Row */}
      <section aria-label="Status filter bar" className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span>{t.results.filterResults}:</span>
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter schemes by status">
          {(['All', 'Likely Eligible', 'Needs Verification', 'Not Eligible'] as const).map((status) => {
            const label =
              status === 'All'
                ? t.buttons.all
                : status === 'Likely Eligible'
                ? t.status.likelyEligible
                : status === 'Needs Verification'
                ? t.status.needsVerification
                : t.status.notEligible;

            return (
              <button
                key={status}
                role="tab"
                aria-selected={statusFilter === status}
                onClick={() => setStatusFilter(status)}
                className={`rounded px-3 py-1.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9 ${
                  statusFilter === status
                    ? 'bg-[#0b2545] text-white shadow-xs'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Official Service Listing Style Cards */}
      <section aria-label="Evaluated scholarship schemes list" className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="rounded-lg border border-slate-300 bg-white p-12 text-center">
            <h3 className="text-base font-bold text-slate-800">
              {language === 'kn' ? 'ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಯೋಜನೆಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ' : 'No schemes match the selected filter'}
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              {language === 'kn'
                ? 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ನೋಡಲು "ಎಲ್ಲಾ" ಆಯ್ಕೆಮಾಡಿ.'
                : 'Select "All" to view all evaluated state and central schemes.'}
            </p>
            <button
              onClick={() => setStatusFilter('All')}
              className="mt-4 rounded bg-[#0b2545] px-4 py-2 text-xs font-bold text-white hover:bg-[#133b68] focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
            >
              {t.buttons.viewAllSchemes}
            </button>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const { scholarship, status, passedCount, failedCount, needsVerificationCount } = match;
            const hasSourceUrl = Boolean(scholarship.sourceUrl && scholarship.sourceUrl.trim() !== '');
            const isEvidenceExpanded = expandedEvidenceId === scholarship.id;

            return (
              <article
                key={scholarship.id}
                id={`result-card-${scholarship.id}`}
                className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 transition hover:border-slate-400 space-y-4 shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  {/* Left Column: Scheme Information */}
                  <div className="flex-1 space-y-3">
                    {/* Header Line: Status Badge - Never relies on color alone */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {status === 'Likely Eligible' && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded border-2 border-emerald-600 bg-emerald-50 px-3 py-1 font-bold text-emerald-950"
                          aria-label={`Status: ${t.status.likelyEligible}`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.likelyEligible}</span>
                          <span className="rounded bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.5">PASS</span>
                          <span className="text-[11px] font-semibold text-emerald-800">[Criteria Satisfied]</span>
                        </span>
                      )}
                      {status === 'Needs Verification' && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded border-2 border-amber-600 bg-amber-50 px-3 py-1 font-bold text-amber-950"
                          aria-label={`Status: ${t.status.needsVerification}`}
                        >
                          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.needsVerification}</span>
                          <span className="rounded bg-amber-700 text-white text-[10px] font-black px-1.5 py-0.5">VERIFY</span>
                          <span className="text-[11px] font-semibold text-amber-800">[Document Check]</span>
                        </span>
                      )}
                      {status === 'Not Eligible' && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded border-2 border-rose-600 bg-rose-50 px-3 py-1 font-bold text-rose-950"
                          aria-label={`Status: ${t.status.notEligible}`}
                        >
                          <XCircle className="h-4 w-4 text-rose-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.notEligible}</span>
                          <span className="rounded bg-rose-700 text-white text-[10px] font-black px-1.5 py-0.5">FAIL</span>
                          <span className="text-[11px] font-semibold text-rose-800">[Criteria Not Met]</span>
                        </span>
                      )}

                      <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {scholarship.state
                          ? `${language === 'kn' ? 'ರಾಜ್ಯ ವಾಸಸ್ಥಳ' : 'State Domicile'}: ${scholarship.state}`
                          : language === 'kn'
                          ? 'ರಾಷ್ಟ್ರೀಯ / ಕೇಂದ್ರ ಯೋಜನೆ'
                          : 'National / Central Scheme'}
                      </span>

                      {scholarship.isDemo ? (
                        <span className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                          {language === 'kn' ? 'ಡೆಮೊ ದತ್ತಾಂಶ' : 'Demo Data'}
                        </span>
                      ) : (
                        <span className="rounded border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
                          {language === 'kn' ? 'ದೃಢೀಕೃತ ಅಧಿಕೃತ ಮೂಲ' : 'Verified Official Source'}
                        </span>
                      )}

                      <span className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" aria-hidden="true" />
                        {language === 'kn' ? 'ಲೆಕ್ಕಪರಿಶೋಧನೆ' : 'Audited'}: {scholarship.lastVerified}
                      </span>
                    </div>

                    {/* Scholarship Name (Official title remains authentic) */}
                    <h2 className="text-lg sm:text-xl font-bold text-[#0b2545] leading-snug">
                      {scholarship.name}
                    </h2>

                    {/* Provider Department */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <Building2 className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
                      <span>{scholarship.provider}</span>
                    </div>

                    {/* Responsible Short Explanation */}
                    <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 leading-relaxed">
                      <strong className="text-slate-900">
                        {language === 'kn' ? 'ಮೌಲ್ಯಮಾಪನ ವಿವರಣೆ: ' : 'Assessment Note: '}
                      </strong>
                      <span>
                        {match.explanation ||
                          (status === 'Likely Eligible'
                            ? language === 'kn'
                              ? 'ನಿಮ್ಮ ಸ್ವಯಂ-ವರದಿ ಪ್ರೊಫೈಲ್ ನಿಯಮಗಳ ಪ್ರಕಾರ ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಹರಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.'
                              : 'You appear likely to meet the currently checkable requirements based on self-reported profile attributes.'
                            : status === 'Needs Verification'
                            ? language === 'kn'
                              ? 'ಕೆಲವು ಷರತ್ತುಗಳನ್ನು ಸಂಸ್ಥೆ ಅಥವಾ ಕಂದಾಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬೇಕಾಗಿದೆ.'
                              : 'Some conditions require verification against institutional records or revenue certificates.'
                            : language === 'kn'
                            ? 'ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಪರಿಶೀಲಿಸಬಹುದಾದ ನಿಯಮಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.'
                            : 'This scholarship does not match one or more currently checkable requirements.')}
                      </span>
                    </div>

                    {/* Passed, requiring verification, and failed badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded inline-flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>
                          {t.status.passedRequirements}: {passedCount}
                        </span>
                      </span>

                      {needsVerificationCount > 0 && (
                        <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded inline-flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                          <span>
                            {t.status.requiringVerification}: {needsVerificationCount}
                          </span>
                        </span>
                      )}

                      {failedCount > 0 && (
                        <span className="font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded inline-flex items-center gap-1">
                          <XCircle className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
                          <span>
                            {t.status.failed}: {failedCount}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Documents Required */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span>
                          {t.results.docsRequiredHeading} ({scholarship.documents.length}):
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {scholarship.documents.map((doc, idx) => {
                          const isReady = !!preparedDocs[doc];
                          return (
                            <span
                              key={idx}
                              className={`inline-flex items-center gap-1 text-[11px] rounded border px-2 py-0.5 ${
                                isReady
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold'
                                  : 'border-slate-200 bg-slate-100 text-slate-700'
                              }`}
                            >
                              {isReady ? (
                                <Check className="h-3 w-3 text-emerald-700" aria-hidden="true" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                              )}
                              <span>{translateDoc(doc)}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="lg:w-56 shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                    {/* View Scholarship button */}
                    <button
                      id={`btn-view-scholarship-${scholarship.id}`}
                      onClick={() => onSelectScholarship(scholarship.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded bg-[#0b2545] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
                    >
                      <span>{t.buttons.viewScholarship}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>

                    {/* Why This Result button */}
                    <button
                      id={`btn-why-result-${scholarship.id}`}
                      onClick={() => onViewWhyResult(scholarship.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-[#0b2545] hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#0b2545]" aria-hidden="true" />
                      <span>{t.buttons.whyThisResult}</span>
                    </button>

                    {/* Evidence & Official Source Link */}
                    {hasSourceUrl ? (
                      <a
                        id={`link-official-source-${scholarship.id}`}
                        href={scholarship.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
                        aria-label={`Official source link for ${scholarship.name}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span>{t.buttons.officialSource}</span>
                      </a>
                    ) : (
                      <span className="w-full text-center py-1 text-[11px] text-slate-500 italic">
                        {language === 'kn' ? 'ಅಧಿಕೃತ ಲಿಂಕ್ ಲಭ್ಯವಿಲ್ಲ' : 'Official source not available'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Evidence Section: High Visual Priority */}
                <div className="pt-2 border-t border-slate-200">
                  <EvidenceSection scholarship={scholarship} compact={false} />
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Advisory Guidance Notice */}
      <aside aria-label="Official Guidance Notice" className="rounded-lg border border-slate-300 bg-slate-100 p-4 text-xs text-slate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-[#0b2545] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="leading-relaxed">
            <strong>{language === 'kn' ? 'ಸಲಹಾ ಮಾರ್ಗದರ್ಶನ ಸೂಚನೆ:' : 'Advisory Guidance Notice:'}</strong>{' '}
            {t.results.advisoryNoticeBody}
          </p>
        </div>
      </aside>
    </div>
  );
};
