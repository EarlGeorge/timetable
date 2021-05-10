import React from 'react'
import { Marker, Polyline } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import night from '../assets/night.json'

/**
 * Google Map
 **/

const Map = ({ polylineSource, markerSource, onPressHandler }) => {
  // MapView Markers
  const markers = () => {
    if (markerSource.length > 0) {
      return markerSource.map((marker, index) => {
        const coords = {
          latitude: marker.Lat,
          longitude: marker.Lon
        }

        return (
          <Marker
            key={index}
            coordinate={coords}
            title={marker.Name}
            description={' '}
            onPress={() => onPressHandler(marker.StopId, marker.Name)}
            pinColor={'#de373d'}
            tracksViewChanges={false}
            icon={require('../assets/images/b.png')}
          />
        )
      })
    }
  }

  // MapView Polylines
  const polylines = () => {
    if (polylineSource != null) {
      return (
        <Polyline
          coordinates={polylineSource}
          strokeWidth={4}
          strokeColor='#fff829'
        />
      )
    }
  }

  return (
    <MapView
      style={{ flex: 1 }}
      provider='google'
      initialRegion={{
        latitude: 41.7330215,
        longitude: 44.7989883,
        latitudeDelta: 0.35,
        longitudeDelta: 0.25
      }}
      clusterColor={'rgba(255, 0, 0, 0.4)'}
      radius={170}
      extent={700}
      showsCompass={true}
      customMapStyle={night}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
    >
      {markers()}

      {polylines()}
    </MapView>
  )
}

export default Map
