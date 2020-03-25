import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, RefreshControl } from 'react-native'

// Component
import MyFlatList from '../components/MyFlatList'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

// bus station Timetable screen 
const Timetable = ({ route }) => {
    const { stationTimetableId } = route.params

    const [busList, setBusList] = useState([])

    const endPoint = `sorry API is hidden`

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

    return (
        <View style={styles.container}>
            <Text style={styles.info}>Station N: {stationTimetableId}</Text>
            <View style={styles.listItem}>
                <Text>Bus</Text>
                <Text>Direction </Text>
                <Text>Time</Text>
            </View>
            {/* <Text style={styles.info}>Next arrivals, based on the vehicle's GPS location.</Text> */}
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
