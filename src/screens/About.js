import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Picker, AsyncStorage, Button } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

/**
 * About this App screen and with Language setup button
 **/
const About = () => {
    // used for translation
    const { t, i18n } = useTranslation()
    // used for navigation
    const navigation = useNavigation()

    const [appLanguage, setAppLanguage] = useState()

    useEffect(() => {
        // Fetch saved language 
        AsyncStorage.getItem('APPLanguage')
            .then(lang => setAppLanguage(JSON.parse(lang)))
            .catch(error => console.log('Couldnt load!' + error))
    }, [])

    /**
     * change App language and store it in AsyncStorage
     **/
    const listLanguage = [
        { key: 'en', label: 'English 🇬🇧' },
        { key: 'ge', label: 'ქართული 🇬🇪' },
    ]

    const onChangeLanguage = async (languageSelected) => {
        setAppLanguage(languageSelected)
        AsyncStorage.setItem('APPLanguage', JSON.stringify(languageSelected))
        await i18n.changeLanguage(languageSelected)
    }

    // Opens Feedback screen 
    const feedbackHandle = () => { navigation.navigate('Feedback') }

    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['rgba(158,70,100,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
            <Text style={styles.text}>{t('about.title')}</Text>

            <Text style={styles.info}>{t('about.info')}</Text>

            <Text style={styles.lang}>{t('about.changeLanguage')}</Text>

            <Picker
                style={{ height: 250, width: 250 }}
                selectedValue={appLanguage}
                onValueChange={onChangeLanguage}
            >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label={languageItem.label} />
                })}
            </Picker>

            <Button onPress={feedbackHandle} title="Feedback" />

        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#bacfde",
        fontSize: 15,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    info: {
        padding: 25,
    },
    lang: {
        padding: 45,
    }
})