import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Components
import Map from '../components/Map'

import EnDb from '../DBSourceMocking/En-DB-min.json'
import GeDb from '../DBSourceMocking/Ge-DB-min.json'

// Stations Screen
export default Stations = () => {
  const navigation = useNavigation()
  const { i18n } = useTranslation()

  const [location, setLocation] = useState({
    lat: 41.75942312743827,
    long: 44.77002225551471,
  })
  const [db, setDb] = useState({
    markers: null,
    pointsData: [],
    points: [],
    isLoading: true
  })

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const lat = parseFloat(position.coords.latitude)
    //   const long = parseFloat(position.coords.longitude)
    //   setLocation({ lat, long })
    // })

    const unsubscribe = navigation.addListener('focus', () => {

      const station = i18n.language == 'en' ? (EnDb.Stops) : (GeDb.Stops)
      
      setDb({ markers: station, isLoading: false })

        // Platform.select({
        //   ios: setDb({ markers: station, isLoading: false }),

        //   android: setTimeout(() => {
        //     setDb({ markers: station, isLoading: false })
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

  return (
    <View style={styles.container}>
      <Map
        lat={location.lat}
        long={location.long}
        markerSource={db.markers}
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
