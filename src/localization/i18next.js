import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStoragePlugin from 'i18next-react-native-async-storage'

import en from './locales/en'
import ge from './locales/ge'

i18next
    .use(initReactI18next)
    .use(AsyncStoragePlugin('en'))
    .init({
        react: {
            useSuspense: false,
        },
        debug: false,
        resources: { en, ge }
    })

export default i18next
