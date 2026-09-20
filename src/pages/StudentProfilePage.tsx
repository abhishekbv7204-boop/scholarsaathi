import React, { useState } from 'react';
import {
  Sparkles,
  User,
  GraduationCap,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Building,
  Home,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import {
  AccommodationType,
  CourseOption,
  InstitutionType,
  SocialCategory,
  StudentProfile,
  YearOfStudy,
} from '../types';
import { DEMO_STUDENT, INDIAN_STATES } from '../data/scholarships';
import { useLanguage } from '../context/LanguageContext';

interface StudentProfilePageProps {
  currentProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
  onFindScholarships: (profile: StudentProfile) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  currentProfile,
  onSaveProfile,
  onFindScholarships,
}) => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<StudentProfile>(
    currentProfile || {
      name: 'Abhishek V.',
      state: 'Karnataka',
      district: 'Ballari',
      age: 21,
      course: 'B.E.',
      branch: 'Computer Science',
      yearOfStudy: '3rd',
      academicPercentage: 85,
      annualFamilyIncome: 180000,
      category: 'OBC',
      institutionType: 'Government',
      accommodation: 'Day Scholar',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleInputChange = (field: keyof StudentProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleUseDemo = () => {
    setFormData({ ...DEMO_STUDENT });
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.state.trim()) newErrors.state = t.errors.stateRequired;
      if (!formData.district.trim()) newErrors.district = t.errors.districtRequired;
      const ageNum = Number(formData.age);
      if (!ageNum || ageNum < 14 || ageNum > 60) newErrors.age = t.errors.ageInvalid;
    }

    if (step === 2) {
      if (!formData.course) newErrors.course = t.errors.courseRequired;
      if (!((formData.branch || formData.specialization || '').trim())) {
        newErrors.branch = t.errors.branchRequired;
      }
      const pct = Number(formData.academicPercentage);
      if (isNaN(pct) || pct < 0 || pct > 100) newErrors.academicPercentage = t.errors.marksInvalid;
    }

    if (step === 3) {
      const income = Number(formData.annualFamilyIncome);
      if (isNaN(income) || income < 0) newErrors.annualFamilyIncome = t.errors.incomeInvalid;
      if (!formData.category) newErrors.category = t.errors.categoryRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    const completeProfile: StudentProfile = {
      ...formData,
      specialization: formData.branch || formData.specialization || '',
      branch: formData.branch || formData.specialization || '',
      year: formData.yearOfStudy || formData.year || '1st',
      yearOfStudy: formData.yearOfStudy || formData.year || '1st',
      percentage:
        formData.academicPercentage !== undefined
          ? formData.academicPercentage
          : formData.percentage,
      academicPercentage:
        formData.academicPercentage !== undefined
          ? formData.academicPercentage
          : formData.percentage,
      familyIncome:
        formData.annualFamilyIncome !== undefined
          ? formData.annualFamilyIncome
          : formData.familyIncome,
      annualFamilyIncome:
        formData.annualFamilyIncome !== undefined
          ? formData.annualFamilyIncome
          : formData.familyIncome,
      hostelStatus: formData.accommodation || formData.hostelStatus || 'Day Scholar',
      accommodation: formData.accommodation || formData.hostelStatus || 'Day Scholar',
    };

    setIsEvaluating(true);
    onSaveProfile(completeProfile);
    setTimeout(() => {
      setIsEvaluating(false);
      onFindScholarships(completeProfile);
    }, 400);
  };

  const courseOptions: CourseOption[] = [
    'B.E.',
    'B.Tech',
    'B.Sc',
    'B.Com',
    'B.A.',
    'Diploma',
    'Other',
  ];

  const yearOptions: YearOfStudy[] = ['1st', '2nd', '3rd', '4th'];
  const categoryOptions: SocialCategory[] = ['General', 'OBC', 'SC', 'ST', 'Other'];
  const institutionOptions: InstitutionType[] = [
    'Government',
    'Government-aided',
    'Private',
    'Other',
  ];
  const accommodationOptions: AccommodationType[] = ['Day Scholar', 'Hosteller'];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 w-full overflow-x-hidden">
      {/* Header bar with Demo Student trigger */}
      <header className="border-b border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            <ShieldCheck className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
            <span>{language === 'kn' ? 'ಅಭ್ಯರ್ಥಿಯ ಮಾಹಿತಿ ನಮೂದು' : 'Candidate Data Entry'}</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
            {t.form.studentProfileTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-700">
            {t.form.studentProfileDesc}
          </p>
        </div>

        <button
          id="profile-use-demo-btn"
          type="button"
          onClick={handleUseDemo}
          className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
          <span>{t.buttons.loadDemoData}</span>
        </button>
      </header>

      {/* Multi-Step Progress Tracker */}
      <nav aria-label="Registration form steps" className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Step 1 Tab */}
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          aria-current={currentStep === 1 ? 'step' : undefined}
          className={`flex items-center gap-2.5 p-3 rounded border text-left transition focus-visible:ring-2 focus-visible:ring-[#0b2545] min-h-11 ${
            currentStep === 1
              ? 'border-[#0b2545] bg-[#0b2545] text-white font-bold'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
              currentStep === 1 ? 'bg-white text-[#0b2545]' : 'bg-slate-200 text-slate-800'
            }`}
          >
            1
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className={`text-[10px] uppercase font-semibold ${currentStep === 1 ? 'text-slate-200' : 'text-slate-500'}`}>
              Step 1
            </div>
            <div className="text-xs truncate">{t.form.step1Title}</div>
          </div>
        </button>

        {/* Step 2 Tab */}
        <button
          type="button"
          onClick={() => validateStep(1) && setCurrentStep(2)}
          aria-current={currentStep === 2 ? 'step' : undefined}
          className={`flex items-center gap-2.5 p-3 rounded border text-left transition focus-visible:ring-2 focus-visible:ring-[#0b2545] min-h-11 ${
            currentStep === 2
              ? 'border-[#0b2545] bg-[#0b2545] text-white font-bold'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
              currentStep === 2 ? 'bg-white text-[#0b2545]' : 'bg-slate-200 text-slate-800'
            }`}
          >
            2
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className={`text-[10px] uppercase font-semibold ${currentStep === 2 ? 'text-slate-200' : 'text-slate-500'}`}>
              Step 2
            </div>
            <div className="text-xs truncate">{t.form.step2Title}</div>
          </div>
        </button>

        {/* Step 3 Tab */}
        <button
          type="button"
          onClick={() => validateStep(1) && validateStep(2) && setCurrentStep(3)}
          aria-current={currentStep === 3 ? 'step' : undefined}
          className={`flex items-center gap-2.5 p-3 rounded border text-left transition focus-visible:ring-2 focus-visible:ring-[#0b2545] min-h-11 ${
            currentStep === 3
              ? 'border-[#0b2545] bg-[#0b2545] text-white font-bold'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
              currentStep === 3 ? 'bg-white text-[#0b2545]' : 'bg-slate-200 text-slate-800'
            }`}
          >
            3
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className={`text-[10px] uppercase font-semibold ${currentStep === 3 ? 'text-slate-200' : 'text-slate-500'}`}>
              Step 3
            </div>
            <div className="text-xs truncate">{t.form.step3Title}</div>
          </div>
        </button>
      </nav>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-300 bg-white p-6 sm:p-8 space-y-6">
        {/* STEP 1: Basic & Location */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <User className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#0b2545]">{t.form.section1Heading}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="field-student-name" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.fullNameLabel}
                </label>
                <input
                  id="field-student-name"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g. Abhishek V."
                  className="w-full rounded border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                />
              </div>

              {/* Age */}
              <div>
                <label htmlFor="field-student-age" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.ageLabel} <span className="text-rose-600">*</span>
                </label>
                <input
                  id="field-student-age"
                  type="number"
                  min="14"
                  max="60"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', Number(e.target.value))}
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? 'field-student-age-error' : undefined}
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.age ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                />
                {errors.age && (
                  <p id="field-student-age-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.age}
                  </p>
                )}
              </div>

              {/* State Domicile */}
              <div>
                <label htmlFor="field-student-state" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.stateLabel} <span className="text-rose-600">*</span>
                </label>
                <select
                  id="field-student-state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  aria-invalid={!!errors.state}
                  aria-describedby={errors.state ? 'field-student-state-error' : undefined}
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.state ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                >
                  <option value="">{language === 'kn' ? '-- ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ --' : 'Select State'}</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p id="field-student-state-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.state}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label htmlFor="field-student-district" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.districtLabel} <span className="text-rose-600">*</span>
                </label>
                <input
                  id="field-student-district"
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="e.g. Ballari, Bengaluru Urban, Mysuru"
                  aria-invalid={!!errors.district}
                  aria-describedby={errors.district ? 'field-student-district-error' : undefined}
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.district ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                />
                {errors.district && (
                  <p id="field-student-district-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.district}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Academics & College */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <GraduationCap className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#0b2545]">{t.form.section2Heading}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Course */}
              <div>
                <label htmlFor="field-student-course" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.courseLabel} <span className="text-rose-600">*</span>
                </label>
                <select
                  id="field-student-course"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  aria-invalid={!!errors.course}
                  aria-describedby={errors.course ? 'field-student-course-error' : undefined}
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.course ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                >
                  <option value="">{language === 'kn' ? '-- ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ --' : 'Select Degree Program'}</option>
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <p id="field-student-course-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.course}
                  </p>
                )}
              </div>

              {/* Branch / Discipline */}
              <div>
                <label htmlFor="field-student-branch" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.branchLabel} <span className="text-rose-600">*</span>
                </label>
                <input
                  id="field-student-branch"
                  type="text"
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  placeholder="e.g. Computer Science, Mechanical, Commerce"
                  aria-invalid={!!errors.branch}
                  aria-describedby={errors.branch ? 'field-student-branch-error' : undefined}
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.branch ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                />
                {errors.branch && (
                  <p id="field-student-branch-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.branch}
                  </p>
                )}
              </div>

              {/* Current Year */}
              <div>
                <label htmlFor="field-student-year" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.yearLabel} <span className="text-rose-600">*</span>
                </label>
                <select
                  id="field-student-year"
                  value={formData.yearOfStudy}
                  onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                  className="w-full rounded border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0b2545] focus:outline-none"
                >
                  {yearOptions.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} {language === 'kn' ? 'ವರ್ಷ' : 'Year'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Percentage */}
              <div>
                <label htmlFor="field-student-pct" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.marksLabel} <span className="text-rose-600">*</span>
                </label>
                <input
                  id="field-student-pct"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.academicPercentage}
                  onChange={(e) => handleInputChange('academicPercentage', Number(e.target.value))}
                  placeholder="e.g. 85.0"
                  aria-invalid={!!errors.academicPercentage}
                  aria-describedby={
                    errors.academicPercentage ? 'field-student-pct-error' : 'field-student-pct-hint'
                  }
                  className={`w-full rounded border px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                    errors.academicPercentage ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                  }`}
                />
                {errors.academicPercentage ? (
                  <p id="field-student-pct-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.academicPercentage}
                  </p>
                ) : (
                  <span id="field-student-pct-hint" className="text-[11px] text-slate-500">
                    {language === 'kn'
                      ? 'ಹಿಂದಿನ ಶೈಕ್ಷಣಿಕ ಸೆಮಿಸ್ಟರ್/ವರ್ಷದ ಒಟ್ಟು ಅಂಕಗಳು'
                      : 'Aggregate marks of previous academic semester/year'}
                  </span>
                )}
              </div>

              {/* Institution Type */}
              <div>
                <label htmlFor="field-student-inst" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.institutionTypeLabel}
                </label>
                <select
                  id="field-student-inst"
                  value={formData.institutionType}
                  onChange={(e) => handleInputChange('institutionType', e.target.value as InstitutionType)}
                  className="w-full rounded border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0b2545] focus:outline-none"
                >
                  {institutionOptions.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst} {language === 'kn' ? 'ಸಂಸ್ಥೆ' : 'Institution'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accommodation */}
              <div>
                <label htmlFor="field-student-accom" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.accommodationLabel}
                </label>
                <select
                  id="field-student-accom"
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value as AccommodationType)}
                  className="w-full rounded border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0b2545] focus:outline-none"
                >
                  {accommodationOptions.map((acc) => (
                    <option key={acc} value={acc}>
                      {acc === 'Day Scholar' && language === 'kn' ? 'ಡೇ ಸ್ಕಾಲರ್ (ದೈನಂದಿನ ವಿದ್ಯಾರ್ಥಿ)' : acc === 'Hosteller' && language === 'kn' ? 'ಹಾಸ್ಟೆಲರ್ (ವಸತಿನಿಲಯ)' : acc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Income & Social Category */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Wallet className="h-5 w-5 text-[#0b2545]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#0b2545]">{t.form.section3Heading}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Annual Family Income */}
              <div className="sm:col-span-2">
                <label htmlFor="field-student-income" className="block text-xs font-bold text-slate-700 mb-1">
                  {t.form.annualIncomeLabel} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm font-bold text-slate-500">₹</span>
                  <input
                    id="field-student-income"
                    type="number"
                    step="1000"
                    min="0"
                    value={formData.annualFamilyIncome}
                    onChange={(e) => handleInputChange('annualFamilyIncome', e.target.value)}
                    placeholder="e.g. 180000"
                    aria-invalid={!!errors.annualFamilyIncome}
                    aria-describedby={errors.annualFamilyIncome ? 'field-student-income-error' : undefined}
                    className={`w-full rounded border pl-8 pr-3.5 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0b2545] ${
                      errors.annualFamilyIncome ? 'border-rose-500' : 'border-slate-300 focus:border-[#0b2545]'
                    }`}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                  <span>
                    {language === 'kn' ? 'ಕಂದಾಯ ಪ್ರಾಧಿಕಾರದ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ' : 'As per Revenue Authority Income Certificate'}
                  </span>
                  <span className="font-bold text-[#0b2545]">
                    ₹{Number(formData.annualFamilyIncome).toLocaleString('en-IN')} / {language === 'kn' ? 'ವರ್ಷ' : 'year'}
                  </span>
                </div>
                {errors.annualFamilyIncome && (
                  <p id="field-student-income-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.annualFamilyIncome}
                  </p>
                )}
              </div>

              {/* Social Category Fieldset */}
              <fieldset className="sm:col-span-2">
                <legend className="block text-xs font-bold text-slate-700 mb-2">
                  {t.form.categoryLabel} <span className="text-rose-600">*</span>
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup" aria-label={t.form.categoryLabel}>
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="radio"
                      aria-checked={formData.category === cat}
                      onClick={() => handleInputChange('category', cat)}
                      className={`p-3 rounded border text-xs font-bold text-center transition min-h-11 focus-visible:ring-2 focus-visible:ring-[#0b2545] ${
                        formData.category === cat
                          ? 'border-[#0b2545] bg-[#0b2545] text-white shadow-xs'
                          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p id="field-student-category-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.category}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Profile Snapshot Box */}
            <div className="mt-4 rounded border border-slate-300 bg-slate-50 p-4 text-xs text-slate-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#0b2545]">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <span>{language === 'kn' ? 'ಪರಿಶೀಲಿಸಿದ ಅಭ್ಯರ್ಥಿ ಸಾರಾಂಶ:' : 'Verified Candidate Summary:'}</span>
              </div>
              <p className="text-slate-700">
                {formData.state} ({formData.district}) • {formData.course} in {formData.branch} ({formData.yearOfStudy} Year) • {formData.academicPercentage}% Marks • Category: <strong>{formData.category}</strong> • Income: <strong>₹{Number(formData.annualFamilyIncome).toLocaleString('en-IN')}/yr</strong>
              </p>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              id="profile-prev-step-btn"
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t.buttons.back}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              id="profile-next-step-btn"
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded bg-[#0b2545] px-5 py-2 text-xs sm:text-sm font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
            >
              <span>{t.buttons.continue}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              id="profile-find-scholarships-btn"
              type="submit"
              disabled={isEvaluating}
              className="inline-flex items-center gap-2 rounded bg-[#0b2545] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 disabled:opacity-75 min-h-11"
            >
              {isEvaluating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span>{language === 'kn' ? 'ಅರ್ಹತಾ ನಿಯಮಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...' : 'Evaluating Deterministic Rules...'}</span>
                </>
              ) : (
                <>
                  <span>{t.buttons.evaluateMatches}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
