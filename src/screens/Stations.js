import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Components
import Map from '../components/Map'

import EnDb from '../DBSourceMocking/En-DB-min.json'
import GeDb from '../DBSourceMocking/Ge-DB-min.json'

// Stations Screen
const Stations = () => {
  const navigation = useNavigation()
  const { i18n } = useTranslation()
  const { dark } = useTheme()

  const [db, setDb] = useState({
    markers: []
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const station = i18n.language == 'en' ? EnDb.Stops : GeDb.Stops
      setDb({ markers: station })
    })

    // Cleanup
    return unsubscribe
  }, [navigation])

  // Opens Timetable screen which takes some props from map marker
  const openTimetable = (stopId, name) => {
    navigation.navigate('Timetable', {
      stationTimetableId: stopId,
      metadata: name
    })
  }

  return (
    <View style={styles.container}>
      <Map
        markerSource={db.markers}
        onPressHandler={openTimetable}
        isDark={dark}
      />
    </View>
  )
}

export default Stations

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
