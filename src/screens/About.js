import React, { useState } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Component
import Button from '../components/Button'

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
    const feedbackHandler = () => navigation.navigate('Feedback')

    return (
        <View style={styles.container}>
            <Text style={styles.info}>{t('about.info')}</Text>
            <Picker
                selectedValue={appLanguage}
                onValueChange={onChangeLanguage}
                style={styles.picker}
            >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label={languageItem.label} />
                })}
            </Picker>
            <View style={styles.feedback}>
                <Button
                    onPress={feedbackHandler}
                    text={t('about.feedbackButton')}
                    buttonColor='#c7dceb'
                    textColor='black'
                />
            </View>
            <Text style={styles.made}>
                {t('about.madeBy')} {new Date().getFullYear()}
            </Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bacfde'
    },
    info: {
        flex: 1,
        top: 10,
        padding: 20,
        lineHeight: 20,
    },
    picker: {
        position: 'absolute',
        top: 145,
        height: 200,
        width: 200,
    },
    feedback: {
        position: 'absolute',
        bottom: 125,
    },
    made: {
        position: 'absolute',
        padding: 7,
        bottom: 25
    }
})