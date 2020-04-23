import React, { useState } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

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
    const feedbackHandler = () => { navigation.navigate('Feedback') }

    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['rgb(227, 243, 255)', 'rgb(136, 179, 209)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}
            />

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
                    buttonColor='#80a7c2'
                    textColor='white'
                />
            </View>

            <Text style={styles.copyright}>
                {t('about.madeBy')} {new Date().getFullYear()} {t('about.copyright')}
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
    copyright: {
        position: 'absolute',
        padding: 7,
        bottom: 25
    }
})