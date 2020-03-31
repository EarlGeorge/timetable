import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Components
import Map from '../components/Map'

import jsonData from '../DB.json'

// Stations Screen
const Stations = () => {
  const navigation = useNavigation()

  let [location, setLocation] = useState({
    lat: '',
    long: ''
  })
  let [db, setDb] = useState({
    markers: [],
    pointsData: [],
    points: [],
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = parseFloat(position.coords.latitude)
      const long = parseFloat(position.coords.longitude)
      setLocation({ lat, long })
    })
    setDb({ markers: jsonData.Bus.Stops })

  }, [])

  const openTimetable = (stopId, name) => { navigation.navigate('Timetable', { stationTimetableId: stopId, metadata:name }) }

  return (
    <View style={styles.container}>
      <Map
        markerSource={db.markers}
        polylineSource={db.points}
        lat={location.lat}
        long={location.long}
        onPressHandler={openTimetable}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#bacfde"
  }
})

export default Stations
