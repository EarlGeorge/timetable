import React, { useState } from 'react'
import { View, Text, StyleSheet, Picker, Button } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

/**
 * About App screen and with Language setup button
 **/
const About = () => {
    // used for translation
    const { t, i18n } = useTranslation()
    // used for navigation
    const navigation = useNavigation()

    // change App language
    const [appLanguage, setAppLanguage] = useState(i18n.language)

    const listLanguage = [
        { key: 'en', label: 'English 🇬🇧' },
        { key: 'ge', label: 'ქართული 🇬🇪' },
    ]

    const onChangeLanguage = async (languageSelected) => {
        await i18n.changeLanguage(languageSelected)
        setAppLanguage(languageSelected)
    }

    // Opens Feedback screen 
    const feedbackHandle = () => { navigation.navigate('Feedback') }

    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['rgba(250, 250, 252, 0.5)', 'rgba(136, 179, 209,0.8)',]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}
            />

            <Text style={styles.info}>{t('about.info')}</Text>

            <Text>{t('about.changeLanguage')}</Text>

            <Picker
                selectedValue={appLanguage}
                onValueChange={onChangeLanguage}
                style={styles.picker}
            >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label={languageItem.label} />
                })}
            </Picker>

            <Button onPress={feedbackHandle} title="Feedback" style={styles.feedback} />

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
    info: {
        top: -100,
        padding: 20,
        lineHeight: 20,
    },
    picker: {
        height: 100,
        width: '100%',
    },
})