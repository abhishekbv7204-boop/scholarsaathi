import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  BookOpen,
  UserCheck,
  FileText,
  HelpCircle,
  CheckCircle2,
  Building2,
  Check,
} from 'lucide-react';
import { ActivePage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  onCheckEligibility: () => void;
  onTryDemo: () => void;
  setActivePage: (page: ActivePage) => void;
  onSearchScholarships: (query: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCheckEligibility,
  onTryDemo,
  setActivePage,
  onSearchScholarships,
}) => {
  const { language, t } = useLanguage();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchScholarships(searchInput.trim());
      setActivePage('scholarships');
    }
  };

  return (
    <div className="space-y-10 pb-16 w-full max-w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative border-b border-slate-300 bg-white py-12 sm:py-16" aria-labelledby="hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-5">
            {/* Project status tag */}
            <div className="inline-flex items-center gap-2 rounded border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-800">
              <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
              <span>
                {language === 'kn'
                  ? 'ಸ್ವತಂತ್ರ ವಿದ್ಯಾರ್ಥಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಾರ್ಗದರ್ಶಿ ಪೋರ್ಟಲ್'
                  : 'Independent Student Welfare & Discovery Engine'}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b2545] tracking-tight leading-[1.15] px-2"
            >
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed px-2">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 px-2">
              <button
                id="hero-check-eligibility-btn"
                onClick={onCheckEligibility}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#0b2545] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-11"
              >
                <span>{t.hero.checkEligibility}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                id="hero-browse-scholarships-btn"
                onClick={() => setActivePage('scholarships')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-slate-50 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0b2545] hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
              >
                <span>{t.hero.browseScholarships}</span>
              </button>

              <button
                id="hero-try-demo-btn"
                onClick={onTryDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 transition min-h-11 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
              >
                <Sparkles className="h-4 w-4 text-blue-700" aria-hidden="true" />
                <span>{t.hero.tryDemo}</span>
              </button>
            </div>

            {/* Trust message */}
            <div className="pt-2 text-xs font-semibold text-slate-600">
              <span>{t.hero.tagline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Section (Evidence-based scholarship discovery) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="trust-section-heading">
        <div className="rounded-lg border border-slate-300 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <span>{language === 'kn' ? 'ವಿಶ್ವಾಸಾರ್ಹತೆ & ಪಾರದರ್ಶಕತೆ' : 'Verification & Transparency'}</span>
          </div>

          <h2 id="trust-section-heading" className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-[#0b2545] tracking-tight">
            {t.trust.heading}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
            {t.trust.subheading}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-[#0b2545] text-white text-xs font-bold">
                  1
                </div>
                <h3 className="text-sm font-bold text-[#0b2545]">{t.trust.rule1Title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.trust.rule1Desc}
              </p>
            </div>

            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-[#0b2545] text-white text-xs font-bold">
                  2
                </div>
                <h3 className="text-sm font-bold text-[#0b2545]">{t.trust.rule2Title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.trust.rule2Desc}
              </p>
            </div>

            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-[#0b2545] text-white text-xs font-bold">
                  3
                </div>
                <h3 className="text-sm font-bold text-[#0b2545]">{t.trust.rule3Title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.trust.rule3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Access Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="quick-access-heading">
        <div className="border border-slate-300 bg-white p-6 rounded-lg">
          <h2 id="quick-access-heading" className="text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-4">
            {language === 'kn' ? 'ತ್ವರಿತ ಸೇವೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ ಸಾಧನಗಳು' : 'Quick Services & Guidance Tools'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Quick Link 1 */}
            <button
              onClick={() => setActivePage('profile')}
              className="flex flex-col items-center justify-center text-center p-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition group focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white mb-2 group-hover:scale-105 transition-transform">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#0b2545]">{t.nav.findScholarships}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ಕೋರ್ಸ್ & ಅಂಕಗಳ ಆಧಾರಿತ' : 'Filter by course & marks'}
              </span>
            </button>

            {/* Quick Link 2 */}
            <button
              onClick={() => setActivePage('profile')}
              className="flex flex-col items-center justify-center text-center p-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition group focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white mb-2 group-hover:scale-105 transition-transform">
                <UserCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#0b2545]">{t.buttons.checkEligibility}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ಸ್ವಯಂಚಾಲಿತ ನಿಯಮ ಪರಿಶೀಲನೆ' : 'Automated rule check'}
              </span>
            </button>

            {/* Quick Link 3 */}
            <button
              onClick={() => setActivePage('documents')}
              className="flex flex-col items-center justify-center text-center p-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition group focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white mb-2 group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#0b2545]">{t.nav.requiredDocuments}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ' : 'Checklist preparation'}
              </span>
            </button>

            {/* Quick Link 4 */}
            <button
              onClick={() => setActivePage('help')}
              className="flex flex-col items-center justify-center text-center p-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition group focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white mb-2 group-hover:scale-105 transition-transform">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#0b2545]">{t.journey.title}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ಸ್ಪಷ್ಟ ನಿಯಮಗಳ ವಿವರಣೆ' : 'Deterministic rules'}
              </span>
            </button>

            {/* Quick Link 5 */}
            <button
              onClick={() => setActivePage('help')}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center text-center p-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition group focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0b2545] text-white mb-2 group-hover:scale-105 transition-transform">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#0b2545]">{t.nav.help}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ಪ್ರಶ್ನೋತ್ತರ ಮತ್ತು ವ್ಯಾಖ್ಯಾನಗಳು' : 'Status definitions & FAQ'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Prominent Search Box */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="search-schemes-heading">
        <div className="rounded-lg border border-slate-300 bg-slate-50 p-6 sm:p-8">
          <div className="max-w-3xl">
            <h2 id="search-schemes-heading" className="text-xl sm:text-2xl font-bold text-[#0b2545]">
              {t.landingSearch.searchTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {t.landingSearch.searchSubtitle}
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-5 space-y-4">
            <div className="relative">
              <label htmlFor="landing-search-input" className="sr-only">
                {t.landingSearch.searchPlaceholder}
              </label>
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" aria-hidden="true" />
              <input
                id="landing-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.landingSearch.searchPlaceholder}
                className="w-full rounded border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
                <span className="font-semibold">{t.landingSearch.popularCategories}:</span>
                {['Karnataka Post-Matric', 'OBC', 'Engineering', 'Central Sector'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchInput(tag);
                      onSearchScholarships(tag);
                      setActivePage('scholarships');
                    }}
                    className="rounded border border-slate-300 bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="rounded bg-[#0b2545] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
              >
                {t.landingSearch.searchButton}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. Student Journey: 5 Institutional Steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="student-journey-heading">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            {language === 'kn' ? 'ಸೇವಾ ಪ್ರಕ್ರಿಯೆ' : 'Service Process'}
          </h2>
          <p id="student-journey-heading" className="mt-1 text-2xl font-bold text-[#0b2545]">
            {t.journey.title}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            {t.journey.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0b2545] text-xs font-bold text-white">
                1
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Step 01</span>
            </div>
            <h3 className="text-sm font-bold text-[#0b2545] mb-1">{t.journey.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.journey.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0b2545] text-xs font-bold text-white">
                2
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Step 02</span>
            </div>
            <h3 className="text-sm font-bold text-[#0b2545] mb-1">{t.journey.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.journey.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0b2545] text-xs font-bold text-white">
                3
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Step 03</span>
            </div>
            <h3 className="text-sm font-bold text-[#0b2545] mb-1">{t.journey.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.journey.step3Desc}
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0b2545] text-xs font-bold text-white">
                4
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Step 04</span>
            </div>
            <h3 className="text-sm font-bold text-[#0b2545] mb-1">{t.journey.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.journey.step4Desc}
            </p>
          </div>

          {/* Step 5 */}
          <div className="rounded-lg border border-slate-300 bg-white p-5 flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0b2545] text-xs font-bold text-white">
                5
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Step 05</span>
            </div>
            <h3 className="text-sm font-bold text-[#0b2545] mb-1">{t.journey.step5Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.journey.step5Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Institutional Sample Preview: Real Rule Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="preview-sample-heading">
        <div className="rounded-lg border border-slate-300 bg-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <span className="inline-flex items-center gap-1 rounded border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span>
                  {language === 'kn' ? 'ಮಾದರಿ ಮೌಲ್ಯಮಾಪನ: ಬಹುಶಃ ಅರ್ಹರು' : 'Example Assessment: Likely Eligible'}
                </span>
              </span>
              <h3 id="preview-sample-heading" className="mt-2 text-lg sm:text-xl font-bold text-[#0b2545]">
                Karnataka Post-Matric Scholarship for Backward Classes (OBC)
              </h3>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Building2 className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                <span>Dept. of Backward Classes Welfare, Govt. of Karnataka • Source: ssp.postmatric.karnataka.gov.in</span>
              </p>
            </div>

            <button
              onClick={onTryDemo}
              className="rounded bg-[#0b2545] text-white px-4 py-2 text-xs font-bold hover:bg-[#133b68] transition shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
            >
              {language === 'kn' ? 'ಡೆಮೊ ಪ್ರೊಫೈಲ್‌ನೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ' : 'Test with Demo Profile'}
            </button>
          </div>

          {/* Table: Requirement Criteria | Your Information | Requirement | Result */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200" aria-label="Rule evaluation table sample">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5">{t.auditTable.criteria}</th>
                  <th scope="col" className="px-3.5 py-2.5">{t.auditTable.yourData}</th>
                  <th scope="col" className="px-3.5 py-2.5">{t.auditTable.officialRule}</th>
                  <th scope="col" className="px-3.5 py-2.5">{t.auditTable.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-slate-800">
                    {language === 'kn' ? 'ಕುಟುಂಬದ ಆದಾಯ' : 'Family Income'}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700">₹1,80,000 / year</td>
                  <td className="px-3.5 py-2.5 text-slate-700">
                    {language === 'kn' ? '₹2,50,000 / ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ' : 'Below ₹2,50,000 / year'}
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-emerald-800">
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      {t.status.pass}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-slate-800">
                    {language === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳು' : 'Academic Score'}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700">
                    {language === 'kn' ? 'ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್‌ನಲ್ಲಿ 85%' : '85% in previous semester'}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700">
                    {language === 'kn' ? 'ಕನಿಷ್ಠ 60%' : 'Minimum 60%'}
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-emerald-800">
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      {t.status.pass}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-slate-800">
                    {language === 'kn' ? 'ಸಾಮಾಜಿಕ ವರ್ಗ' : 'Social Category'}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700">OBC (Category 2A/3A/3B)</td>
                  <td className="px-3.5 py-2.5 text-slate-700">
                    {language === 'kn' ? 'OBC / EBC ವರ್ಗ ಪ್ರಮಾಣಪತ್ರ' : 'OBC / EBC category certificate'}
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-emerald-800">
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      {t.status.pass}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-slate-800">
                    {language === 'kn' ? 'ರಾಜ್ಯ ವಾಸಸ್ಥಳ' : 'State Domicile'}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700">Karnataka</td>
                  <td className="px-3.5 py-2.5 text-slate-700">
                    {language === 'kn' ? 'ಕರ್ನಾಟಕದ ನಿವಾಸಿ' : 'Resident of Karnataka'}
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-emerald-800">
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      {t.status.pass}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Core Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="core-principles-heading">
        <h2 id="core-principles-heading" className="sr-only">Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-lg border border-slate-300 bg-white p-6">
            <h3 className="text-base font-bold text-[#0b2545] mb-2">
              {language === 'kn' ? '೧. ವೈಯಕ್ತಿಕ ಹೊಂದಾಣಿಕೆ' : '1. Personalized Matching'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'kn'
                ? 'ಕೋರ್ಸ್, ಕಾಲೇಜು ಮಾನ್ಯತೆ, ಶೇಕಡಾವಾರು ಕಟ್‌ಆಫ್, ರಾಜ್ಯ ವಾಸಸ್ಥಳ ಮತ್ತು ಸಾಮಾಜಿಕ ವರ್ಗವನ್ನು ನಿಯಮಾವಳಿಗಳೊಂದಿಗೆ ಹೋಲಿಸುತ್ತದೆ.'
                : 'Compares course degree, college status, percentage cut-offs, state domicile, and social category against statutory norms.'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-300 bg-white p-6">
            <h3 className="text-base font-bold text-[#0b2545] mb-2">
              {language === 'kn' ? '೨. ನಿಯಮವಾರು ವಿವರಣೆ' : '2. Rule-by-Rule Explanation'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'kn'
                ? 'ಪ್ರತಿಯೊಂದು ಫಲಿತಾಂಶವು ಪ್ರತಿಯೊಂದು ಷರತ್ತು ಏಕೆ ಪೂರೈಸಲ್ಪಟ್ಟಿದೆ ಅಥವಾ ಇಲ್ಲ ಎಂಬುದನ್ನು ನಿಖರವಾಗಿ ತಿಳಿಸುತ್ತದೆ.'
                : 'Every result states exactly why each condition was satisfied or not, eliminating confusing rejections.'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-300 bg-white p-6">
            <h3 className="text-base font-bold text-[#0b2545] mb-2">
              {language === 'kn' ? '೩. ಅಧಿಕೃತ ಉಲ್ಲೇಖಗಳು' : '3. Verified Citations'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'kn'
                ? 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು ಅಧಿಕೃತ ಸುತ್ತೋಲೆಗಳನ್ನು ಉಲ್ಲೇಖಿಸುತ್ತವೆ ಮತ್ತು ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ ನೇರ ಲಿಂಕ್‌ಗಳನ್ನು ನೀಡುತ್ತವೆ.'
                : 'All schemes reference official circulars and provide direct links to designated state and central portals.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
