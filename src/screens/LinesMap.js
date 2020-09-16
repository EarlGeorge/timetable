import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Components
import Map from '../components/Map'

/**
 * Lines Map screen
**/
export default LinesMap = ({ route }) => {
    const { busNumber, forward } = route.params

    const { i18n } = useTranslation()
    const navigation = useNavigation()

    /**
     * 'markerData' contains bus stations coords, Lat-Longitude!
     * 'polylineData' contains entire bus route coords,
     * which is used to display yellow polyline on the map.
    **/
    const [db, setDb] = useState({
        markerData: [],
        polylineData: []
    })

    /**
     * Request for fetching bus number route coords!
     * Based on direction that is set in the Lines Screen, whether it's forward or backward,
     * forward variable is a boolean! 
     * API request sample.
     * https://xxxxxxx:xxxx/xxxxxxxxx/?route=${busNumber}&forward=${forward}
    **/
    const endPointEn = `sorry API is hidden`
    const endPointGe = `sorry API is hidden`

    const endPoint = i18n.language == 'en' ? (endPointEn) : (endPointGe)

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            const controller = new AbortController()
            const signal = controller.signal

            fetch(endPoint, { signal })
                .then(res => res.json())
                .then(data => {
                    setDb({
                        markerData: data.Stops,
                        polylineData: data.Stops.map((point) => {
                            return { latitude: point.Lat, longitude: point.Lon }
                        })
                    })
                })
                .catch(err => console.log(err))

            // Clean up
            return () => controller.abort()
        })

        // Clean up
        return unsubscribe

    }, [navigation])

    // Opens Bus station timetable screen
    const openTimetable = (stopId, name) => {
        navigation.navigate('Timetable', { stationTimetableId: stopId, metadata: name })
    }

    return (
        <Map
            markerSource={db.markerData}
            polylineSource={db.polylineData}
            onPressHandler={openTimetable}
        />
    )
}


