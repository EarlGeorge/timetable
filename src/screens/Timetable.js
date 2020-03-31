import React, { useState, useEffect } from 'react'
// import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, StyleSheet, RefreshControl, Button, AsyncStorage } from 'react-native'
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
    const { t, i18n } = useTranslation()
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
            .catch(err => console.log(err))

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

        const metaArray = []

        AsyncStorage.getItem('TestFavorite', async (err, result) => {
            if (result == null) {

                let array = JSON.parse(result)
                metaArray.push(array, metainfo)
                await AsyncStorage.setItem('TestFavorite', JSON.stringify(metaArray))

            } else if (result !== null) {

                let array = JSON.parse(result)
                array.push(metainfo)
                await AsyncStorage.setItem('TestFavorite', JSON.stringify(array))

            } else {
                console.log('Data Not Found')
                AsyncStorage.setItem('TestFavorite', JSON.stringify(metainfo))
            }
        })
    }

    const [array, setArray] = useState([])

    const showFavorite = async () => {

        AsyncStorage.getItem('TestFavorite')
            .then(res => setArray(JSON.parse(res)) )
            .catch(error => console.log('Couldnt load!' + error))

        // console.log(activities + 'is my Async stored');

        // try {
        //   const value = await AsyncStorage.getItem('TestFavorite')
        //   if(value !== null) {
        //     // value previously stored
        //     setArray(JSON.parse(value))
        //   }
        // } catch(e) {
        //   // error reading value
        // }

        

        // var object = array.reduce(
        //     (obj, item) => Object.assign(obj, { [item.station]: item.info }), {});
        // var object = array.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{})
    }

    const show = () => {
        // console.log(busList + 'bus')
        console.log(array)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>{t('timetable.station')} {stationTimetableId}</Text>
           
            <View style={styles.listItem}>
                <Text>{t('timetable.bus')}</Text>
                <Text>{t('timetable.direction')}</Text>
                <Text>{t('timetable.time')}</Text>
            </View>

            <Button
                onPress={saveFavoritehHandler}
                title="Favorite"
                color="#841584"
            />

            <Button
                onPress={showFavorite}
                title="show F"
                color="#841584"      
            />

            <Button
                onPress={show}
                title="show array"
                color="#841584"
            />

            {/* <Text>Live next arrivals, based on the vehicle's GPS location.</Text> */}

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
