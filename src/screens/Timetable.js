import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// List of bus numbers
const Timetable = ({ route }) => {
    const navigation = useNavigation()

    const { post } = route.params
    console.log(post + 'it is cords')

    let [points, setPoints] = useState({
        pointsData: [],
        points: []
    })

    let [location, setLocation] = useState({
        lat: '',
        long: ''
    })

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         var lat = parseFloat(position.coords.latitude)
    //         var long = parseFloat(position.coords.longitude)
    //         setLocation({ lat, long })
    //     })
    //     setPoints({ pointsData: jsonDIR.Bus.Stops });

    //     const pointCoords = points.pointsData.map((point) => {
    //         return { latitude: point.Lat, longitude: point.Lon }
    //     })
    //     setPoints({ points: pointCoords });


    // }, [])

    return (
        <View style={styles.container}>
            {/* <Map
                lat={location.lat}
                long={location.long}
                polylineCoords={points}
            /> */}
            <Text>Timetable {post}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde"
    }
})

export default Timetable
