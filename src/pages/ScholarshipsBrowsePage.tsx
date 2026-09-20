import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Building2,
  Calendar,
  ExternalLink,
  ArrowRight,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  ShieldCheck,
  X,
  ArrowUpDown,
} from 'lucide-react';
import {
  CourseOption,
  InstitutionType,
  ScholarshipMatch,
  SocialCategory,
  StudentProfile,
  YearOfStudy,
} from '../types';
import { INDIAN_STATES, SCHOLARSHIPS_DATASET } from '../data/scholarships';
import { useLanguage } from '../context/LanguageContext';

export type SortCriteria =
  | 'relevance'
  | 'eligible-first'
  | 'name-asc'
  | 'income-limit'
  | 'min-marks';

interface ScholarshipsBrowsePageProps {
  matches: ScholarshipMatch[];
  student: StudentProfile | null;
  onSelectScholarship: (scholarshipId: string) => void;
  onViewWhyResult: (scholarshipId: string) => void;
  onCheckEligibility: () => void;
  initialSearchQuery?: string;
}

export const ScholarshipsBrowsePage: React.FC<ScholarshipsBrowsePageProps> = ({
  matches,
  student,
  onSelectScholarship,
  onViewWhyResult,
  onCheckEligibility,
  initialSearchQuery = '',
}) => {
  const { language, t, translateDoc } = useLanguage();

  // 1. Search State
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // 2. Filters State (8 filters)
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('All');
  const [selectedIncomeCap, setSelectedIncomeCap] = useState<string>('All');
  const [selectedMinPercentage, setSelectedMinPercentage] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // 3. Sorting State
  const [sortBy, setSortBy] = useState<SortCriteria>('relevance');

  // 4. Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  const matchMap = useMemo(() => {
    const map = new Map<string, ScholarshipMatch>();
    matches.forEach((m) => map.set(m.scholarship.id, m));
    return map;
  }, [matches]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== 'All') count++;
    if (selectedCourse !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    if (selectedYear !== 'All') count++;
    if (selectedInstitutionType !== 'All') count++;
    if (selectedIncomeCap !== 'All') count++;
    if (selectedMinPercentage !== 'All') count++;
    if (selectedStatus !== 'All') count++;
    return count;
  }, [
    selectedState,
    selectedCourse,
    selectedCategory,
    selectedYear,
    selectedInstitutionType,
    selectedIncomeCap,
    selectedMinPercentage,
    selectedStatus,
  ]);

  const hasAnyActiveCriteria = activeFiltersCount > 0 || searchQuery.trim().length > 0 || sortBy !== 'relevance';

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedCourse('All');
    setSelectedCategory('All');
    setSelectedYear('All');
    setSelectedInstitutionType('All');
    setSelectedIncomeCap('All');
    setSelectedMinPercentage('All');
    setSelectedStatus('All');
    setSortBy('relevance');
  };

  const filteredScholarships = useMemo(() => {
    const filtered = SCHOLARSHIPS_DATASET.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = item.name.toLowerCase().includes(q);
        const inProvider = item.provider.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inState = item.state ? item.state.toLowerCase().includes(q) : 'all india'.includes(q);
        const inCourses = item.courses.some((c) => c.toLowerCase().includes(q));
        const inCategories = item.categories.some((cat) => cat.toLowerCase().includes(q));
        if (!inName && !inProvider && !inDesc && !inState && !inCourses && !inCategories) {
          return false;
        }
      }

      if (selectedState !== 'All') {
        if (selectedState === 'All India') {
          if (item.state !== null && item.state !== undefined) return false;
        } else {
          if (item.state !== selectedState && item.state !== null && item.state !== undefined) {
            return false;
          }
        }
      }

      if (selectedCourse !== 'All') {
        if (!item.courses.includes(selectedCourse as CourseOption) && !item.courses.includes('Other')) {
          return false;
        }
      }

      if (selectedCategory !== 'All') {
        if (!item.categories.includes(selectedCategory as SocialCategory) && !item.categories.includes('Other')) {
          return false;
        }
      }

      if (selectedYear !== 'All') {
        const itemYears = item.eligibleYears || item.years || [];
        if (itemYears.length > 0 && !itemYears.includes(selectedYear as YearOfStudy)) {
          return false;
        }
      }

      if (selectedInstitutionType !== 'All') {
        if (item.institutionTypes && !item.institutionTypes.includes(selectedInstitutionType as InstitutionType)) {
          return false;
        }
      }

      if (selectedIncomeCap !== 'All') {
        const cap = Number(selectedIncomeCap);
        const itemMaxIncome = item.maxFamilyIncome ?? item.maximumIncome;
        if (itemMaxIncome !== undefined && itemMaxIncome > cap) {
          return false;
        }
      }

      if (selectedMinPercentage !== 'All') {
        const minCutoff = Number(selectedMinPercentage);
        const itemCutoff = item.minPercentage ?? item.minimumPercentage ?? 0;
        if (itemCutoff > minCutoff) {
          return false;
        }
      }

      if (selectedStatus !== 'All') {
        const match = matchMap.get(item.id);
        if (!match || match.status !== selectedStatus) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'relevance') {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const getMatchTier = (item: typeof a): number => {
            const nameLower = item.name.toLowerCase();
            if (nameLower === q) return 5;
            if (nameLower.startsWith(q)) return 4;
            if (nameLower.includes(q)) return 3;
            if (item.provider.toLowerCase().includes(q)) return 2;
            return 1;
          };
          const tierDiff = getMatchTier(b) - getMatchTier(a);
          if (tierDiff !== 0) return tierDiff;
        }

        const statusOrder: Record<string, number> = {
          'Likely Eligible': 1,
          'Needs Verification': 2,
          'Not Eligible': 3,
        };
        const statusA = matchMap.get(a.id)?.status;
        const statusB = matchMap.get(b.id)?.status;
        if (statusA && statusB && statusA !== statusB) {
          return (statusOrder[statusA] || 4) - (statusOrder[statusB] || 4);
        }
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'eligible-first') {
        const statusOrder: Record<string, number> = {
          'Likely Eligible': 1,
          'Needs Verification': 2,
          'Not Eligible': 3,
        };
        const statusA = matchMap.get(a.id)?.status;
        const statusB = matchMap.get(b.id)?.status;
        const rankA = statusA ? statusOrder[statusA] || 4 : 4;
        const rankB = statusB ? statusOrder[statusB] || 4 : 4;
        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'income-limit') {
        const incA = a.maxFamilyIncome ?? a.maximumIncome ?? Number.MAX_SAFE_INTEGER;
        const incB = b.maxFamilyIncome ?? b.maximumIncome ?? Number.MAX_SAFE_INTEGER;
        if (incA !== incB) return incA - incB;
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'min-marks') {
        const markA = a.minPercentage ?? a.minimumPercentage ?? 0;
        const markB = b.minPercentage ?? b.minimumPercentage ?? 0;
        if (markA !== markB) return markA - markB;
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [
    searchQuery,
    selectedState,
    selectedCourse,
    selectedCategory,
    selectedYear,
    selectedInstitutionType,
    selectedIncomeCap,
    selectedMinPercentage,
    selectedStatus,
    sortBy,
    matchMap,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 w-full overflow-x-hidden" id="main-content">
      {/* Header Banner */}
      <header className="border-b border-slate-300 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
              <span>
                {language === 'kn'
                  ? 'ರಚನಾತ್ಮಕ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳ ಡೈರೆಕ್ಟರಿ'
                  : 'Structured Scholarship Schemes Directory'}
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
              {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳ ಡೈರೆಕ್ಟರಿ' : 'Scholarship Schemes Directory'}
            </h1>
            <p className="mt-1 text-sm text-slate-700 max-w-3xl">
              {language === 'kn'
                ? 'ರಾಜ್ಯ ಇಲಾಖೆಗಳು, ಕೇಂದ್ರ ಸಚಿವಾಲಯಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ದತ್ತಿಗಳ ರಚನಾತ್ಮಕ ಅರ್ಹತಾ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.'
                : 'Browse structured eligibility schemes across state departments, central ministries, and institutional endowments.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onCheckEligibility}
              className="rounded bg-[#0b2545] px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
            >
              {student
                ? language === 'kn'
                  ? 'ಪ್ರೊಫೈಲ್ ಮ್ಯಾಚಿಂಗ್ ಪರಿಶೀಲಿಸಿ'
                  : 'Review Profile Matching'
                : language === 'kn'
                ? 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ'
                : 'Check Your Eligibility'}
            </button>
          </div>
        </div>
      </header>

      {/* Trust Section */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 space-y-1.5 shadow-xs" aria-label="Trust & Verification Notice">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0b2545]">
          <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
          <span>Evidence-based scholarship discovery</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          Eligibility results are based on structured rules and should be verified against the latest official scholarship notification.
        </p>
      </section>

      {/* Main Search & Filter Control Panel */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 space-y-4" aria-label="Search and filter scholarships">
        {/* Search Box */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <label htmlFor="browse-search-input" className="sr-only">
              {language === 'kn'
                ? 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ಹೆಸರು, ಇಲಾಖೆ, ಕೋರ್ಸ್ ಅಥವಾ ರಾಜ್ಯದ ಮೂಲಕ ಹುಡುಕಿ'
                : 'Search scholarships by name, provider, description, course, state or category'}
            </label>
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            <input
              id="browse-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'kn'
                  ? 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ಹೆಸರು, ಇಲಾಖೆ, ಕೋರ್ಸ್ ಅಥವಾ ರಾಜ್ಯದ ಮೂಲಕ ಹುಡುಕಿ...'
                  : 'Search by scholarship name, provider, description, course, state, category...'
              }
              className="w-full rounded border border-slate-300 bg-white pl-11 pr-10 py-3 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700 min-h-7 min-w-7 flex items-center justify-center"
                aria-label="Clear search text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Drawer Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-100 transition min-h-11"
            aria-label="Open filter options"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <span>{language === 'kn' ? 'ಫಿಲ್ಟರ್‌ಗಳು ಮತ್ತು ವಿಂಗಡಣೆ' : 'Filters & Sort'}</span>
            {activeFiltersCount > 0 && (
              <span className="rounded-full bg-[#0b2545] px-2 py-0.5 text-[10px] font-bold text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Filters Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-3 pt-1 border-t border-slate-200">
          {/* Filter 1: State */}
          <div>
            <label htmlFor="filter-state" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.stateLabel}
            </label>
            <select
              id="filter-state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು / ಕೇಂದ್ರ' : 'All States / Central Schemes'}</option>
              <option value="Karnataka">Karnataka (State Domicile)</option>
              <option value="All India">All India (Central / National)</option>
              {INDIAN_STATES.filter((s) => s !== 'Karnataka').map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 2: Course */}
          <div>
            <label htmlFor="filter-course" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.courseLabel}
            </label>
            <select
              id="filter-course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳು' : 'All Courses'}</option>
              <option value="B.E.">B.E. (Bachelor of Engineering)</option>
              <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
              <option value="B.Sc">B.Sc (Bachelor of Science)</option>
              <option value="B.Com">B.Com (Bachelor of Commerce)</option>
              <option value="B.A.">B.A. (Bachelor of Arts)</option>
              <option value="Diploma">Diploma (Polytechnic)</option>
              <option value="Other">Other Higher Education</option>
            </select>
          </div>

          {/* Filter 3: Category */}
          <div>
            <label htmlFor="filter-category" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.categoryLabel}
            </label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ವರ್ಗಗಳು' : 'All Categories'}</option>
              <option value="General">General / Unreserved</option>
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
            </select>
          </div>

          {/* Filter 4: Year */}
          <div>
            <label htmlFor="filter-year" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.yearLabel}
            </label>
            <select
              id="filter-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ಶೈಕ್ಷಣಿಕ ವರ್ಷಗಳು' : 'All Academic Years'}</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          {/* Filter 5: Institution Type */}
          <div>
            <label htmlFor="filter-institution" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.institutionTypeLabel}
            </label>
            <select
              id="filter-institution"
              value={selectedInstitutionType}
              onChange={(e) => setSelectedInstitutionType(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ಸಂಸ್ಥೆಗಳು' : 'All Institution Types'}</option>
              <option value="Government">Government Colleges</option>
              <option value="Government-aided">Government-Aided</option>
              <option value="Private">Private / Self-Financed</option>
            </select>
          </div>

          {/* Filter 6: Maximum Family Income */}
          <div>
            <label htmlFor="filter-income" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.annualIncomeLabel}
            </label>
            <select
              id="filter-income"
              value={selectedIncomeCap}
              onChange={(e) => setSelectedIncomeCap(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಯಾವುದೇ ಆದಾಯ ಮಿತಿ' : 'Any Income Limit'}</option>
              <option value="150000">Up to ₹1.5 Lakhs/year</option>
              <option value="250000">Up to ₹2.5 Lakhs/year</option>
              <option value="450000">Up to ₹4.5 Lakhs/year</option>
              <option value="600000">Up to ₹6.0 Lakhs/year</option>
              <option value="800000">Up to ₹8.0 Lakhs/year</option>
            </select>
          </div>

          {/* Filter 7: Minimum Percentage */}
          <div>
            <label htmlFor="filter-percentage" className="block text-xs font-bold text-slate-700 mb-1">
              {t.form.marksLabel}
            </label>
            <select
              id="filter-percentage"
              value={selectedMinPercentage}
              onChange={(e) => setSelectedMinPercentage(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{language === 'kn' ? 'ಯಾವುದೇ ಅಂಕಗಳು' : 'Any Percentage Required'}</option>
              <option value="50">Up to 50% Required</option>
              <option value="60">Up to 60% Required</option>
              <option value="75">Up to 75% Required</option>
              <option value="80">Up to 80% Required</option>
              <option value="85">Up to 85% Required</option>
            </select>
          </div>

          {/* Filter 8: Eligibility Status */}
          <div>
            <label htmlFor="filter-status" className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'kn' ? 'ಅರ್ಹತಾ ಸ್ಥಿತಿ' : 'Eligibility Status'}
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="All">{t.buttons.all}</option>
              <option value="Likely Eligible">{t.status.likelyEligible}</option>
              <option value="Needs Verification">{t.status.needsVerification}</option>
              <option value="Not Eligible">{t.status.notEligible}</option>
            </select>
          </div>
        </div>

        {/* Sorting & Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
          <div className="flex items-center gap-3 text-slate-700">
            <span>
              {language === 'kn' ? 'ತೋರಿಸಲಾಗುತ್ತಿದೆ: ' : 'Showing '}
              <strong>{filteredScholarships.length}</strong>{' '}
              {language === 'kn' ? 'ರ' : 'of'}{' '}
              <strong>{SCHOLARSHIPS_DATASET.length}</strong>{' '}
              {language === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳು' : 'scholarship schemes'}
            </span>
            {hasAnyActiveCriteria && (
              <button
                id="btn-clear-all-filters-desktop"
                onClick={handleClearAllFilters}
                className="inline-flex items-center gap-1 font-bold text-[#0b2545] hover:underline min-h-8"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>{language === 'kn' ? 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear All Filters'}</span>
              </button>
            )}
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-2">
            <label htmlFor="browse-sort-by" className="font-bold text-slate-700 whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <span>{language === 'kn' ? 'ವಿಂಗಡಿಸಿ:' : 'Sort by:'}</span>
            </label>
            <select
              id="browse-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortCriteria)}
              className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            >
              <option value="relevance">{language === 'kn' ? 'ಹೆಚ್ಚು ಸೂಕ್ತವಾದದ್ದು' : 'Most relevant'}</option>
              <option value="eligible-first">{language === 'kn' ? 'ಅರ್ಹತೆಯ ಆಧಾರದಲ್ಲಿ ಮೊದಲು' : 'Likely eligible first'}</option>
              <option value="name-asc">{language === 'kn' ? 'ಹೆಸರು A-Z' : 'Name A-Z'}</option>
              <option value="income-limit">{language === 'kn' ? 'ಆದಾಯ ಮಿತಿ' : 'Income limit'}</option>
              <option value="min-marks">{language === 'kn' ? 'ಕನಿಷ್ಠ ಅಂಕಗಳು' : 'Minimum marks'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Mobile Drawer for Filters */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter Scholarships"
        >
          <div className="relative w-full max-w-md bg-white h-full flex flex-col border-l border-slate-300 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
                <h2 className="text-sm font-bold text-[#0b2545]">
                  {language === 'kn' ? 'ಫಿಲ್ಟರ್ ಮತ್ತು ವಿಂಗಡಣೆ' : 'Filter & Sort Scholarships'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded text-slate-500 hover:text-slate-800 min-h-11 min-w-11 flex items-center justify-center"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div>
                <label htmlFor="mobile-filter-state" className="block font-bold text-slate-800 mb-1">
                  {t.form.stateLabel}
                </label>
                <select
                  id="mobile-filter-state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                >
                  <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು' : 'All States / Central Schemes'}</option>
                  <option value="Karnataka">Karnataka (State Domicile)</option>
                  <option value="All India">All India (Central / National)</option>
                  {INDIAN_STATES.filter((s) => s !== 'Karnataka').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mobile-filter-course" className="block font-bold text-slate-800 mb-1">
                  {t.form.courseLabel}
                </label>
                <select
                  id="mobile-filter-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                >
                  <option value="All">{language === 'kn' ? 'ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳು' : 'All Courses'}</option>
                  <option value="B.E.">B.E.</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.Com">B.Com</option>
                  <option value="B.A.">B.A.</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>

              <div>
                <label htmlFor="mobile-filter-status" className="block font-bold text-slate-800 mb-1">
                  {language === 'kn' ? 'ಅರ್ಹತಾ ಸ್ಥಿತಿ' : 'Eligibility Status'}
                </label>
                <select
                  id="mobile-filter-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                >
                  <option value="All">{t.buttons.all}</option>
                  <option value="Likely Eligible">{t.status.likelyEligible}</option>
                  <option value="Needs Verification">{t.status.needsVerification}</option>
                  <option value="Not Eligible">{t.status.notEligible}</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full rounded bg-[#0b2545] py-2.5 text-xs font-bold text-white hover:bg-[#133b68] min-h-11"
              >
                {language === 'kn' ? `${filteredScholarships.length} ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸಿ` : `Show ${filteredScholarships.length} Results`}
              </button>
              {hasAnyActiveCriteria && (
                <button
                  type="button"
                  id="btn-clear-all-filters-mobile"
                  onClick={handleClearAllFilters}
                  className="w-full rounded border border-slate-300 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 min-h-11"
                >
                  {language === 'kn' ? 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear All Filters'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Official Listing Results / Empty State */}
      <section aria-label="Available scholarships listing" className="space-y-4">
        {filteredScholarships.length === 0 ? (
          <div
            id="browse-empty-state"
            className="rounded-lg border border-slate-300 bg-white p-12 text-center space-y-3"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Search className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.'
                : 'No scholarships match your current filters.'}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {language === 'kn'
                ? 'ಕೆಲವು ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಅಥವಾ ಹುಡುಕಾಟ ಪಠ್ಯವನ್ನು ತೆರವುಗೊಳಿಸಿ.'
                : 'Try removing some of your filter constraints, clearing the search query, or checking back for newly audited schemes.'}
            </p>
            <div className="pt-2">
              <button
                id="btn-clear-filters-empty-state"
                onClick={handleClearAllFilters}
                className="inline-flex items-center gap-1.5 rounded bg-[#0b2545] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{language === 'kn' ? 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ' : 'Clear Filters'}</span>
              </button>
            </div>
          </div>
        ) : (
          filteredScholarships.map((scholarship) => {
            const match = matchMap.get(scholarship.id);
            const status = match?.status;

            return (
              <article
                key={scholarship.id}
                id={`scheme-item-${scholarship.id}`}
                className="rounded-lg border border-slate-300 bg-white p-5 sm:p-6 transition hover:border-slate-400 shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {status === 'Likely Eligible' && (
                        <span className="inline-flex items-center gap-1.5 rounded border-2 border-emerald-600 bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-950">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.likelyEligible}</span>
                          <span className="rounded bg-emerald-700 text-white text-[9px] font-black px-1 py-0.2">PASS</span>
                        </span>
                      )}
                      {status === 'Needs Verification' && (
                        <span className="inline-flex items-center gap-1.5 rounded border-2 border-amber-600 bg-amber-50 px-2.5 py-0.5 font-bold text-amber-950">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.needsVerification}</span>
                          <span className="rounded bg-amber-700 text-white text-[9px] font-black px-1 py-0.2">VERIFY</span>
                        </span>
                      )}
                      {status === 'Not Eligible' && (
                        <span className="inline-flex items-center gap-1.5 rounded border-2 border-rose-600 bg-rose-50 px-2.5 py-0.5 font-bold text-rose-950">
                          <XCircle className="h-3.5 w-3.5 text-rose-700 shrink-0" aria-hidden="true" />
                          <span className="uppercase tracking-wide font-black">{t.status.notEligible}</span>
                          <span className="rounded bg-rose-700 text-white text-[9px] font-black px-1 py-0.2">FAIL</span>
                        </span>
                      )}
                      {!status && (
                        <span className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-medium text-slate-700">
                          {language === 'kn' ? 'ಮೌಲ್ಯಮಾಪನ ಲಭ್ಯವಿದೆ' : 'Evaluation Available'}
                        </span>
                      )}

                      <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-semibold text-slate-700">
                        {scholarship.state
                          ? `${language === 'kn' ? 'ರಾಜ್ಯ' : 'State'}: ${scholarship.state}`
                          : language === 'kn'
                          ? 'ಕೇಂದ್ರ / ರಾಷ್ಟ್ರೀಯ ಯೋಜನೆ'
                          : 'Central / All India'}
                      </span>

                      {scholarship.isDemo && (
                        <span className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 font-bold text-amber-900">
                          {language === 'kn' ? 'ಡೆಮೊ ದತ್ತಾಂಶ' : 'Demo Data'}
                        </span>
                      )}

                      <span className="text-slate-500 font-medium">
                        {language === 'kn' ? 'ಲೆಕ್ಕಪರಿಶೋಧನೆ' : 'Audited'}: {scholarship.lastVerified}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#0b2545]">
                      {scholarship.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <Building2 className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
                      <span>{scholarship.provider}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {scholarship.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                      <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                        <span className="text-slate-500 block font-medium">
                          {language === 'kn' ? 'ಆದಾಯ ಮಿತಿ' : 'Income Limit'}
                        </span>
                        <span className="font-bold text-slate-900">
                          {scholarship.maximumIncome ? `₹${scholarship.maximumIncome.toLocaleString('en-IN')}/year` : language === 'kn' ? 'ಯಾವುದೇ ಮಿತಿಯಿಲ್ಲ' : 'No Limit'}
                        </span>
                      </div>
                      <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                        <span className="text-slate-500 block font-medium">
                          {language === 'kn' ? 'ಅಂಕಗಳ ಕಟ್‌ಆಫ್' : 'Academic Cutoff'}
                        </span>
                        <span className="font-bold text-slate-900">
                          {scholarship.minimumPercentage ? `Min ${scholarship.minimumPercentage}%` : language === 'kn' ? 'ಉತ್ತೀರ್ಣ ಅಂಕಗಳು' : 'Passing Marks'}
                        </span>
                      </div>
                      <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                        <span className="text-slate-500 block font-medium">
                          {language === 'kn' ? 'ಅರ್ಹ ವರ್ಗಗಳು' : 'Eligible Categories'}
                        </span>
                        <span className="font-bold text-slate-900 truncate block" title={scholarship.categories.join(', ')}>
                          {scholarship.categories.join(', ')}
                        </span>
                      </div>
                      <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                        <span className="text-slate-500 block font-medium">
                          {language === 'kn' ? 'ಕೋರ್ಸ್‌ಗಳು' : 'Courses'}
                        </span>
                        <span className="font-bold text-slate-900 truncate block" title={scholarship.courses.join(', ')}>
                          {scholarship.courses.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1 font-medium">
                        <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span>
                          {scholarship.documents.length}{' '}
                          {language === 'kn' ? 'ಅಧಿಕೃತ ದಾಖಲೆಗಳು ಅಗತ್ಯವಿದೆ' : 'official documents required'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">•</span>
                        <span>
                          {language === 'kn' ? 'ಮೂಲ' : 'Source'}: <strong>{scholarship.sourceTitle}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-56 shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                    <button
                      id={`btn-browse-view-${scholarship.id}`}
                      onClick={() => onSelectScholarship(scholarship.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded bg-[#0b2545] px-4 py-2 text-xs font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
                    >
                      <span>{t.buttons.viewScholarship}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>

                    <button
                      id={`btn-browse-why-${scholarship.id}`}
                      onClick={() => onViewWhyResult(scholarship.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-[#0b2545] hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                      <span>{t.buttons.whyThisResult}</span>
                    </button>

                    <a
                      id={`link-browse-source-${scholarship.id}`}
                      href={scholarship.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-9"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                      <span>{t.buttons.officialSource}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};
