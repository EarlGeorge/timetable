import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import night from '../assets/night.json'

const Map = ({ lat, long, polylineSource, markerSource, onPressHandler }) => {

    const markers = () => {
        if (markerSource != null) {
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
                        onPress={() => onPressHandler(marker.StopId)}
                    />
                )
            })
        }
    }

    const polyline = () => {

        return <MapView.Polyline
            coordinates={polylineSource}
            strokeWidth={4}
            strokeColor="red"
        />

    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider="google"
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
                {polyline()}

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
    }
})

export default Map
