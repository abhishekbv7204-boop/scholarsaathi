import React from 'react';
import {
  GraduationCap,
  Mail,
  FileText,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Eye,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { ActivePage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { language } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-300 bg-slate-100 text-slate-800" role="contentinfo">
      {/* 1. Mandatory Statement Banner */}
      <div className="border-b border-slate-300 bg-slate-200/90 px-4 py-3 text-xs text-slate-900">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 text-center">
          <Info className="h-4 w-4 text-[#0b2545] shrink-0" aria-hidden="true" />
          <p className="font-semibold">
            ScholarSaathi is an independent student project and is not an official government portal.
          </p>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About ScholarSaathi */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0b2545] text-white">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-lg font-black text-[#0b2545] tracking-tight">
                  ScholarSaathi
                </span>
                <p className="text-[11px] font-semibold text-slate-600">
                  Student Scholarship Discovery Portal
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'kn'
                ? 'ಭಾರತೀಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪಾರದರ್ಶಕ, ನಿಯಮ ಆಧಾರಿತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಹೊಂದಾಣಿಕೆ ಪೋರ್ಟಲ್. ಯಾವುದೇ ಸರ್ಕಾರಿ ಲಾಂಛನ ಅಥವಾ ಕ್ಲೇಮ್‌ಗಳಿಲ್ಲದೆ ಸ್ವತಂತ್ರವಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ.'
                : 'A transparent, rules-based scholarship discovery platform for students in India. Independently developed without official emblems, seals, or government affiliation.'}
            </p>
            <div className="pt-1">
              <span className="inline-block rounded border border-slate-300 bg-white px-2.5 py-1 text-[10px] font-bold text-[#0b2545]">
                INDEPENDENT HACKATHON PROJECT
              </span>
            </div>
          </div>

          {/* Column 2: Core Portal Navigation */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              {language === 'kn' ? 'ಪೋರ್ಟಲ್ ಕೊಂಡಿಗಳು' : 'Portal Navigation'}
            </h2>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <button
                  type="button"
                  id="footer-link-about"
                  onClick={() => setActivePage('help')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <BookOpen className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>About ScholarSaathi</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-how-it-works"
                  onClick={() => setActivePage('how-it-works')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>How It Works</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-help"
                  onClick={() => setActivePage('help')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Help</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-find-scholarships"
                  onClick={() => setActivePage('scholarships')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Find Scholarships</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust, Privacy & Accessibility */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              {language === 'kn' ? 'ವಿಶ್ವಾಸಾರ್ಹತೆ & ನೀತಿಗಳು' : 'Trust & Compliance'}
            </h2>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <button
                  type="button"
                  id="footer-link-accessibility"
                  onClick={() => setActivePage('help')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Accessibility</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-privacy"
                  onClick={() => setActivePage('help')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Privacy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-disclaimer"
                  onClick={() => setActivePage('help')}
                  className="hover:text-[#0b2545] hover:underline flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Project Info */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              {language === 'kn' ? 'ಯೋಜನಾ ಮಾಹಿತಿ' : 'Project Information'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'kn'
                ? 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪಾರದರ್ಶಕತೆ ಒದಗಿಸಲು ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾದ ಮುಕ್ತ ತಂತ್ರಜ್ಞಾನ ಯೋಜನೆ.'
                : 'Built as an open student project to provide explainable scholarship guidance based on codified statutory criteria.'}
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#0b2545]" aria-hidden="true" />
                <a
                  href="mailto:contact@scholarsaathi.org"
                  className="hover:underline text-[#0b2545] font-bold focus-visible:outline-2 focus-visible:outline-[#0b2545]"
                >
                  contact@scholarsaathi.org
                </a>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Independent Student Initiative • Non-Governmental
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-slate-300 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            © {new Date().getFullYear()} ScholarSaathi. ScholarSaathi is an independent student project and is not an official government portal.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Public Service UI</span>
            <span aria-hidden="true">•</span>
            <span>Deterministic Rule Matching</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
