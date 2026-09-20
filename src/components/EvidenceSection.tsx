import React from 'react';
import { ExternalLink, ShieldCheck, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { Scholarship } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface EvidenceSectionProps {
  scholarship: Scholarship;
  compact?: boolean;
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ scholarship, compact = false }) => {
  const { language } = useLanguage();
  const hasUrl = Boolean(scholarship.sourceUrl && scholarship.sourceUrl.trim() !== '');

  return (
    <section
      aria-label={language === 'kn' ? 'ಅಧಿಕೃತ ಪುರಾವೆ ಮತ್ತು ಪರಿಶೀಲನಾ ಮೂಲ' : 'Evidence & Statutory Verification Source'}
      className={`rounded-lg border-2 border-[#0b2545]/20 bg-white overflow-hidden ${
        compact ? 'p-0 text-xs' : 'p-0 text-xs sm:text-sm'
      } space-y-0 shadow-xs`}
    >
      {/* High-Priority Section Header */}
      <div className="bg-[#0b2545] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] sm:text-xs">
            {language === 'kn'
              ? 'ಅಧಿಕೃತ ನಿಯಂತ್ರಕ ಪುರಾವೆ ಮತ್ತು ಲೆಕ್ಕಪರಿಶೋಧನೆ'
              : 'EVIDENCE & STATUTORY AUDIT TRAIL'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {scholarship.isDemo ? (
            <span className="inline-flex items-center gap-1 rounded bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black uppercase">
              {language === 'kn' ? 'ಡೆಮೊ ದತ್ತಾಂಶ' : 'Demo Dataset'}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500 text-white px-2 py-0.5 text-[10px] font-black uppercase">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              {language === 'kn' ? 'ಪರಿಶೀಲಿಸಿದ ಮೂಲ' : 'Verified Rule Audit'}
            </span>
          )}
        </div>
      </div>

      {/* Main Evidence Grid */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Source Title & Issuing Authority */}
          <div className="rounded border border-slate-200 bg-white p-3 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {language === 'kn' ? 'ಮೂಲ ಶೀರ್ಷಿಕೆ / ಪ್ರಾಧಿಕಾರ' : 'Issuing Department / Authority'}
            </span>
            <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
              {scholarship.provider || (language === 'kn' ? 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಇಲಾಖೆ' : 'Official Government Department')}
            </p>
            <p className="text-[11px] text-slate-600">
              {scholarship.sourceTitle || 'Official Gazette / Scheme Guidelines'}
            </p>
          </div>

          {/* Last Audited Date */}
          <div className="rounded border border-slate-200 bg-white p-3 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-500" aria-hidden="true" />
              <span>{language === 'kn' ? 'ಕೊನೆಯದಾಗಿ ಪರಿಶೀಲಿಸಿದ ದಿನಾಂಕ' : 'Last Audited Date'}</span>
            </span>
            <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
              {scholarship.lastVerified || (language === 'kn' ? 'ಪ್ರಸ್ತುತ ಶೈಕ್ಷಣಿಕ ವರ್ಷ' : 'Current Academic Year')}
            </p>
            <p className="text-[11px] text-slate-600">
              Codified against state/national notification circulars
            </p>
          </div>

          {/* Official Source Portal Action */}
          <div className="rounded border border-slate-200 bg-white p-3 space-y-1.5 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {language === 'kn' ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಪರಿಶೀಲನೆ' : 'Official Portal Reference'}
            </span>
            <div>
              {hasUrl ? (
                <a
                  href={scholarship.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full rounded bg-[#0b2545] px-3 py-2 text-xs font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-8.5"
                  aria-label={`Open official portal for ${scholarship.name}`}
                >
                  <span>Open Official Notification / Portal</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-slate-500 italic text-xs font-medium block pt-1">
                  {language === 'kn' ? 'ಅಧಿಕೃತ ಮೂಲ ಲಿಂಕ್ ಲಭ್ಯವಿಲ್ಲ' : 'Official source URL not available in dataset'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Verification Footnote */}
      <div className="p-3 bg-white flex items-start gap-2 text-xs text-slate-700">
        <Info className="h-4 w-4 text-[#0b2545] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-semibold">Evidence-based scholarship discovery:</strong>{' '}
          Eligibility results are based on structured rules and should be verified against the latest official scholarship notification.
        </p>
      </div>
    </section>
  );
};
