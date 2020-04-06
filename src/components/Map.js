import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import night from '../assets/night.json'
import { Asset } from 'expo-asset'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// const imageURI = Asset.fromModule(require('../assets/images/robot-dev.png')).uri
// const imageURI = (<MaterialCommunityIcons name="bus-clock" size={37} color="#d5d9de" />)

const Map = ({ lat, long, polylineSource, markerSource, onPressHandler }) => {

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

                    />
                    // icon={require('../assets/images/bus-station.svg')}
                    // image={require('../assets/images/bus-station.svg')}

                    //     {/* <View style={styles.circle}>
                    //         <Text style={styles.pinText}>{marker.Name}</Text>
                    //     </View>
                    // </MapView.Marker > */}
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

export default Map

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
    circle: {
        width: 15,
        height: 17,
        borderRadius: 1,
        backgroundColor: 'red',
    },
    pinText: {
        color: 'white',
        fontWeight: 'bold',

        fontSize: 4,
    },
})
