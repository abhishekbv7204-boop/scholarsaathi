import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  CheckSquare,
  Square,
  AlertCircle,
  FileText,
  ShieldCheck,
  RotateCcw,
  Check,
} from 'lucide-react';
import { ScholarshipMatch } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DocumentChecklistPageProps {
  matches: ScholarshipMatch[];
  preparedDocs: Record<string, boolean>;
  onToggleDoc: (docName: string) => void;
  onResetDocs: () => void;
}

export const DocumentChecklistPage: React.FC<DocumentChecklistPageProps> = ({
  matches,
  preparedDocs,
  onToggleDoc,
  onResetDocs,
}) => {
  const { language, t, translateDoc, translateCategory } = useLanguage();
  const [filterState, setFilterState] = useState<'all' | 'prepared' | 'pending'>('all');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('all');

  // Core base standard documents
  const baseStandardDocs = useMemo(() => [
    {
      name: 'Marks card',
      category: 'Academic',
      note: 'Attested copy of previous qualifying examination or semester mark sheets.',
    },
    {
      name: 'Income certificate',
      category: 'Financial',
      note: 'Issued by Tehsildar / Sub-Divisional Magistrate with active financial year validity.',
    },
    {
      name: 'Caste/category certificate',
      category: 'Category',
      note: 'Permanent caste/category verification certificate with RD/Bar-code reference.',
    },
    {
      name: 'College ID',
      category: 'Institutional',
      note: 'Proof of current regular full-time enrollment with college principal seal / Bonafide certificate.',
    },
    {
      name: 'Bank details',
      category: 'Banking',
      note: 'Active savings bank account passbook in student’s own name seeded with Aadhaar / NPCI mapper.',
    },
    {
      name: 'Residence / Domicile Certificate',
      category: 'Identity',
      note: 'Proof of permanent resident status in the relevant state.',
    },
    {
      name: 'Fee Receipt of Current Year',
      category: 'Institutional',
      note: 'Official college tuition fee receipt showing admission category.',
    },
    {
      name: 'Hostel Bonafide Certificate',
      category: 'Accommodation',
      note: 'Warden-signed bonafide certificate for hosteller allowance claim.',
    },
  ], []);

  // Aggregate all unique documents from matched scholarships
  const allDocs = useMemo(() => {
    if (selectedSchemeId !== 'all') {
      const targetMatch = matches.find((m) => m.scholarship.id === selectedSchemeId);
      if (targetMatch) {
        return targetMatch.scholarship.documents.map((docName) => {
          const found = baseStandardDocs.find((d) => d.name.toLowerCase() === docName.toLowerCase());
          return {
            name: docName,
            category: found ? found.category : 'Official Document',
            note: found ? found.note : `Required for ${targetMatch.scholarship.name}.`,
          };
        });
      }
    }

    const docMap = new Map<string, { name: string; category: string; note: string }>();
    baseStandardDocs.forEach((d) => docMap.set(d.name.toLowerCase(), d));

    matches.forEach((m) => {
      m.scholarship.documents.forEach((doc) => {
        const key = doc.toLowerCase();
        if (!docMap.has(key)) {
          docMap.set(key, {
            name: doc,
            category: 'Official Requirement',
            note: `Required by ${m.scholarship.name}`,
          });
        }
      });
    });

    return Array.from(docMap.values());
  }, [matches, selectedSchemeId, baseStandardDocs]);

  const totalCount = allDocs.length;
  const preparedCount = allDocs.filter((d) => !!preparedDocs[d.name]).length;
  const percentComplete = totalCount > 0 ? Math.round((preparedCount / totalCount) * 100) : 0;

  const displayedDocs = allDocs.filter((d) => {
    const isPrepared = !!preparedDocs[d.name];
    if (filterState === 'prepared') return isPrepared;
    if (filterState === 'pending') return !isPrepared;
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 w-full overflow-x-hidden" id="main-content">
      {/* Header */}
      <header className="border-b border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <span>
              {language === 'kn'
                ? 'ಅಭ್ಯರ್ಥಿಯ ಸಿದ್ಧತೆ ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳು'
                : 'Applicant Readiness & Documentation'}
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
            {t.docs.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-700">
            {t.docs.subtitle}
          </p>
        </div>

        <button
          onClick={onResetDocs}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
          <span>{t.docs.resetChecklist}</span>
        </button>
      </header>

      {/* Progress Banner */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 shadow-xs" aria-labelledby="readiness-status-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 id="readiness-status-heading" className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              {t.docs.readinessStatus}
            </h2>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {language === 'kn'
                ? `${totalCount} ದಾಖಲೆಗಳಲ್ಲಿ ${preparedCount} ಸಿದ್ಧವಾಗಿವೆ`
                : `${preparedCount} of ${totalCount} documents ready`}
            </div>
          </div>
          <div className="sm:text-right">
            <span className="text-base font-bold text-[#0b2545]">{percentComplete}% Complete</span>
          </div>
        </div>

        {/* Progress bar line */}
        <div
          className="h-2.5 w-full rounded bg-slate-200 overflow-hidden"
          role="progressbar"
          aria-valuenow={percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Document preparation progress"
        >
          <div
            className="h-full bg-[#0b2545] transition-all duration-300 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-slate-600">
          {percentComplete === 100
            ? language === 'kn'
              ? 'ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಸಿದ್ಧವೆಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಪ್ರಮಾಣಪತ್ರಗಳ ಮಾನ್ಯತೆಯ ದಿನಾಂಕವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
              : 'All documents marked as ready. Ensure all certificates possess active revenue validity dates.'
            : language === 'kn'
            ? 'ನಿಮ್ಮ ಬಳಿ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಡಿಜಿಲಾಕರ್ ಪ್ರತಿ ಲಭ್ಯವಿದ್ದಾಗ ಪರಿಶೀಲನಾ ಪೆಟ್ಟಿಗೆಯನ್ನು ಗುರುತಿಸಿ.'
            : 'Tick each document as Ready once you have verified your physical certificate or DigiLocker copy.'}
        </p>
      </section>

      {/* Filter by Scholarship Scheme */}
      <section className="rounded-lg border border-slate-300 bg-white p-4 space-y-3" aria-label="Filter documents by scholarship scheme">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="filter-scheme-docs" className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಯ ಮೂಲಕ ದಾಖಲೆಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ:' : 'Filter Documents by Scholarship Scheme:'}
          </label>
          <select
            id="filter-scheme-docs"
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-900 focus:border-[#0b2545] focus:outline-none"
          >
            <option value="all">
              {language === 'kn'
                ? `ಎಲ್ಲಾ ಮೌಲ್ಯಮಾಪನಗೊಂಡ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು (${matches.length} ಯೋಜನೆಗಳು)`
                : `All Evaluated Scholarships (${matches.length} Schemes)`}
            </option>
            {matches.map((m) => (
              <option key={m.scholarship.id} value={m.scholarship.id}>
                {m.scholarship.name} ({m.scholarship.documents.length} docs)
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Filter Tabs: All, Prepared, Pending */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1 text-xs" role="tablist" aria-label="Document status tabs">
          <button
            role="tab"
            aria-selected={filterState === 'all'}
            onClick={() => setFilterState('all')}
            className={`rounded px-3 py-1.5 font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9 ${
              filterState === 'all'
                ? 'bg-[#0b2545] text-white shadow-xs'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.buttons.all} ({totalCount})
          </button>
          <button
            role="tab"
            aria-selected={filterState === 'prepared'}
            onClick={() => setFilterState('prepared')}
            className={`rounded px-3 py-1.5 font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9 ${
              filterState === 'prepared'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.docs.ready} ({preparedCount})
          </button>
          <button
            role="tab"
            aria-selected={filterState === 'pending'}
            onClick={() => setFilterState('pending')}
            className={`rounded px-3 py-1.5 font-bold transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9 ${
              filterState === 'pending'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.docs.notReady} ({totalCount - preparedCount})
          </button>
        </div>
      </div>

      {/* Checklist Items with Accessible Checkboxes */}
      <section aria-label="Documents checklist" className="space-y-3">
        {displayedDocs.map((doc, index) => {
          const isPrepared = !!preparedDocs[doc.name];
          const translatedName = translateDoc(doc.name);
          const translatedCategory = translateCategory(doc.category);

          return (
            <article
              key={index}
              onClick={() => onToggleDoc(doc.name)}
              className={`cursor-pointer rounded-lg border p-4 transition flex items-start justify-between gap-4 ${
                isPrepared
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
              role="checkbox"
              aria-checked={isPrepared}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onToggleDoc(doc.name);
                }
              }}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  aria-label={`${isPrepared ? 'Mark as not ready' : 'Mark as ready'}: ${translatedName}`}
                  className="mt-0.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  {isPrepared ? (
                    <CheckSquare className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <Square className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      className={`text-sm font-bold ${
                        isPrepared ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}
                    >
                      {translatedName}
                    </h2>
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {translatedCategory}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{doc.note}</p>
                </div>
              </div>

              <div className="shrink-0 self-center">
                {isPrepared ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded">
                    ☑ {t.docs.ready}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded">
                    ☐ {t.docs.notReady}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Privacy Notice Banner */}
      <aside aria-label="Privacy notice" className="rounded-lg border border-slate-300 bg-slate-100 p-4 text-xs text-slate-700 flex items-start gap-2.5">
        <AlertCircle className="h-4 w-4 text-[#0b2545] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ಮಾತ್ರ:' : 'Local-Only Checklist:'}</strong>{' '}
          {t.docs.privacyNotice}
        </p>
      </aside>
    </div>
  );
};
