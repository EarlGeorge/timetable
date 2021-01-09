import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

// Component
import Button from '../components/Button'

// Mocking
import EnBus from '../DBSourceMocking/En-Bus-Lines-min.json'
import GeBus from '../DBSourceMocking/Ge-Bus-Lines-min.json'

/**
 * FlatList render Item
**/
function Item({ busNumber, stopA, stopB }) {
    const { t } = useTranslation()
    const navigation = useNavigation()

    const [boolean, setBoolean] = useState(true)
    //  Change Bus lines Direction
    const changeDirectionHandler = () => setBoolean(!boolean)

    // Bus Lines start-end direction
    const direction = boolean ?
        (
            <TouchableOpacity onPress={() => navigation.navigate('LinesMap', { busNumber, forward: 0 })} >
                <View style={styles.listItem}>
                    <Text>{stopA}</Text>
                    <Entypo name="arrow-long-right" color='#1f5c87' size={25} />
                    <Text>{stopB}</Text>
                </View>
            </TouchableOpacity>
        )
        :
        (
            <TouchableOpacity onPress={() => navigation.navigate('LinesMap', { busNumber, forward: 1 })} >
                <View style={styles.listItem}>
                    <Text>{stopB}</Text>
                    <Entypo name="arrow-long-right" color='#1f5c87' size={25} />
                    <Text>{stopA}</Text>
                </View>
            </TouchableOpacity>
        )

    return (
        <View>
            <View style={styles.separator} />
            <View style={styles.wrapBusIcon} >
                <MaterialCommunityIcons name="bus" color='#1f5c87' size={15} style={styles.busIcon} />
                <Text style={styles.busNumber}>{busNumber}</Text>
            </View>
            <Text style={styles.from}>{t('lines.from')}</Text>
            {direction}
            <View style={styles.changeDirection}>
                <Button
                    onPress={changeDirectionHandler}
                    text={t('lines.change')}
                    buttonColor='#c7dceb'
                    textColor='#1f5c87'
                />
            </View>
        </View>
    )
}

/**
 * Bus Line screen
**/
const Lines = () => {
    const { i18n } = useTranslation()
    const navigation = useNavigation()

    const [busArray, setBusArray] = useState([])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setBusArray(i18n.language == 'en' ? (EnBus.Bus) : (GeBus.Bus))
        })

        // Cleanup
        return unsubscribe

    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={busArray}
                renderItem={({ item }) => (
                    <Item
                        busNumber={item.RouteNumber}
                        stopA={item.StopA}
                        stopB={item.StopB}
                    />
                )}
                keyExtractor={item => item.RouteNumber}
            />
        </SafeAreaView>
    )
}

export default Lines

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bacfde',
        justifyContent: 'space-between',
    },
    wrapBusIcon: {
        margin: 2,
        width: 46,
        height: 25,
        borderColor: 'white',
        borderStyle: 'solid',
        backgroundColor: '#c7dceb',
        borderWidth: 1.5,
        borderBottomColor: 'yellow',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busIcon: {
        right: 1,
        top: 10,
        paddingRight: 25,
    },
    busNumber: {
        top: -10,
        marginLeft: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    touchableOpacity: {
        marginLeft: 45,
        padding: 10,
    },
    listItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 48,
    },
    from: {
        textAlign: 'center',
        color: 'black',
        top: -10,
        fontWeight: 'bold',
    },
    changeDirection: {
        alignItems: 'center'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

