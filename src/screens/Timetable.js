import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, RefreshControl, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNetInfo } from "@react-native-community/netinfo"
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons'

// Component
import TimetableFlatList from '../components/TimetableFlatList'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    })
}

/**
 * Bus station Timetable screen!
**/
export default Timetable = ({ route }) => {
    const { t, i18n } = useTranslation()
    // netInfo helps to check network connection status. Timeout 15s 
    const netInfo = useNetInfo({ reachabilityRequestTimeout: 15 * 1000 })

    // station ID which you get from Stations screen
    const { stationTimetableId, metadata } = route.params
    const metainfo = { station: stationTimetableId, info: metadata }

    /**
     * Arrival bus list!
     * Used to get latest info.
     * API request sample. 
     * https://xxxxxxx:xxxx/xxxxxxxxxxxx/?station=${stationTimetableId}
    **/
    const [busList, setBusList] = useState([])
    const endPointEn = `sorry API is hidden`
    const endPointGe = `sorry API is hidden`

    const endPoint = i18n.language == 'en' ? (endPointEn) : (endPointGe)

    // Local Time string object
    const [localTime, setLocalTime] = useState('')

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch(endPoint, { signal })
            .then(res => res.json())
            .then(data => setBusList(data.ArrivalTime))
            .catch(() => Alert.alert(
                t('timetable.error'),
                t('timetable.server_err'),
                [{ text: t('timetable.cancel') }]
            ))

        const interval = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString('en-US', { hour12: false }, 'ka-KA'))
        }, 1000)

        // clean up
        return () => { controller.abort(); clearInterval(interval) }
    }, [])

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)

        fetch(endPoint)
            .then(res => res.json())
            .then(data => setBusList(data.ArrivalTime))
            .catch(() => Alert.alert('', t('timetable.error'), [{ text: t('timetable.cancel') }]))

        wait(2000).then(() => setRefreshing(false))
    }, [refreshing])

    /**
     * Saves station ID and metainfo to local storage!
     * Checks if ID exist in storage and displays pop up warning.
    **/
    const saveFavoriteHandler = async () => {
        try {
            const result = await AsyncStorage.getItem('TestFavorite')

            if (result == null) {

                const createArray = [metainfo]

                AsyncStorage.setItem('TestFavorite', JSON.stringify(createArray))

            } else if (result !== null) {

                const array = await JSON.parse(result)
                let onAlert = false

                array.forEach((value) => {
                    if (value.station == stationTimetableId) {
                        onAlert = true
                        Alert.alert('', t('timetable.favorite'), [{ text: t('timetable.cancel') }])
                    }
                })

                if (onAlert == false) {
                    array.push(metainfo)
                    AsyncStorage.setItem('TestFavorite', JSON.stringify(array))
                }
            }
        } catch (err) {
            Alert.alert('', err, [{ text: t('timetable.cancel') }])
        }
    }

    /**
     * Displays Local Time!
     * Shows night time if it's between 12:00AM - 6:00AM. 
     * Shows delay if timetable is empty between 7:00AM - 11:00PM, 
     * also for displaying delay we check network status.
    **/

    const displayTime = () => {
        if (parseInt(localTime) >= 7 && parseInt(localTime) <= 22) {
            return (
                <View style={styles.localTime}>
                    <Text>{localTime} (GMT+4)</Text>
                    <Text>{t('timetable.localTime')}</Text>
                    <Text>{t('timetable.localTimeDelay')}</Text>
                </View>
            )
        }
        else if (parseInt(localTime) >= 0 && parseInt(localTime) <= 6 || parseInt(localTime) == 23) {
            return (
                <View style={styles.localTime}>
                    <Text>{localTime} (GMT+4)</Text>
                    <Text>{t('timetable.localTime')}</Text>
                    <Text>{t('timetable.localTimeNight')}</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>{t('timetable.station')} {stationTimetableId}</Text>

            <AntDesign name="staro"
                color='white'
                size={30}
                style={styles.favoriteIcon}
                onPress={saveFavoriteHandler}
            />

            <View style={styles.listItem}>
                <Text>{t('timetable.bus')}</Text>
                <Text>{t('timetable.direction')}</Text>
                <Text>{t('timetable.time')}</Text>
            </View>

            <TimetableFlatList
                setData={busList}
                minText={t('timetable.minText')}
                nowText={t('timetable.nowText')}
                refreshHandler={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            {netInfo.isConnected && busList.length === 0 && displayTime()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bacfde'
    },
    info: {
        marginTop: 5,
        padding: 10,
        textAlign: 'center'
    },
    favoriteIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 10,
        paddingRight: 31,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 15,
    },
    localTime: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 150,
    }
})
