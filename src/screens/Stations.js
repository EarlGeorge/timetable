import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
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
    loading: true
  })

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      const station = i18n.language == 'en' ? (EnDb.Stops) : (GeDb.Stops)
      setDb({ markers: station, loading: false })
    })

    // Cleanup
    return unsubscribe

  }, [navigation])

  // Opens Timetable screen which takes some props from map marker 
  const openTimetable = (stopId, name) => {
    navigation.navigate('Timetable',
      { stationTimetableId: stopId, metadata: name }
    )
  }

  return db.loading ? null : (
    <View style={styles.container}>
      <Map
        lat={db.lat}
        long={db.long}
        markerSource={db.markers}
        onPressHandler={openTimetable}
      />
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
