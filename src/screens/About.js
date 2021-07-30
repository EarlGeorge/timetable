import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Component
import Button from '../components/Button'
import Switch from '../components/Switch'
import { ThemeContext } from '../Theme'

/**
 * About App screen
 **/

const About = () => {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const { dark, theme, toggle } = useContext(ThemeContext)

  const [appLanguage, setAppLanguage] = useState(i18n.language)

  const language = [
    { lang: 'en', label: 'English 🇬🇧' },
    { lang: 'ge', label: 'ქართული 🇬🇪' }
  ]

  const changeLangHandler = async languageSelected => {
    setAppLanguage(languageSelected)
    await i18n.changeLanguage(languageSelected)
    await AsyncStorage.setItem('i18NextBusTimetable', languageSelected)
  }

  // Opens Feedback screen
  const feedbackHandler = () => navigation.navigate('Feedback')

  return (
    <View style={styles.container}>
      <Text style={[styles.info, { color: theme.text }]}>
        {t('about.info')}
      </Text>

      <Picker
        selectedValue={appLanguage}
        onValueChange={changeLangHandler}
        style={styles.picker}
      >
        {language.map(({ lang, label }, i) => {
          return (
            <Picker.Item
              key={i}
              value={lang}
              label={label}
              color={theme.text}
            />
          )
        })}
      </Picker>

      <View style={styles.wrap}>
        <Button
          onPress={feedbackHandler}
          text={t('about.feedbackButton')}
          buttonColor={theme.buttonColor}
          textColor={theme.buttonText}
          margin={30}
          paddingVertical={2}
          fontSize={14}
        />
        <Switch isOn={dark} onToggle={toggle} />
      </View>

      <Text style={{ color: theme.text }}>
        {t('about.madeBy')} {new Date().getFullYear()}
      </Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  info: {
    top: 10,
    lineHeight: 20
  },
  picker: {
    paddingVertical: 20,
    height: 200,
    width: 200
  },
  wrap: {
    bottom: 25,
    alignItems: 'center'
  }
})
