import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Components
import Map from '../components/Map'

export default LinesMap = ({ route }) => {
    const { busNumber, forward } = route.params

    const { i18n } = useTranslation()
    const navigation = useNavigation()

    let [db, setDb] = useState({
        markerData: [],
        polylinesData: []
    })

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
                        polylinesData: data.Stops.map((point) => { return { latitude: point.Lat, longitude: point.Lon } })
                    })
                })
                .catch(err => console.log(err))

            // Clean up
            return () => controller.abort()
        })

        // Clean up
        return unsubscribe

    }, [navigation])

    const openTimetable = (stopId, name) => {
        navigation.navigate('Timetable',
            { stationTimetableId: stopId, metadata: name })
    }

    return (
        <Map
            markerSource={db.markerData}
            polylineSource={db.polylinesData}
            lat={10}
            long={10}
            onPressHandler={openTimetable}
        />
    )
}


