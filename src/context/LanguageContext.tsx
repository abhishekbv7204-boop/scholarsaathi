import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  SupportedLanguage,
  Translations,
  translations,
  translateDocName,
  translateDocCategory,
} from '../i18n/translations';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  translateDoc: (docName: string) => string;
  translateCategory: (category: string) => string;
}

const STORAGE_KEY = 'scholarsaathi_language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: SupportedLanguage }> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (initialLanguage) return initialLanguage;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'kn') {
        return stored;
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage write errors
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      t: translations[language],
      translateDoc: (docName: string) => translateDocName(docName, language),
      translateCategory: (category: string) => translateDocCategory(category, language),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
