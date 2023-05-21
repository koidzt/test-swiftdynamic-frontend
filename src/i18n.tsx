import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import all translation files
import translationEN from './locales/en.json';
import translationTH from './locales/th.json';

const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
});

export default i18n;
