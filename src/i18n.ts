import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from '@locales/en.json'
import viTranslations from '@locales/vi.json'

const resources = {
  en: {
    translation: enTranslations,
  },
  vi: {
    translation: viTranslations,
  },
}

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,

    // Default language
    fallbackLng: 'en',

    // Language detection options
    detection: {
      // Order and from where user language should be detected
      order: [
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],

      // Cache user language
      caches: ['localStorage', 'sessionStorage'],

      // Storage key for localStorage/sessionStorage
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },

    interpolation: {
      // React already does escaping
      escapeValue: false,
    },

    // Debug mode (disable in production)
    debug: import.meta.env.DEV,

    // Namespace separator
    nsSeparator: ':',

    // Key separator
    keySeparator: '.',
  })

export default i18n
