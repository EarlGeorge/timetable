import { AsyncStorage } from 'react-native'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

import en from './locales/en'
import ge from './locales/ge'

// AsyncStorage.getItem('APPLanguage', (err, result) => {
//         if (result !== null) {
//          
//      
//         }
// })

let languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: cb => cb('ge'),
    init: () => {},
    cacheUserLanguage: () => { },
}

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            en,
            ge,
        }
    })