import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './translations/ar.json';
import en from './translations/en.json';

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
};
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: 'ar',
    });
export default i18n;
