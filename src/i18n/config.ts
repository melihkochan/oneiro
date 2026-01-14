import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import tr from './locales/tr.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
    },
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    debug: false,
  });

// Dil değişikliğini logla
i18n.on('languageChanged', (lng) => {
  console.log('i18n dil değişti:', lng);
  console.log('i18n mevcut dil:', i18n.language);
  console.log('i18n kaynaklar:', Object.keys(i18n.options.resources || {}));
});

export default i18n;