import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LocalizationContext } from '../localization/LocalizationContext'

const Favorites = () => {
    const navigation = useNavigation()
    const { translations } = useContext(LocalizationContext)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Favorites is translated to {translations.WELCOME}</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('LangSettings')}
                style={[
                    styles.section,
                    {
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        marginTop: 0,
                        alignSelf: 'flex-end',
                        borderWidth: 1,
                        borderColor: 'grey',
                        paddingVertical: 10,
                        backgroundColor: 'white',
                    },
                ]}>
                <Text style={[styles.sectionTitle, { fontSize: 18 }]}>
                    {translations.CHANGE_LANGUAGE}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#bacfde"
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    info: {
        padding: 25,
        fontSize: 15,
    }
})

export default Favorites