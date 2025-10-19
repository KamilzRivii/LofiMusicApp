import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from 'src/i18n/en.json';
import plTranslations from 'src/i18n/pl.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    lng: 'pl', // Domyślny język
    resources: {
      en: { translation: enTranslations },
      pl: { translation: plTranslations },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
