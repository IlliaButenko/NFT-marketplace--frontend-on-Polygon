import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translations from './locales'

// i18n config
const i18nConfig = {
  resources: translations,
  fallbackLng: 'en-US',
  defaultNS: 'translations'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)

export default i18n
