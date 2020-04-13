import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import LinesFlatList from '../components/LinesFlatList'
import enBus from '../EN-BUS.json'
import geBus from '../GEO-BUS.json'

function Item({ busNumber, stopA, stopB }) {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()

    return (
        <View style={styles.container}>

            <View style={styles.separator} />

            <View style={styles.wrapIcon} >
                <MaterialCommunityIcons name="bus" color='#1f5c87' size={15} style={styles.busIcon} />
                <Text style={styles.busNumber}>{busNumber}</Text>
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('LinesMap', { busNumber, forward: 0 }) }}>
                <Text style={styles.touchableOpacity}> {t('lines.from')} {stopA}  -> {t('lines.till')} {stopB}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('LinesMap', { busNumber, forward: 1 }) }}>
                <Text style={styles.touchableOpacity}> {t('lines.from')} {stopB}  -> {t('lines.till')} {stopA}</Text>
            </TouchableOpacity>
        </View>
    );
}

// Bus List screen 
const Lines = () => {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()


    let [db, setDb] = useState({
        busArray: [],
    })

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setDb({ busArray: i18n.language == 'en' ? (enBus.Bus) : (geBus.Bus) })
        })

        // Cleanup
        return unsubscribe

    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text>{t('lines.title')}</Text>
                <Text>{t('lines.direction')}</Text>
            </View>

            <FlatList
                data={db.busArray}
                renderItem={({ item }) => (
                    <Item
                        busNumber={item.RouteNumber}
                        stopA={item.StopA}
                        stopB={item.StopB}
                    />
                )}
                keyExtractor={item => item.RouteNumber}
            />


            {/* <LinesFlatList
                setData={db.busArray}
                handlePageNavigationForward={() => { navigation.navigate('LinesMap', { busNumber, forward: 0 }) }}
                handlePageNavigationBackward={() => { navigation.navigate('LinesMap', { busNumber, forward: 1 }) }}
                textFrom={t('lines.from')}
                textTill={t('lines.till')}
            /> */}
        </SafeAreaView>
    )
}

export default Lines

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde",
    },
    header: {
        flexDirection: 'row',
    },
    wrapIcon: {
        margin: 2,
        width: 46,
        height: 25,
        borderColor: 'white',
        borderStyle: 'solid',
        backgroundColor: "#c7dceb",
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
        // alignSelf: 'flex-end',
    },
    busNumber: {
        top: -10,
        marginLeft: 14,
        // fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    touchableOpacity: {
        marginLeft: 45,
        padding: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

