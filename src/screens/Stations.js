import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Map from '../components/Map'

import jsonData from '../DB.json'

const Stations = () => {

  let [db, setDb] = useState({
    isLoading: true, markers: []
  })
  let [location, setLocation] = useState({
    lat: '',
    long: ''
  })
  let [state, setState] = useState({
    lat: '',
    long: '',
    title: 'ge',
    pointsData: [],
    points: []
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      setLocation({ lat, long })
    })
    setDb({ markers: jsonData.Bus.Stops })

  }, [])

  return (
    <View style={styles.container}>
      <Map markerDb={db.markers}
        lat={location.lat}
        long={location.long}
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
