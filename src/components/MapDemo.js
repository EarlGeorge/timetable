import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import MapView from 'react-native-maps'
import night from '../assets/night.json'
import jsonData from '../DB.json'
import jsonDIR from '../DIR.json'

function MapDemo({ navigation }) {
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
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      setLocation({ lat, long })
    })
    setDb({ markers: jsonData.Bus.Stops })


    setState({ pointsData: jsonDIR.Bus.Stops });


  }, [])

  let opneD = (e) => {
    e.preventDefault()
    setState({ title: e.nativeEvent.coordinate.latitude })
    console.log(e.currentTarget + 'is my Bus');
    console.log(state.pointsData + 'is it');


    // const pointCoords = state.pointsData.map((point) => {
    //   return { latitude: point.Lat, longitude: point.Lon }
    // })
    // setState({ points: pointCoords });


    navigation.navigate('Timetable', { post: state.title })

  }


  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.1022,
          longitudeDelta: 0.0451
        }}
        customMapStyle={night}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        loadingEnabled={true}
      >
        {console.log(db)}

        {db.markers.map((body, index) => {
          const coords = {
            latitude: body.Lat,
            longitude: body.Lon
          }
          const metadata = `Bus Station: ${body.Name}`;
          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={body.StopId}
              description={metadata}
              onPress={opneD}
            />
          )
        })}

        <MapView.Polyline
          coordinates={state.points}
          strokeWidth={4}
          strokeColor="red"
        />
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#bacfde"
  },
  Button: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default MapDemo
