import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'

import Map from '../components/Map'

import jsonData from '../DB.json'

const Stations = () => {
  const navigation = useNavigation()

  let [ready, setReady] = useState(false)


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
    points: [],
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      setLocation({ lat, long })
    })
    setDb({ markers: jsonData.Bus.Stops })

  }, [])


  const openTimetable = (e) => {
    e.preventDefault()
    setState({ title: e.nativeEvent.coordinate.latitude })
    console.log(e.nativeEvent.coordinate.latitude + 'is my Bus');

    // console.log(state.pointsData + 'is it');

    // const pointCoords = state.pointsData.map((point) => {
    //   return { latitude: point.Lat, longitude: point.Lon }
    // })
    // setState({ points: pointCoords });


    navigation.navigate('Timetable', { post: state.title })

  }


  const Loading = () => {
    if (!ready) {
      return (
        <AppLoading
          startAsync={cacheResourcesAsync}
          onFinish={setReady(true)}
          onError={console.warn}
        />
      )
    }

    async function cacheResourcesAsync() {
      const images = [require('../assets/images/robot-dev.png')]

      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync()
      })
      return Promise.all(cacheImages)
    }

  }


  return (
    <View style={styles.container}>
      {Loading()}
      <Map markerDb={db.markers}
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
