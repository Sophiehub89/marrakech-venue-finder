import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';
import esTranslations from './locales/es.json';

export const supportedLanguages = ['en', 'fr', 'ar', 'es'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export const languageNames = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  es: 'Español'
} as const;

const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations },
        fr: { translation: frTranslations },
        ar: { translation: arTranslations },
        es: { translation: esTranslations }
      },
      lng: 'en',
      fallbackLng: 'en',
      detection: {
        order: ['path', 'localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupFromPathIndex: 0
      },
      supportedLngs: supportedLanguages,
      interpolation: {
        escapeValue: false
      }
    });
};

initI18n();

export default i18n;