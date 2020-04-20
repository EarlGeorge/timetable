import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Components
import Map from '../components/Map'

import jsonData from '../DB.json'

// Stations Screen
export default Stations = () => {
  const navigation = useNavigation()

  const [location, setLocation] = useState({
    lat: 1,
    long: 1,
  })
  const [db, setDb] = useState({
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

  // Opens Timetable screen which takes some props from map marker 
  const openTimetable = (stopId, name) => {
    navigation.navigate('Timetable',
      { stationTimetableId: stopId, metadata: name })
  }

  return (
    <View style={styles.container}>
      <Map
        markerSource={db.markers}
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
    backgroundColor: "#bacfde"
  }
})
