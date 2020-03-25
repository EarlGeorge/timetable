import React, { createContext, useState,  useEffect} from 'react'
import trans, { DEFAULT_LANGUAGE } from './translations'
import { AsyncStorage } from 'react-native'
// import * as RNLocalize from 'react-native-localize'
// import * as Localization from 'expo-localization'
import i18n from 'i18n-js'


const APP_LANGUAGE = 'appLanguage';
// let translations
// const wt = i18n.translations = trans.geo

export const LocalizationContext = createContext({
    translations: i18n.translations = trans.geo,
    setAppLanguage: () => { },
    appLanguage: DEFAULT_LANGUAGE,
})

export const LocalizationProvider = ({ children }) => {
    const [appLanguage, setAppLanguage] = useState('en')

    const setLanguage = language => {
        translations.setLanguage(language)
        setAppLanguage(language)
        AsyncStorage.setItem(APP_LANGUAGE, language)
    }



    useEffect(() => {

        initializeAppLanguage();



    }, [])

    const initializeAppLanguage = async () => {
        // const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE)
      
            setLanguage('en')
     
    }

    return (
        <LocalizationContext.Provider
            value={{
                translations,
                setAppLanguage: setLanguage,
                appLanguage,
            }}>
            {children}
        </LocalizationContext.Provider>
    )
}