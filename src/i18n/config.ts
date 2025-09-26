import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import zh from './locales/zh-CN/translation.json';

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zh },
    },
    lng: 'zh-CN',
    fallbackLng: 'en',
    supportedLngs: ['zh-CN', 'en'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
