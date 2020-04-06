import { AsyncStorage } from 'react-native'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import AsyncStoragePlugin from 'i18next-react-native-async-storage'

import en from './locales/en'
import ge from './locales/ge'

// AsyncStorage.getItem('APPLanguage', (err, result) => {
//         if (result !== null) {
//          
//      
//         }
// })
let lang = ''

AsyncStorage.getItem('APPLanguage')
            .then(res => lang = JSON.parse(res))
            .catch(error => console.log('Couldnt load!' + error))

// AsyncStorage.getItem('APPLanguage', (result) => {
//     if (result !== null) {
//         lang = JSON.parse(result)
//     }
//     else {
//         lang = 'en'
//     }
// })
console.log ( lang + 'is my lang')

let languageDetector = {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: cb => cb(lang),
    cacheUserLanguage: () => {},
}

i18next
    .use(AsyncStoragePlugin())
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        lng: 'ge' || 'en',
        debug: true,
        resources: {
            en,
            ge,
        }
    })