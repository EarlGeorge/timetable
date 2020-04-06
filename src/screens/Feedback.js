import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { sendGridEmail } from 'react-native-sendgrid'

// Component 
import Form from '../components/Form'

const SENDGRIDAPIKEY = ''
const TOMEMAIL = ''
const SUBJECT = 'You have a new message'

/**
 * Feedback screen 
**/
const Feedback = () => {
    const { t } = useTranslation()

    const [message, setMessage] = useState({
        name: '',
        email: '',
        message: '',
    })

    const sendEmailHandler = (values) => {
        // setMessage(values)

        // console.log(message)

        let FROMEMAIL = values.email

        let ContactDetails = "Contact: " + values.name + " Mail: " + values.email + " Message: " + values.message

        let sendRequest = sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, ContactDetails)

        sendRequest
            .then((res) => {
                console.log("Success", res)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(ContactDetails)

    }

    return (
        <View style={styles.container}>
            <Text>{t('feedback.title')}</Text>

            <Text>{t('feedback.info')}</Text>

            <Form onSubmitHandler={sendEmailHandler}
                namePlaceholder={t('feedback.namePlaceholder')}
                emailPlaceholder={t('feedback.emailPlaceholder')}
                messagePlaceholder={t('feedback.messagePlaceholder')}
                submitTitle={t('feedback.submitTitle')}
                schemaRequiredName={t('feedback.schemaRequiredName')}
                schemaRequiredEmail={t('feedback.schemaRequiredEmail')}
                schemaRequiredMessage={t('feedback.schemaRequiredMessage')}
            />
        </View>
    )
}

export default Feedback

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
})