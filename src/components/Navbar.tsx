import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Compass,
  CheckCircle2,
  FileText,
  BookOpen,
  HelpCircle,
  Eye,
  UserCheck,
  Languages,
} from 'lucide-react';
import { ActivePage, StudentProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  student: StudentProfile | null;
  onUseDemo: () => void;
  matchesCount: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  student,
  onUseDemo,
  matchesCount,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showKannadaNotice, setShowKannadaNotice] = useState(false);

  const navLinks = [
    { id: 'landing' as ActivePage, label: t.nav.home, icon: Compass },
    { id: 'scholarships' as ActivePage, label: t.nav.findScholarships, icon: FileText },
    { id: 'profile' as ActivePage, label: t.nav.checkEligibility, icon: UserCheck },
    { id: 'how-it-works' as ActivePage, label: t.nav.howItWorks, icon: BookOpen },
    { id: 'help' as ActivePage, label: t.nav.help, icon: HelpCircle },
    ...(matchesCount > 0
      ? [
          {
            id: 'results' as ActivePage,
            label: t.nav.myMatches,
            icon: CheckCircle2,
            badge: matchesCount,
          },
        ]
      : []),
  ];

  const handleLanguageToggle = (selectedLang: 'en' | 'kn') => {
    setLanguage(selectedLang);
    if (selectedLang === 'kn') {
      setShowKannadaNotice(true);
    } else {
      setShowKannadaNotice(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white shadow-xs" role="banner">
      {/* 1. Skip to Main Content Link (Accessibility requirement) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-[#0b2545] focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        {t.nav.skipToContent}
      </a>

      {/* 2. Top Utility Bar (Accessibility Controls, Language Selector, and Institutional Metadata) */}
      <div className="border-b border-slate-200 bg-[#081d36] text-white px-4 py-1.5 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Left: Project identity notice */}
          <div className="flex items-center gap-2 overflow-hidden text-[11px] text-slate-300">
            <span className="font-semibold text-white">{t.nav.portalName}</span>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <span className="hidden md:inline text-slate-300">
              {t.nav.portalSubtitle}
            </span>
          </div>

          {/* Right: Accessibility Controls, Language, and Quick Access */}
          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1 border-r border-slate-600 pr-3" aria-label="Font size adjustment">
              <span className="sr-only">{t.nav.fontSize}:</span>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                title="Default Font Size (100%)"
                aria-label="Set standard font size"
                className={`px-1.5 py-0.5 rounded font-bold transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  fontSize === 'normal'
                    ? 'bg-white text-[#081d36]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                title="Medium Font Size (115%)"
                aria-label="Set medium font size"
                className={`px-1.5 py-0.5 rounded font-bold transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  fontSize === 'large'
                    ? 'bg-white text-[#081d36]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                title="Large Font Size (130%)"
                aria-label="Set large font size"
                className={`px-1.5 py-0.5 rounded font-bold transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  fontSize === 'xlarge'
                    ? 'bg-white text-[#081d36]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={() => setHighContrast((prev) => !prev)}
              aria-label={highContrast ? t.nav.highContrastOn : t.nav.highContrast}
              aria-pressed={highContrast}
              title="Toggle high contrast view"
              className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" aria-hidden="true" />
              <span>{highContrast ? t.nav.highContrastOn : t.nav.highContrast}</span>
            </button>

            {/* Help Link */}
            <button
              type="button"
              onClick={() => setActivePage('help')}
              className="text-slate-300 hover:text-white hover:underline flex items-center gap-1 border-r border-slate-600 pr-3 focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <HelpCircle className="h-3 w-3" aria-hidden="true" />
              <span>{t.nav.help}</span>
            </button>

            {/* Language Selector: English | ಕನ್ನಡ */}
            <div className="flex items-center gap-1.5" role="region" aria-label="Language selection">
              <Languages className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
              <button
                type="button"
                id="lang-toggle-en"
                onClick={() => handleLanguageToggle('en')}
                aria-pressed={language === 'en'}
                aria-label="Select English language"
                className={`px-2 py-0.5 rounded font-bold text-xs transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  language === 'en'
                    ? 'bg-white text-[#081d36]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                English
              </button>
              <span className="text-slate-500" aria-hidden="true">|</span>
              <button
                type="button"
                id="lang-toggle-kn"
                onClick={() => handleLanguageToggle('kn')}
                aria-pressed={language === 'kn'}
                aria-label="ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (Select Kannada language)"
                className={`px-2 py-0.5 rounded font-bold text-xs transition focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  language === 'kn'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kannada Notification Toast/Banner if toggled */}
      {showKannadaNotice && (
        <aside
          aria-label="Language Localization Notification"
          className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-xs text-amber-950 flex items-center justify-between"
        >
          <div className="mx-auto max-w-7xl flex items-center gap-2">
            <span className="font-bold">ಕನ್ನಡ ಸಕ್ರಿಯವಾಗಿದೆ:</span>
            <span>
              ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕನ್ನಡ ಭಾಷಾಂತರ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. (Kannada language support active).
            </span>
          </div>
          <button
            onClick={() => setShowKannadaNotice(false)}
            className="text-amber-900 hover:text-black font-bold text-sm px-2 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
            aria-label="Close notification"
          >
            ✕
          </button>
        </aside>
      )}

      {/* 3. Main Header Bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Identity */}
        <div className="flex items-center gap-3">
          <button
            id="nav-brand-logo-btn"
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#0b2545]"
          >
            {/* Student Service Emblem (No State/Government Emblem) */}
            <div className="flex h-11 w-11 items-center justify-center rounded bg-[#0b2545] text-white border border-[#133b68]">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b2545]">
                  ScholarSaathi
                </span>
                <span className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  {language === 'kn' ? 'ಸ್ವತಂತ್ರ ಯೋಜನೆ' : 'Independent Project'}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Student Scholarship Discovery Portal
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => setActivePage(link.id)}
                className={`relative px-3 py-2 text-xs font-bold transition rounded ${
                  isActive
                    ? 'bg-[#0b2545] text-white'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-[#0b2545]'
                } focus-visible:outline-2 focus-visible:outline-[#0b2545]`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-1.5 rounded-full bg-blue-700 px-1.5 py-0.2 text-[10px] font-extrabold text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Student Loader */}
          {!student && (
            <button
              id="nav-quick-demo-btn"
              onClick={onUseDemo}
              className="hidden sm:inline-flex items-center gap-1.5 rounded border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition focus-visible:outline-2 focus-visible:outline-[#0b2545]"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
              <span>{t.nav.loadDemo}</span>
            </button>
          )}

          {/* Primary Action Button (CTA: Check Eligibility) */}
          <button
            id="nav-primary-action-btn"
            onClick={() => setActivePage('profile')}
            className="rounded bg-[#0b2545] px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-10"
          >
            {t.buttons.checkEligibility}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.menu}
            className="lg:hidden rounded border border-slate-300 p-2 text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#0b2545] min-h-11 min-w-11 flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="lg:hidden border-t border-slate-300 bg-white px-4 py-4 shadow-md">
          <nav className="space-y-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded px-3.5 py-3 text-sm font-bold min-h-11 ${
                    isActive
                      ? 'bg-[#0b2545] text-white'
                      : 'text-slate-800 hover:bg-slate-100'
                  } focus-visible:outline-2 focus-visible:outline-[#0b2545]`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="rounded-full bg-blue-700 px-2 py-0.5 text-xs font-extrabold text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Demo Button in Mobile */}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  onUseDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 rounded border border-slate-300 bg-slate-50 py-3 text-xs font-bold text-slate-800 min-h-11 focus-visible:outline-2 focus-visible:outline-[#0b2545]"
              >
                <Sparkles className="h-4 w-4 text-blue-700" aria-hidden="true" />
                <span>{t.nav.loadDemo}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
