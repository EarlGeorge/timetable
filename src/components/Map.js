import React from 'react'
import MapView from 'react-native-maps'
import night from '../assets/night.json'
import { View, Text, StyleSheet, RefreshControl, AsyncStorage, Alert } from 'react-native'
/**
 * Google Map: stateless Component
**/

const Map = ({ lat, long, polylineSource, markerSource, onPressHandler }) => {

    // MapView Markers 
    // const markers = () => {
    //     if (markerSource !== null) {
    //         return markerSource.map((marker, index) => {
    //             const coords = {
    //                 latitude: marker.Lat,
    //                 longitude: marker.Lon
    //             }

    //             const metadata = `Bus Station: ${marker.Name}`;

    //             return (
    //                 <MapView.Marker
    //                     key={index}
    //                     coordinate={coords}
    //                     title={marker.StopId}
    //                     description={metadata}
    //                     onPress={() => onPressHandler(marker.StopId, marker.Name)}
    //                 // icon={require('../assets/images/452386-48.png')}
    //                 />
    //             )
    //         })
    //     }
    // }

    // MapView Polylines
    // const polylines = () => {
    //     if (polylineSource != null) {
    //         return <MapView.Polyline
    //             coordinates={polylineSource}
    //             strokeWidth={4}
    //             strokeColor='#fff829'
    //         />
    //     }
    // }

    return (
        <MapView
            style={{ flex: 1 }}
            provider='google'
            initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.1022,
                longitudeDelta: 0.0451
            }}
            customMapStyle={night}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
        // loadingEnabled={true}
        // loadingBackgroundColor={'red'}
        // minZoomLevel={10}
        // maxZoomLevel={17}
        >

            {/* {markers()} */}

            {markerSource[10] != null && markerSource.map((marker, index) => {
                const coords = {
                    latitude: marker.Lat,
                    longitude: marker.Lon
                }
                const metadata = marker.Name

                return (
                    <MapView.Marker
                        key={index}
                        coordinate={coords}
                        title={metadata}
                        description={' '}
                        onPress={() => onPressHandler(marker.StopId, marker.Name)}
                    // icon={require('../assets/images/452386-48.png')}
                    />
                )
            })
            }

            {/* {polylines()} */}

        </MapView>
    )
}

export default Map