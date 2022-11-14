import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import ru from './translates/ru.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ru: {
        translation: ru,
      },
    },
    lng: 'ru',
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export { i18n };
