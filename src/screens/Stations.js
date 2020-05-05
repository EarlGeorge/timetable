import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Components
import Map from '../components/Map'

import EnDb from '../DBSourceMocking/En-DB-min.json'
import GeDb from '../DBSourceMocking/Ge-DB-min.json'

// Stations Screen
const Stations = () => {
  const navigation = useNavigation()
  const { i18n } = useTranslation()

  const [db, setDb] = useState({
    lat: 41.71942312743827,
    long: 44.77002225551471,
    markers: [],
  })

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const lat = parseFloat(position.coords.latitude)
    //   const long = parseFloat(position.coords.longitude)
    //   db({ lat, long })
    // })

    const unsubscribe = navigation.addListener('focus', () => {

      const station = i18n.language == 'en' ? (EnDb.Stops) : (GeDb.Stops)

      setDb({ markers: station })

      // Platform.select({
      //   ios: setDb({ markers: station }),

      //   android: setTimeout(() => {
      //     setDb({ markers: station })
      //   }, 4000)
      // })

    })

    // Cleanup
    return unsubscribe

  }, [navigation])

  // Opens Timetable screen which takes some props from map marker 
  const openTimetable = (stopId, name) => {
    navigation.navigate('Timetable',
      { stationTimetableId: stopId, metadata: name })
  }

  const displayMap = () => {
    if (db.markers.length > 100) {
      return (
        <Map
          lat={db.lat}
          long={db.long}
          markerSource={db.markers}
          onPressHandler={openTimetable}
        />
      )
    }
  }

  return (
    <View style={styles.container}>
     {displayMap()}
    </View>
  )
}

export default Stations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bacfde"
  }
})
