import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import night from '../assets/night.json'

/**
 * Google Map: stateless Component
**/

const Map = ({ lat, long, polylineSource, markerSource, onPressHandler }) => {

    // MapView Markers 
    const markers = () => {
        if (markerSource !== null) {
            return markerSource.map((marker, index) => {
                const coords = {
                    latitude: marker.Lat,
                    longitude: marker.Lon
                }

                const metadata = `Bus Station: ${marker.Name}`;

                return (
                    <MapView.Marker
                        key={index}
                        coordinate={coords}
                        title={marker.StopId}
                        description={metadata}
                        onPress={() => onPressHandler(marker.StopId, marker.Name)}
                        // icon={require('../assets/images/452386-48.png')}
                   />
                )
            })
        }
    }

    // MapView Polylines
    const polylines = () => {

        return <MapView.Polyline
            coordinates={polylineSource}
            strokeWidth={4}
            strokeColor='#fff829'
        />

    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider='google'
                region={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.1022,
                    longitudeDelta: 0.0451
                }}
                customMapStyle={night}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                loadingEnabled={true}
                loadingBackgroundColor={'red'}
            >

                {markers()}

                {polylines()}

            </MapView>
        </View>
    )
}

export default Map