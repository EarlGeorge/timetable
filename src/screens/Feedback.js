import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Component
import Form from '../components/Form'

// Sends Form input to your email using sendGrid!
const sendGridApiKey = '***'
const sendTo = '***'
const sendFrom = '***'
const subject = 'Bus Timetable Feedback'

/**
 * Feedback screen
 **/

const Feedback = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { theme } = useTheme()

  const sendEmailHandler = ({ name, email, message }) => {
    const data = JSON.stringify({ name, email, message }).replace(/[{}'']/g, '')

    fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sendGridApiKey
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: sendTo
              }
            ],
            subject: subject
          }
        ],
        from: {
          email: sendFrom
        },
        content: [
          {
            type: 'text/plain',
            value: data
          }
        ]
      })
    })
      .then(() => {
        Alert.alert('', t('feedback.onSuccessfulSubmit'), [
          {
            text: t('feedback.cancel'),
            onPress: () => navigation.navigate('About')
          }
        ])
      })
      .catch(() => {
        Alert.alert(t('feedback.error'), t('feedback.onSubmitError'), [
          { text: t('feedback.cancel') }
        ])
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={[styles.info, { color: theme.text }]}>
          {t('feedback.info')}
        </Text>
        <ScrollView style={styles.form}>
          <Form
            onSubmitHandler={sendEmailHandler}
            namePlaceholder={t('feedback.namePlaceholder')}
            emailPlaceholder={t('feedback.emailPlaceholder')}
            messagePlaceholder={t('feedback.messagePlaceholder')}
            submitTitle={t('feedback.submitTitle')}
            schemaRequiredName={t('feedback.schemaRequiredName')}
            schemaRequiredEmail={t('feedback.schemaRequiredEmail')}
            schemaRequiredMessage={t('feedback.schemaRequiredMessage')}
            buttonColor={theme.buttonColor}
            buttonText={theme.buttonText}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Feedback

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    top: 20,
    padding: 10,
    lineHeight: 22,
    fontWeight: 'bold'
  },
  form: {
    top: 70,
    width: '100%',
    height: '100%'
  }
})
