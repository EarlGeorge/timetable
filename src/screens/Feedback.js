import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { sendGridEmail } from 'react-native-sendgrid'
import { LinearGradient } from 'expo-linear-gradient'

// Component 
import Form from '../components/Form'


const sendGridKey = '***'
const sendTo = '***'
const subject = 'Bus Timetable Feedback'

/**
 * Feedback screen 
**/
const Feedback = () => {
    const { t } = useTranslation()

    const sendEmailHandler = (values) => {
        const sendFrom = values.email

        const contact = JSON.stringify({
            'Contact': values.name,
            'Mail': values.email,
            'Message': values.message
        })

        sendGridEmail(sendGridKey, sendTo, sendFrom, subject, contact)
            .then((res) => {
                console.log('Success', res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>

                <LinearGradient
                    colors={['rgb(227, 243, 255)', 'rgb(136, 179, 209)',]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: '100%',
                    }}
                />

                <Text style={styles.info}>{t('feedback.info')}</Text>

                <ScrollView style={styles.form}>
                    <Form onSubmitHandler={sendEmailHandler}
                        namePlaceholder={t('feedback.namePlaceholder')}
                        emailPlaceholder={t('feedback.emailPlaceholder')}
                        messagePlaceholder={t('feedback.messagePlaceholder')}
                        submitTitle={t('feedback.submitTitle')}
                        schemaRequiredName={t('feedback.schemaRequiredName')}
                        schemaRequiredEmail={t('feedback.schemaRequiredEmail')}
                        schemaRequiredMessage={t('feedback.schemaRequiredMessage')}
                    />
                </ScrollView>

            </View>
        </TouchableWithoutFeedback >
    )
}

export default Feedback

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        top: 20,
        padding: 10,
        lineHeight: 22,
        fontWeight: 'bold',
    },
    form: {
        top: 70,
        width: '100%',
        height: '100%'
    }
})