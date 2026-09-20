import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react';
import { ActivePage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HelpPageProps {
  setActivePage: (page: ActivePage) => void;
}

interface FAQItem {
  question: string;
  questionKn: string;
  answer: string;
  answerKn: string;
}

export const HelpPage: React.FC<HelpPageProps> = ({ setActivePage }) => {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: 'Is ScholarSaathi an official Government of India portal?',
      questionKn: 'ಸ್ವಾಲರ್‌ಸಾಥಿ ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರದ ಪೋರ್ಟಲ್ ಆಗಿದೆಯೇ?',
      answer:
        'No. ScholarSaathi is an independent, student-focused hackathon project created to simplify scholarship discovery. It does not issue scholarships, process government disbursements, or represent any central or state government ministry.',
      answerKn:
        'ಇಲ್ಲ. ಸ್ಕಾಲರ್‌ಸಾಥಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅನ್ವೇಷಣೆಯನ್ನು ಸರಳಗೊಳಿಸಲು ರಚಿಸಲಾದ ಸ್ವತಂತ್ರ ಶೈಕ್ಷಣಿಕ ಮಾರ್ಗದರ್ಶಿ ಯೋಜನೆಯಾಗಿದೆ. ಇದು ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ವಿತರಿಸುವುದಿಲ್ಲ ಅಥವಾ ಯಾವುದೇ ಸರ್ಕಾರಿ ಸಚಿವಾಲಯವನ್ನು ಪ್ರತಿನಿಧಿಸುವುದಿಲ್ಲ.',
    },
    {
      question: 'Why does ScholarSaathi not ask for Aadhaar or certificate uploads?',
      questionKn: 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಆಧಾರ್ ಅಥವಾ ಪ್ರಮಾಣಪತ್ರಗಳ ಅಪ್‌ಲೋಡ್ ಏಕೆ ಕೇಳುವುದಿಲ್ಲ?',
      answer:
        'Privacy by design. ScholarSaathi only evaluates self-reported criteria to determine potential eligibility. We never collect or store sensitive government identity documents or revenue certificates on any server.',
      answerKn:
        'ಗೌಪ್ಯತೆಯ ಸುರಕ್ಷತೆಗಾಗಿ. ಸ್ಕಾಲರ್‌ಸಾಥಿ ಕೇವಲ ಸ್ವಯಂ-ವರದಿ ಮಾಡಿದ ಮಾನದಂಡಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ. ನಾವು ನಿಮ್ಮ ಸಂವೇದನಾಶೀಲ ಗುರುತಿನ ದಾಖಲೆಗಳನ್ನು ಯಾವುದೇ ಸರ್ವರ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.',
    },
    {
      question: 'How often are the scholarship rules updated?',
      questionKn: 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ನಿಯಮಗಳನ್ನು ಎಷ್ಟು ಬಾರಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ?',
      answer:
        'Our dataset records include audit timestamps corresponding to official state and national guidelines from SSP Karnataka, NSP Central Sector, and AICTE circulars.',
      answerKn:
        'ನಮ್ಮ ದತ್ತಾಂಶದ ದಾಖಲೆಗಳು ಎಸ್‌ಎಸ್‌ಪಿ ಕರ್ನಾಟಕ, ಎನ್‌ಎಸ್‌ಪಿ ಮತ್ತು ಎಐಸಿಟಿಇ ಸುತ್ತೋಲೆಗಳಿಂದ ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ದಾಖಲಿಸಿದ ಲೆಕ್ಕಪರಿಶೋಧನಾ ದಿನಾಂಕವನ್ನು ಒಳಗೊಂಡಿವೆ.',
    },
    {
      question: 'Can I directly submit my scholarship application through ScholarSaathi?',
      questionKn: 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಮೂಲಕ ನೇರವಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಬಹುದೇ?',
      answer:
        'No. Once you verify your eligibility and prepare required certificates using our checklist, you must submit your final application on the official designated government portal (such as National Scholarship Portal or State Scholarship Portal).',
      answerKn:
        'ಇಲ್ಲ. ನಮ್ಮ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ಬಳಸಿಕೊಂಡು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿದ ನಂತರ, ನೀವು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (ಎನ್‌ಎಸ್‌ಪಿ ಅಥವಾ ಎಸ್‌ಎಸ್‌ಪಿ) ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು.',
    },
    {
      question: 'What should I do if my annual income exceeds the stated ceiling?',
      questionKn: 'ನನ್ನ ಕುಟುಂಬದ ಆದಾಯವು ನಿಗದಿತ ಮಿತಿಯನ್ನು ಮೀರಿದರೆ ನಾನು ಏನು ಮಾಡಬೇಕು?',
      answer:
        'Scholarships strictly enforce family income ceilings based on the certificate issued by your local Revenue Department (Tehsildar/SDM). If your family income exceeds the scheme cap, that specific scheme will be marked "Not Eligible", but other merit or corporate schemes with higher or no income caps may still be available.',
      answerKn:
        'ಕಂದಾಯ ಇಲಾಖೆ ನೀಡಿದ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ಆಧಾರದ ಮೇಲೆ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು ಆದಾಯ ಮಿತಿಯನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಜಾರಿಗೊಳಿಸುತ್ತವೆ. ನಿಮ್ಮ ಆದಾಯವು ಮಿತಿಯನ್ನು ಮೀರಿದರೆ, ಆ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ "ಅರ್ಹವಲ್ಲ" ಎಂದು ತೋರಿಸಲ್ಪಡುತ್ತದೆ, ಆದರೆ ಯಾವುದೇ ಆದಾಯ ಮಿತಿಯಿಲ್ಲದ ಮೆರಿಟ್ ಯೋಜನೆಗಳು ಲಭ್ಯವಿರಬಹುದು.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 w-full overflow-x-hidden" id="main-content">
      {/* Page Header */}
      <header className="border-b border-slate-300 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b2545]">
          <BookOpen className="h-4 w-4 text-[#0b2545]" aria-hidden="true" />
          <span>{language === 'kn' ? 'ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಜ್ಞಾನ ಭಂಡಾರ' : 'User Guidance & Knowledge Base'}</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight">
          {language === 'kn' ? 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ ಕೇಂದ್ರ' : 'Help & Support Center'}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed">
          {language === 'kn'
            ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಹೇಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ನಿಯಮಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ, ಪ್ರತಿ ಸ್ಥಿತಿಯ ಅರ್ಥವೇನು ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ ಹೇಗೆ ಸಿದ್ಧತೆ ಮಾಡಿಕೊಳ್ಳಬೇಕೆಂಬುದರ ಸ್ಪಷ್ಟ ವಿವರಣೆಗಳು.'
            : 'Clear, transparent explanations of how ScholarSaathi evaluates scholarship criteria, what each status means, and how to successfully prepare for official portal submission.'}
        </p>
      </header>

      {/* Section 1: How ScholarSaathi Works */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-8 shadow-xs" aria-labelledby="heading-how-it-works">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0b2545] text-white font-bold text-sm">
            1
          </div>
          <h2 id="heading-how-it-works" className="text-xl font-bold text-[#0b2545]">
            {language === 'kn' ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ' : 'How ScholarSaathi Works'}
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {language === 'kn'
            ? 'ಸ್ಕಾಲರ್‌ಸಾಥಿ ಒಂದು ನಿರ್ಣಾಯಕ ನಿಯಮ ಎಂಜಿನ್ (Deterministic Rule Engine) ಅನ್ನು ಬಳಸುತ್ತದೆ. ಕಾಲ್ಪನಿಕ ಎಐ ಫಲಿತಾಂಶಗಳ ಬದಲಿಗೆ, ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ (ರಾಜ್ಯ, ಕೋರ್ಸ್, ಅಂಕಗಳು, ವರ್ಗ ಮತ್ತು ಆದಾಯ) ಯನ್ನು ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ನಿಯಮಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಹೋಲಿಸುತ್ತದೆ.'
            : 'ScholarSaathi uses a deterministic rule engine. Instead of using non-transparent AI models that can hallucinate eligibility criteria, our engine takes your student details (state, course, year of study, academic score, category, and income) and compares them directly against structured, verified government rules.'}
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="rounded border border-slate-200 bg-slate-50 p-4">
            <span className="font-bold text-[#0b2545] block text-sm mb-1">
              {language === 'kn' ? '೧. ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್' : '1. Student Profile'}
            </span>
            {language === 'kn' ? 'ಸ್ವಯಂ-ವರದಿ ಮಾಡಿದ ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳು, ಆದಾಯ ಮತ್ತು ವರ್ಗ.' : 'Self-reported academic scores, income bracket, and category.'}
          </div>
          <div className="rounded border border-slate-200 bg-slate-50 p-4">
            <span className="font-bold text-[#0b2545] block text-sm mb-1">
              {language === 'kn' ? '೨. ನಿಯಮ ಎಂಜಿನ್' : '2. Rule Engine'}
            </span>
            {language === 'kn' ? 'ಆದಾಯ ಮಿತಿ ಮತ್ತು ಕನಿಷ್ಠ ಅಂಕಗಳ ಕಟ್‌ಆಫ್‌ಗಳನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.' : 'Evaluates limits such as income caps and minimum percentage cut-offs.'}
          </div>
          <div className="rounded border border-slate-200 bg-slate-50 p-4">
            <span className="font-bold text-[#0b2545] block text-sm mb-1">
              {language === 'kn' ? '೩. ಸ್ಪಷ್ಟ ಫಲಿತಾಂಶ' : '3. Clear Outcome'}
            </span>
            {language === 'kn' ? 'ಅಧಿಕೃತ ಮೂಲಗಳ ಉಲ್ಲೇಖದೊಂದಿಗೆ ನಿಯಮವಾರು ವಿವರಣೆ ನೀಡುತ್ತದೆ.' : 'Provides rule-by-rule explainability with direct official source citations.'}
          </div>
        </div>
      </section>

      {/* Section 2: How Eligibility is Calculated */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-8 shadow-xs" aria-labelledby="heading-calculation">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0b2545] text-white font-bold text-sm">
            2
          </div>
          <h2 id="heading-calculation" className="text-xl font-bold text-[#0b2545]">
            {language === 'kn' ? 'ಅರ್ಹತೆಯನ್ನು ಹೇಗೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ' : 'How Eligibility is Calculated'}
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {language === 'kn'
            ? 'ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಅಧಿಕೃತ ನಿಯಮಗಳನ್ನು ಹೊಂದಿದೆ. ನಮ್ಮ ಎಂಜಿನ್ ಪ್ರತಿ ಅಗತ್ಯತೆಯನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ:'
            : 'Every scholarship has a codified set of requirements. Our engine evaluates each requirement individually:'}
        </p>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded border border-slate-200 bg-slate-50">
            <strong className="sm:min-w-40 text-[#0b2545]">
              {language === 'kn' ? 'ಆರ್ಥಿಕ ಮಿತಿ:' : 'Financial Cap:'}
            </strong>
            <span>
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಕುಟುಂಬದ ಆದಾಯವು ಗರಿಷ್ಠ ಆದಾಯ ಮಿತಿಗಿಂತ ಕಡಿಮೆಯಿರಬೇಕು (ಉದಾ: ₹೨,೫೦,೦೦೦).'
                : 'Your family income must be strictly less than or equal to the maximum income limit (e.g. ₹2,50,000).'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded border border-slate-200 bg-slate-50">
            <strong className="sm:min-w-40 text-[#0b2545]">
              {language === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಮಿತಿ:' : 'Academic Threshold:'}
            </strong>
            <span>
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಅಂಕಗಳು ಕನಿಷ್ಠ ಕಟ್‌ಆಫ್‌ಗೆ ಸಮನಾಗಿರಬೇಕು ಅಥವಾ ಹೆಚ್ಚಾಗಿರಬೇಕು (ಉದಾ: ೬೦% ಅಥವಾ ೮೦%).'
                : 'Your qualifying percentage must meet or exceed the cutoff (e.g. minimum 60% or 80%).'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded border border-slate-200 bg-slate-50">
            <strong className="sm:min-w-40 text-[#0b2545]">
              {language === 'kn' ? 'ಸಾಮಾಜಿಕ ವರ್ಗ:' : 'Social Category:'}
            </strong>
            <span>
              {language === 'kn'
                ? 'ನಿಗದಿತ ವರ್ಗದ ಕೋಟಾಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು (General, OBC, SC, ST).'
                : 'Must match designated category quotas (OBC, SC, ST, General).'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded border border-slate-200 bg-slate-50">
            <strong className="sm:min-w-40 text-[#0b2545]">
              {language === 'kn' ? 'ವಾಸಸ್ಥಳ ಮತ್ತು ಕಾಲೇಜು:' : 'Domicile & College:'}
            </strong>
            <span>
              {language === 'kn'
                ? 'ಅಭ್ಯರ್ಥಿಯು ಸಂಬಂಧಿತ ರಾಜ್ಯದಲ್ಲಿ ವಾಸಿಸುತ್ತಿರಬೇಕು ಮತ್ತು ಮಾನ್ಯತೆ ಪಡೆದ ಕಾಲೇಜಿನಲ್ಲಿ ಓದುತ್ತಿರಬೇಕು.'
                : 'Candidate must reside in the granting state and study in an eligible institution type.'}
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Understanding Status Tiers */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-8 shadow-xs" aria-labelledby="heading-status-meanings">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0b2545] text-white font-bold text-sm">
            3
          </div>
          <h2 id="heading-status-meanings" className="text-xl font-bold text-[#0b2545]">
            {language === 'kn' ? 'ಮೂರು ಅರ್ಹತಾ ಹಂತಗಳ ವಿವರಣೆ' : 'Understanding the Three Eligibility Tiers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded border-2 border-emerald-300 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <span>{t.status.likelyEligible}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'kn'
                ? 'ಎಲ್ಲಾ ಪರಿಮಾಣಾತ್ಮಕ ನಿಯಮಗಳು (ಆದಾಯ ಮಿತಿ, ಅಂಕಗಳು, ವರ್ಗ, ರಾಜ್ಯ) ನಿಮ್ಮ ಸ್ವಯಂ-ವರದಿ ದತ್ತಾಂಶದೊಂದಿಗೆ ಉತ್ತೀರ್ಣವಾಗಿವೆ.'
                : 'All quantitative rules (income limit, marks percentage, category, state domicile) passed against your self-reported data. You have a strong likelihood of qualifying.'}
            </p>
          </div>

          <div className="rounded border-2 border-amber-300 bg-amber-50/50 p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <span>{t.status.needsVerification}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'kn'
                ? 'ನೀವು ಅಂಕಗಳು ಮತ್ತು ಆದಾಯ ಮಿತಿಗಳನ್ನು ಪೂರೈಸುತ್ತೀರಿ, ಆದರೆ ಕಾಲೇಜು ಪ್ರಮಾಣಪತ್ರಗಳು ಅಥವಾ ಹಾಜರಾತಿಯಂತಹ ಕೆಲವು ಷರತ್ತುಗಳಿಗೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.'
                : 'You meet the academic scores and income caps, but the scheme requires specific institutional certifications that require manual offline verification.'}
            </p>
          </div>

          <div className="rounded border-2 border-rose-300 bg-rose-50/50 p-5">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-base mb-2">
              <XCircle className="h-5 w-5 text-rose-700" aria-hidden="true" />
              <span>{t.status.notEligible}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'kn'
                ? 'ಕನಿಷ್ಠ ಒಂದು ಕಡ್ಡಾಯ ಷರತ್ತು ಪೂರೈಸಲಾಗಿಲ್ಲ (ಉದಾಹರಣೆಗೆ ಆದಾಯವು ಮಿತಿಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ ಅಥವಾ ಬೇರೆ ವರ್ಗಕ್ಕೆ ಸೀಮಿತವಾಗಿದೆ).'
                : 'At least one mandatory condition was not satisfied (e.g. income above ceiling or scheme restricted to a different social category).'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: FAQs */}
      <section className="rounded-lg border border-slate-300 bg-white p-5 sm:p-8 shadow-xs" aria-labelledby="heading-faqs">
        <h2 id="heading-faqs" className="text-xl font-bold text-[#0b2545] mb-6">
          {language === 'kn' ? 'ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು (FAQ)' : 'Frequently Asked Questions (FAQs)'}
        </h2>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between text-left text-sm sm:text-base font-bold text-[#0b2545] hover:text-blue-800 transition focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11"
                >
                  <span>{language === 'kn' ? faq.questionKn : faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-500 shrink-0 ml-2" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 shrink-0 ml-2" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed pl-1">
                    {language === 'kn' ? faq.answerKn : faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer */}
      <div className="rounded-lg border border-slate-300 bg-[#0b2545] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">
            {language === 'kn' ? 'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?' : 'Ready to check your scholarship eligibility?'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'kn'
              ? 'ಎರಡು ನಿಮಿಷಗಳಲ್ಲಿ ನಮ್ಮ ಅರ್ಹತಾ ಎಂಜಿನ್‌ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.'
              : 'Test your criteria with our deterministic matching engine in under two minutes.'}
          </p>
        </div>
        <button
          onClick={() => setActivePage('profile')}
          className="rounded bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0b2545] hover:bg-slate-100 transition shadow-xs min-h-10 shrink-0"
        >
          {t.buttons.checkEligibility}
        </button>
      </div>
    </div>
  );
};
