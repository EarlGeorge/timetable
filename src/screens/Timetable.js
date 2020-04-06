import React, { useState, useEffect } from 'react'
// import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, StyleSheet, RefreshControl, Button, AsyncStorage, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

// Component
import MyFlatList from '../components/MyFlatList'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

// bus station Timetable screen 
const Timetable = ({ route }) => {
    const { t } = useTranslation()
    const { stationTimetableId, metadata } = route.params

    const [busList, setBusList] = useState([])
    const endPointEn = `sorry API is hidden`
    const endPointGe = `sorry API is hidden`

    const endPoint = i18n.language == 'en' ? (endPointEn) : (endPointGe)
    
    // TestFavorite:Bookmarks
    let metainfo = { station: stationTimetableId, info: metadata }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch(endPoint, { signal })
            .then(res => res.json())
            .then(data => setBusList(data.ArrivalTime))
            .catch(err => console.log(err), Alert.alert(
                t('timetable.error'),
                t('timetable.server_err'),
                [{ text: t('timetable.cancel') }]
            ))

        // clean up
        return () => controller.abort()
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        fetch(endPoint)
            .then(res => res.json())
            .then(data => setBusList(data.ArrivalTime))
            .catch(err => console.log(err))

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const saveFavoritehHandler = () => {
        //  AsyncStorage.removeItem('TestFavorite')

        AsyncStorage.getItem('TestFavorite', async (err, result) => {
            if (result == null) {

                let array = (JSON.parse(result))
                array = ([metainfo])
                await AsyncStorage.setItem('TestFavorite', JSON.stringify(array))

            } else if (result !== null) {

                let array = JSON.parse(result)
                let onAlert

                array.forEach((value) => {
                    if (value.station == stationTimetableId) {
                        Alert.alert('', t('timetable.favorite'), [{ text: t('timetable.cancel') }])
                        onAlert = true
                    }
                })
                
                if (onAlert !== true) {
                    array.push(metainfo)
                    AsyncStorage.setItem('TestFavorite', JSON.stringify(array))
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>{t('timetable.station')} {stationTimetableId}</Text>

            <Button
                onPress={saveFavoritehHandler}
                title="Favorite"
                color="#841584"
            />

            <View style={styles.listItem}>
                <Text>{t('timetable.bus')}</Text>
                <Text>{t('timetable.direction')}</Text>
                <Text>{t('timetable.time')}</Text>
            </View>

            <MyFlatList
                setData={busList}
                refreshHandler={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde"
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
    info: {
        marginTop: 5,
        padding: 10,
        textAlign: "center"
    }
})

export default Timetable
