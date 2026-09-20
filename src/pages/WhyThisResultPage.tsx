import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Check,
  X,
  BookOpen,
  FileText,
  Square,
  CheckSquare,
} from 'lucide-react';
import { ScholarshipMatch } from '../types';
import { EvidenceSection } from '../components/EvidenceSection';
import { useLanguage } from '../context/LanguageContext';

interface WhyThisResultPageProps {
  matches: ScholarshipMatch[];
  selectedScholarshipId: string | null;
  onSelectScholarship: (id: string) => void;
  onGoToDocuments: () => void;
  onViewDetails?: (id: string) => void;
  onAskAssistant?: (id: string) => void;
  preparedDocs?: Record<string, boolean>;
  onToggleDoc?: (docName: string) => void;
}

export const WhyThisResultPage: React.FC<WhyThisResultPageProps> = ({
  matches,
  selectedScholarshipId,
  onSelectScholarship,
  onGoToDocuments,
  onViewDetails,
  onAskAssistant,
  preparedDocs = {},
  onToggleDoc,
}) => {
  const { language, t, translateDoc } = useLanguage();
  const activeMatch =
    matches.find((m) => m.scholarship.id === selectedScholarshipId) ||
    matches[0] ||
    null;

  const [conditionFilter, setConditionFilter] = useState<'all' | 'failed' | 'needs_verification' | 'passed'>('all');

  if (!activeMatch) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center w-full overflow-x-hidden" id="main-content">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
        <h1 className="mt-4 text-xl font-bold text-slate-800">
          {t.why.noProfileFound}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {t.why.noProfileFoundDesc}
        </p>
      </div>
    );
  }

  const { scholarship, status, evaluations } = activeMatch;

  const filteredEvaluations = evaluations.filter((item) => {
    if (conditionFilter === 'all') return true;
    return item.status === conditionFilter;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 w-full overflow-x-hidden" id="main-content">
      {/* Title & Header */}
      <header className="border-b border-slate-300 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
          <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
          <span>{t.why.whyHeaderBadge}</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
          {t.why.whyTitle}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
          {t.why.whySubtitle}
        </p>
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

      {/* Scholarship Selector & Primary Status Assessment Card */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-4 shadow-xs" aria-label="Selected scholarship assessment">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="select-scholarship-scheme" className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {t.why.selectSchemeLabel}
          </label>
          <div className="sm:max-w-md w-full">
            <select
              id="select-scholarship-scheme"
              value={scholarship.id}
              onChange={(e) => onSelectScholarship(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              {matches.map((m) => (
                <option key={m.scholarship.id} value={m.scholarship.id}>
                  [{m.status.toUpperCase()}] {m.scholarship.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overall Assessment Banner - Multi-sensory Accessible */}
        <div
          className={`rounded-lg border-2 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            status === 'Likely Eligible'
              ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
              : status === 'Needs Verification'
              ? 'border-amber-600 bg-amber-50 text-amber-950'
              : 'border-rose-600 bg-rose-50 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {status === 'Likely Eligible' && (
              <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {status === 'Needs Verification' && (
              <AlertTriangle className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {status === 'Not Eligible' && (
              <XCircle className="h-6 w-6 text-rose-700 shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div>
              <div className="text-sm sm:text-base font-extrabold flex flex-wrap items-center gap-2">
                <span>{language === 'kn' ? 'ಮೌಲ್ಯಮಾಪನ ಸ್ಥಿತಿ: ' : 'Assessment Status: '}</span>
                <span className="uppercase tracking-wide font-black">
                  {status === 'Likely Eligible'
                    ? t.status.likelyEligible
                    : status === 'Needs Verification'
                    ? t.status.needsVerification
                    : t.status.notEligible}
                </span>
                {status === 'Likely Eligible' && (
                  <span className="rounded bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.5">PASS</span>
                )}
                {status === 'Needs Verification' && (
                  <span className="rounded bg-amber-700 text-white text-[10px] font-black px-1.5 py-0.5">VERIFY</span>
                )}
                {status === 'Not Eligible' && (
                  <span className="rounded bg-rose-700 text-white text-[10px] font-black px-1.5 py-0.5">FAIL</span>
                )}
                <span className="text-xs font-semibold text-slate-700">
                  {status === 'Likely Eligible' ? '[All Criteria Satisfied]' : status === 'Needs Verification' ? '[Requires Institutional Verification]' : '[Criteria Not Met]'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium mt-1 leading-relaxed text-slate-800">
                {status === 'Likely Eligible' &&
                  (language === 'kn'
                    ? 'ನಿಮ್ಮ ಸ್ವಯಂ-ವರದಿ ಪ್ರೊಫೈಲ್ ಪ್ರಕಾರ ನೀವು ಎಲ್ಲಾ ಪರಿಶೀಲಿಸಬಹುದಾದ ನಿಯಮಗಳನ್ನು ಪೂರೈಸುತ್ತೀರಿ (ವಾಸಸ್ಥಳ, ಆದಾಯ ಮಿತಿ, ಅಂಕಗಳು, ವರ್ಗ).'
                    : 'You appear likely to meet the currently checkable requirements. All evaluated mandatory rules passed against your self-reported profile.')}
                {status === 'Needs Verification' &&
                  (language === 'kn'
                    ? 'ಕೆಲವು ಷರತ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕಾಗಿದೆ. ಅಂಕ ಮತ್ತು ಆದಾಯ ಅರ್ಹತೆಗಳನ್ನು ಪೂರೈಸಲಾಗಿದ್ದರೂ, ದಾಖಲೆಗಳು ಅಥವಾ ಕಾಲೇಜು ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.'
                    : 'Some conditions require verification. Quantitative cutoffs are met, but one or more conditions require physical institutional credentials or official certificates.')}
                {status === 'Not Eligible' &&
                  (language === 'kn'
                    ? 'ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಪರಿಶೀಲಿಸಬಹುದಾದ ನಿಯಮಗಳಿಗೆ (ಆದಾಯ ಮಿತಿ, ರಾಜ್ಯ ಅಥವಾ ವರ್ಗ) ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.'
                    : 'This scholarship does not match one or more currently checkable requirements (such as family income ceiling, domicile state, or specific community reservation).')}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-xs font-bold bg-white/90 border border-slate-300 rounded px-3 py-2 text-slate-800 space-y-1">
            <div className="text-emerald-800">✓ {activeMatch.passedCount} {t.status.pass}</div>
            <div className="text-amber-800">⚠ {activeMatch.needsVerificationCount} {t.status.requiringVerification}</div>
            <div className="text-rose-800">✕ {activeMatch.failedCount} {t.status.failed}</div>
          </div>
        </div>
      </section>

      {/* Mandatory Evidence Section */}
      <EvidenceSection scholarship={scholarship} />

      {/* Condition-by-Condition Evidence Audit */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-5" aria-labelledby="detailed-audit-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              <BookOpen className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
              <span>{language === 'kn' ? 'ಪುರಾವೆ ಆಧಾರಿತ ವಿಂಗಡಣೆ' : 'Evidence-Style Breakdown'}</span>
            </div>
            <h2 id="detailed-audit-heading" className="text-lg sm:text-xl font-bold text-[#0b2545] mt-0.5">
              {t.why.auditTrailHeading}
            </h2>
          </div>

          {/* Filter conditions tabs */}
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter conditions">
            <button
              role="tab"
              aria-selected={conditionFilter === 'all'}
              onClick={() => setConditionFilter('all')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8 ${
                conditionFilter === 'all'
                  ? 'bg-[#0b2545] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'kn' ? 'ಎಲ್ಲಾ' : 'All'} ({evaluations.length})
            </button>
            <button
              role="tab"
              aria-selected={conditionFilter === 'failed'}
              onClick={() => setConditionFilter('failed')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8 ${
                conditionFilter === 'failed'
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              {t.status.failed} ({activeMatch.failedCount})
            </button>
            <button
              role="tab"
              aria-selected={conditionFilter === 'needs_verification'}
              onClick={() => setConditionFilter('needs_verification')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8 ${
                conditionFilter === 'needs_verification'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              {t.status.requiringVerification} ({activeMatch.needsVerificationCount})
            </button>
            <button
              role="tab"
              aria-selected={conditionFilter === 'passed'}
              onClick={() => setConditionFilter('passed')}
              className={`rounded px-2.5 py-1 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8 ${
                conditionFilter === 'passed'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {t.status.pass} ({activeMatch.passedCount})
            </button>
          </div>
        </div>

        {/* 1. DESKTOP VIEW: Clean 5-Column Evidence Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-300" aria-label="Eligibility evidence comparison table">
            <thead className="bg-[#0b2545] text-white font-bold">
              <tr>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">
                  {language === 'kn' ? 'ಅಗತ್ಯತೆ' : 'Requirement'}
                </th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">{t.why.studentReported}</th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-1/5">{t.why.schemeCriteria}</th>
                <th scope="col" className="px-4 py-3 border-r border-slate-700 w-28 text-center">{t.why.ruleEvaluation}</th>
                <th scope="col" className="px-4 py-3">{t.why.ruleJustification}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEvaluations.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/80 transition ${
                    item.status === 'failed'
                      ? 'bg-rose-50/20'
                      : item.status === 'needs_verification'
                      ? 'bg-amber-50/20'
                      : ''
                  }`}
                >
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
                        <span>{t.status.pass}</span>
                      </span>
                    )}
                    {item.status === 'needs_verification' && (
                      <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-xs font-black">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                        <span>{t.status.needsVerificationRule}</span>
                      </span>
                    )}
                    {item.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-xs font-black">
                        <X className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
                        <span>{t.status.failed}</span>
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

        {/* 2. MOBILE VIEW: Fully Responsive Evidence Cards */}
        <div className="block md:hidden space-y-3.5" aria-label="Mobile evidence cards">
          {filteredEvaluations.map((item) => (
            <article
              key={item.id}
              className={`rounded-lg border p-4 space-y-3 ${
                item.status === 'passed'
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : item.status === 'needs_verification'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-rose-300 bg-rose-50/30'
              }`}
            >
              {/* Header: Requirement + Status Badge */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {language === 'kn' ? 'ಅಗತ್ಯತೆ' : 'Requirement'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.condition}</h3>
                </div>

                {item.status === 'passed' && (
                  <span className="inline-flex items-center gap-1 text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-xs font-black shrink-0">
                    <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                    <span>{t.status.pass}</span>
                  </span>
                )}
                {item.status === 'needs_verification' && (
                  <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-[11px] font-black shrink-0">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                    <span>{t.status.needsVerificationRule}</span>
                  </span>
                )}
                {item.status === 'failed' && (
                  <span className="inline-flex items-center gap-1 text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-xs font-black shrink-0">
                    <X className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
                    <span>{t.status.failed}</span>
                  </span>
                )}
              </div>

              {/* 2-Column values: Student Info vs Scholarship Requirement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="rounded border border-slate-200 bg-white p-2.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {t.why.studentReported}
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">{item.studentValue}</p>
                </div>
                <div className="rounded border border-slate-200 bg-white p-2.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {t.why.schemeCriteria}
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">{item.requiredValue}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="rounded bg-white p-2.5 border border-slate-200 text-xs leading-relaxed text-slate-800">
                <strong className="text-slate-900">{t.why.ruleJustification}: </strong>
                <span>{item.explanation}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Required Documents Interactive Readiness Checklist for this Scheme */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 space-y-4 shadow-xs" aria-labelledby="scheme-docs-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
            <div>
              <h2 id="scheme-docs-heading" className="text-base sm:text-lg font-bold text-[#0b2545]">
                {language === 'kn'
                  ? `ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ (${scholarship.documents.length})`
                  : `Required Documents Checklist (${scholarship.documents.length})`}
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'kn'
                  ? 'ದಾಖಲೆ ಸಿದ್ಧವಿದ್ದಾಗ ಗುರುತಿಸಿ. ವಿವರಗಳು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹವಾಗುತ್ತವೆ.'
                  : 'Tick each document as ready. Progress is saved automatically to your device.'}
              </p>
            </div>
          </div>

          <button
            onClick={onGoToDocuments}
            className="self-start sm:self-auto text-xs font-bold text-[#0b2545] hover:underline inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8"
          >
            <span>{language === 'kn' ? 'ಎಲ್ಲಾ ದಾಖಲೆಗಳ ಪೋರ್ಟಲ್' : 'All Documents Portal'}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scholarship.documents.map((doc, idx) => {
            const isReady = !!preparedDocs[doc];
            const translatedDoc = translateDoc(doc);
            return (
              <div
                key={idx}
                onClick={() => onToggleDoc && onToggleDoc(doc)}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition ${
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
                <div className="flex items-center gap-2.5">
                  {isReady ? (
                    <CheckSquare className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                  <span className={`text-xs ${isReady ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {translatedDoc}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                    isReady
                      ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                      : 'border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  {isReady
                    ? `☑ ${language === 'kn' ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready'}`
                    : `☐ ${language === 'kn' ? 'ಬಾಕಿ ಇದೆ' : 'Pending'}`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onGoToDocuments}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
        >
          <FileCheck2 className="h-4 w-4 text-slate-600" aria-hidden="true" />
          <span>{language === 'kn' ? 'ಸಂಪೂರ್ಣ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ತೆರೆಯಿರಿ' : 'Open Full Documents Checklist'}</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          {onAskAssistant && (
            <button
              onClick={() => onAskAssistant(scholarship.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-[#0b2545] bg-white px-4 py-2.5 text-xs font-bold text-[#0b2545] hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
            >
              <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{t.nav.assistant}</span>
            </button>
          )}

          {onViewDetails && (
            <button
              onClick={() => onViewDetails(scholarship.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#0b2545] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
            >
              <span>{language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View Complete Scholarship Details'}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
