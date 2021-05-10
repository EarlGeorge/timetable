import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

import en from './locales/en'
import ge from './locales/ge'

i18next
  .use({
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async callback => {
      const selectedLanguage = await AsyncStorage.getItem('i18NextBusTimetable')

      callback(selectedLanguage || ' ')
    },
    cacheUserLanguage: () => {}
  })
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    react: {
      useSuspense: false
    },
    debug: false,
    resources: {
      en,
      ge
    }
  })

export default i18next
