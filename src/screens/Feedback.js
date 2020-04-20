import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { sendGridEmail } from 'react-native-sendgrid'

// Component 
import Form from '../components/Form'

const CONFIG = {
    SENDGRIDURL: "https://api.sendgrid.com/v3/mail/send"
}

const sendGridKey = '***'
const sendTo = '***'
const subject = 'Bus Timetable Feedback'

/**
 * Feedback screen 
**/
const Feedback = () => {
    const { t } = useTranslation()

    const sendEmailHandler = (values) => {
        let sendFrom = values.email
        // let contact = "Contact: " + values.name + " Mail: " + values.email + " Message: " + values.message

        // sendGridEmail(sendGridKey, sendTo, sendFrom, subject, contact)
        //     .then((res) => {
        //         console.log("Success", res)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })

        let contact = {
            'Contact': values.name,
            'Mail': values.email,
            'Message': values.message
        }

        fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sendGridKey
            },
            body: JSON.stringify({
                "personalizations": [
                    {
                        "to": [
                            {
                                "email": sendTo
                            }
                        ],
                        "subject": subject
                    }
                ],
                "from": {
                    "email": sendFrom
                },
                "content": [
                    {
                        "type": "text/plain",
                        "value": "Contact: " + values.name + " Mail: " + values.email + " Message: " + values.message
                    }
                ]
            }),
        })
            .then((res) => {
                console.log("Success", res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>

                <Text>{t('feedback.title')}</Text>

                <Text>{t('feedback.info')}</Text>

                <ScrollView>
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
        backgroundColor: "#bacfde",
        fontSize: 15,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
})