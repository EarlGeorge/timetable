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

// let lang = ''

// console.log(lang + 'is my lang')
let languageDetector = {
    type: 'languageDetector',
    async: true,
    init: () => { },
    detect: cb => { // AsyncStorage.getItem('APPLanguage', (err, result) => {
        //     if (result !== null) {
        //       let lang = JSON.parse(result);
        //       cb(lang)
        //     }
        //     else {
        //       cb('en') 
        //     }
        // })
    },
    cacheUserLanguage: () => { },
}

i18next
    .use(initReactI18next)
    // .use(AsyncStoragePlugin())
    .use(languageDetector)
    .init({
        lng: 'ge',
        debug: true,
        resources: {
            en,
            ge,
        }
    })

export default i18next