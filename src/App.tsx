import React, { useState, useEffect, useMemo } from 'react';
import { ActivePage, ScholarshipMatch, StudentProfile } from './types';
import { DEMO_STUDENT, SCHOLARSHIPS_DATASET } from './data/scholarships';
import { evaluateAllScholarships } from './services/eligibilityEngine';
import { checkEligibilityApi } from './services/apiService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { ResultsPage } from './pages/ResultsPage';
import { ScholarshipDetailsPage } from './pages/ScholarshipDetailsPage';
import { WhyThisResultPage } from './pages/WhyThisResultPage';
import { DocumentChecklistPage } from './pages/DocumentChecklistPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScholarshipsBrowsePage } from './pages/ScholarshipsBrowsePage';
import { HelpPage } from './pages/HelpPage';
import { ScholarSaathiAssistant } from './components/ScholarSaathiAssistant';
import { Sparkles } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, t } = useLanguage();
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Accessibility State as per GIGW 3.0 requirements
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Default prepared docs: pre-check 2 to match the example "2 of 5 documents prepared"
  const [preparedDocs, setPreparedDocs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('scholarsaathi_prepared_docs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      'Previous Semester Marks Card / Scorecard': true,
      'College ID Card / Bonafide Student Certificate': true,
    };
  });

  const handleToggleDoc = (docName: string) => {
    setPreparedDocs((prev) => {
      const next = { ...prev, [docName]: !prev[docName] };
      try {
        localStorage.setItem('scholarsaathi_prepared_docs', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleResetDocs = () => {
    setPreparedDocs({});
    try {
      localStorage.removeItem('scholarsaathi_prepared_docs');
    } catch (e) {
      // ignore
    }
  };

  // Evaluate matches with immediate local calculation and asynchronous backend verification
  const [matches, setMatches] = useState<ScholarshipMatch[]>(() => {
    return evaluateAllScholarships(SCHOLARSHIPS_DATASET, student || DEMO_STUDENT);
  });
  const [evalSource, setEvalSource] = useState<'backend_api' | 'local_engine'>('local_engine');

  useEffect(() => {
    let active = true;
    const currentProfile = student || DEMO_STUDENT;

    // 1. Immediate deterministic evaluation (zero flicker / offline safe)
    const localMatches = evaluateAllScholarships(SCHOLARSHIPS_DATASET, currentProfile);
    setMatches(localMatches);

    // 2. Query backend API Gateway / Lambda POST /api/eligibility/check
    checkEligibilityApi(currentProfile)
      .then((response) => {
        if (active && response && response.results) {
          setMatches(response.results);
          setEvalSource(response.source);
        }
      })
      .catch((err) => {
        console.warn('Backend eligibility verification error (using local engine):', err);
      });

    return () => {
      active = false;
    };
  }, [student]);

  // Handle "Try Demo" from Landing or Navbar
  const handleTryDemo = () => {
    setStudent({ ...DEMO_STUDENT });
    setSelectedScholarshipId(SCHOLARSHIPS_DATASET[0].id);
    setActivePage('results');
  };

  // Handle "Check My Eligibility"
  const handleCheckEligibility = () => {
    setActivePage('profile');
  };

  // When profile is submitted
  const handleFindScholarships = (profile: StudentProfile) => {
    setStudent(profile);
    setSelectedScholarshipId(SCHOLARSHIPS_DATASET[0].id);
    setActivePage('results');
  };

  const handleSelectScholarship = (id: string) => {
    setSelectedScholarshipId(id);
    setActivePage('details');
  };

  const handleViewWhyResult = (id: string) => {
    setSelectedScholarshipId(id);
    setActivePage('why');
  };

  const handleAskAssistant = (id: string) => {
    setSelectedScholarshipId(id);
    setActivePage('assistant');
  };

  const handleSearchFromLanding = (query: string) => {
    setSearchInitialQuery(query);
  };

  const selectedMatch = useMemo(() => {
    if (!selectedScholarshipId) return matches[0] || null;
    return matches.find((m) => m.scholarship.id === selectedScholarshipId) || matches[0] || null;
  }, [matches, selectedScholarshipId]);

  // Accessibility class generation
  const fontSizeClass =
    fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base';
  const contrastClass = highContrast
    ? 'contrast-125 bg-white text-black'
    : 'bg-slate-100/70 text-slate-900';

  return (
    <div
      className={`min-h-screen font-sans flex flex-col selection:bg-amber-100 selection:text-slate-900 ${fontSizeClass} ${contrastClass}`}
    >
      {/* Skip to Main Content Link for Keyboard / Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:border focus:border-amber-400 focus:bg-[#0b2545] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl focus:outline-none"
      >
        {language === 'kn' ? 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ (Skip to Content)' : 'Skip to Main Content'}
      </a>

      {/* Global GIGW-Inspired Header with Accessibility controls & Language switch */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        student={student}
        onUseDemo={handleTryDemo}
        matchesCount={matches.length}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Main Content Area */}
      <main className="flex-1" id="main-content">
        {activePage === 'landing' && (
          <LandingPage
            onCheckEligibility={handleCheckEligibility}
            onTryDemo={handleTryDemo}
            setActivePage={setActivePage}
            onSearchScholarships={handleSearchFromLanding}
          />
        )}

        {activePage === 'profile' && (
          <StudentProfilePage
            currentProfile={student}
            onSaveProfile={setStudent}
            onFindScholarships={handleFindScholarships}
          />
        )}

        {activePage === 'results' && (
          <ResultsPage
            matches={matches}
            onSelectScholarship={handleSelectScholarship}
            onViewWhyResult={handleViewWhyResult}
            onCheckAgain={() => setActivePage('profile')}
            studentName={student?.name}
            preparedDocs={preparedDocs}
            onToggleDoc={handleToggleDoc}
            apiSource={evalSource}
          />
        )}

        {activePage === 'details' && selectedMatch && (
          <ScholarshipDetailsPage
            match={selectedMatch}
            student={student}
            onBack={() => setActivePage('results')}
            onViewWhyResult={handleViewWhyResult}
            onAskAssistant={handleAskAssistant}
            preparedDocs={preparedDocs}
            onToggleDoc={handleToggleDoc}
          />
        )}

        {activePage === 'why' && (
          <WhyThisResultPage
            matches={matches}
            selectedScholarshipId={selectedScholarshipId}
            onSelectScholarship={(id) => setSelectedScholarshipId(id)}
            onGoToDocuments={() => setActivePage('documents')}
            onViewDetails={handleSelectScholarship}
            onAskAssistant={handleAskAssistant}
            preparedDocs={preparedDocs}
            onToggleDoc={handleToggleDoc}
          />
        )}

        {activePage === 'documents' && (
          <DocumentChecklistPage
            matches={matches}
            preparedDocs={preparedDocs}
            onToggleDoc={handleToggleDoc}
            onResetDocs={handleResetDocs}
          />
        )}

        {activePage === 'scholarships' && (
          <ScholarshipsBrowsePage
            matches={matches}
            student={student}
            onSelectScholarship={handleSelectScholarship}
            onViewWhyResult={handleViewWhyResult}
            onCheckEligibility={() => setActivePage('profile')}
            initialSearchQuery={searchInitialQuery}
          />
        )}

        {(activePage === 'help' || activePage === 'how-it-works') && (
          <HelpPage setActivePage={setActivePage} />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            student={student || DEMO_STUDENT}
            matches={matches}
            preparedDocs={preparedDocs}
            onCheckAgain={() => setActivePage('profile')}
            onSelectScholarship={handleSelectScholarship}
            onViewWhyResult={handleViewWhyResult}
            onGoToDocuments={() => setActivePage('documents')}
          />
        )}

        {activePage === 'assistant' && (
          <ScholarSaathiAssistant
            matches={matches}
            student={student || DEMO_STUDENT}
            activeScholarshipId={selectedScholarshipId || undefined}
            onSelectScholarship={handleSelectScholarship}
          />
        )}
      </main>

      {/* Floating Guidance Assistant Quick Trigger */}
      {activePage !== 'assistant' && (
        <aside aria-label="ScholarSaathi Guidance Assistant Trigger" className="fixed bottom-6 right-6 z-30">
          <button
            id="floating-assistant-btn"
            onClick={() => setActivePage('assistant')}
            className="flex items-center gap-2 rounded border border-slate-300 bg-[#0b2545] px-4 py-2.5 text-white shadow-md hover:bg-[#133b68] transition focus-visible:outline-2 focus-visible:outline-amber-400 min-h-11"
          >
            <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold">
              {language === 'kn' ? 'ಮಾರ್ಗದರ್ಶಿ ಸಹಾಯಕ' : 'Guidance Assistant'}
            </span>
          </button>
        </aside>
      )}

      {/* GIGW 3.0 Institutional Footer with Disclaimers & Sitemap */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
