import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Animated,
  Easing
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons'
import useSWR from 'swr'

/**
 * Bus station Timetable screen!
 **/

const Timetable = ({ route }) => {
  const { t, i18n } = useTranslation()
  // netInfo helps to check network connection status. Timeout 15s
  const netInfo = useNetInfo({ reachabilityRequestTimeout: 15 * 1000 })

  // station ID which you get from Stations screen
  const { stationTimetableId, metadata } = route.params
  const metainfo = { station: stationTimetableId, info: metadata }

  /**
   * Arrival bus list!
   * Used to get latest info.
   * API request sample.
   * https://xxxxxxx:xxxx/xxxxxxxxxxxx/?station=${stationTimetableId}
   **/
  const endPointEn = `sorry API is hidden`
  const endPointGe = `sorry API is hidden`

  const endPoint = i18n.language == 'en' ? endPointEn : endPointGe

  // Local Time string object
  const [localTime, setLocalTime] = useState('')

  // Stream of data
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, revalidate } = useSWR(endPoint, fetcher)

  revalidate()

  // Bouncing animation
  const focus = new Animated.Value(0)

  Animated.loop(
    Animated.timing(focus, {
      toValue: 10,
      duration: 4000,
      easing: Easing.bounce,
      useNativeDriver: true
    })
  ).start()

  useEffect(() => {
    // Server related warning
    if (error) {
      Alert.alert(t('timetable.error'), t('timetable.server_err'), [
        { text: t('timetable.cancel') }
      ])
    }

    const interval = setInterval(() => {
      setLocalTime(
        new Date().toLocaleTimeString('en-US', { hour12: false }, 'ka-KA')
      )
    }, 1000)

    // clean up
    return () => {
      clearInterval(interval), focus.stopAnimation()
    }
  }, [])

  /**
   * Saves station ID and metainfo to local storage!
   * Checks if ID exist in storage and displays pop up warning.
   **/

  const saveFavoriteHandler = async () => {
    try {
      const result = await AsyncStorage.getItem('TestFavorite')

      if (result == null) {
        const createArray = [metainfo]

        AsyncStorage.setItem('TestFavorite', JSON.stringify(createArray))
      } else if (result !== null) {
        const array = await JSON.parse(result)
        let onAlert = false

        array.forEach(value => {
          if (value.station == stationTimetableId) {
            onAlert = true
            Alert.alert('', t('timetable.favorite'), [
              { text: t('timetable.cancel') }
            ])
          }
        })

        if (onAlert == false) {
          array.push(metainfo)
          AsyncStorage.setItem('TestFavorite', JSON.stringify(array))
        }
      }
    } catch (err) {
      Alert.alert('', err, [{ text: t('timetable.cancel') }])
    }
  }

  /**
   * Displays Local Time!
   * Shows night time if it's between 12:00AM - 6:00AM.
   * Shows delay if timetable is empty between 7:00AM - 11:00PM,
   * also for displaying delay we check network status.
   **/

  const DisplayTime = () => {
    if (parseInt(localTime) >= 7 && parseInt(localTime) <= 22) {
      return (
        <View style={styles.localTime}>
          <Text>{localTime} (GMT+4)</Text>
          <Text>{t('timetable.localTime')}</Text>
          <Text>{t('timetable.localTimeDelay')}</Text>
        </View>
      )
    } else if (
      (parseInt(localTime) >= 0 && parseInt(localTime) <= 6) ||
      parseInt(localTime) == 23
    ) {
      return (
        <View style={styles.localTime}>
          <Text>{localTime} (GMT+4)</Text>
          <Text>{t('timetable.localTime')}</Text>
          <Text>{t('timetable.localTimeNight')}</Text>
        </View>
      )
    }
  }

  // FlatList Item
  const Item = ({ title, time, bus, nowText, minText }) => {
    // Apply animation if time is below two minutes and display 'Now' instead of time.
    // Time is number it can be between 0-100: represents minutes.

    const willBeIn = () => {
      if (time <= 2 || 0) {
        return (
          <Animated.View style={{ opacity: focus }}>
            <Text>{nowText}</Text>
          </Animated.View>
        )
      } else {
        return (
          <Text>
            {time} {minText}
          </Text>
        )
      }
    }

    return (
      <View style={styles.listItemView}>
        <Text>{bus}</Text>
        <Text style={styles.title}>{title}</Text>
        {willBeIn()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {t('timetable.station')} {stationTimetableId}
      </Text>

      <AntDesign
        name='staro'
        color='white'
        size={30}
        style={styles.favoriteIcon}
        onPress={saveFavoriteHandler}
      />

      <View style={styles.listHeader}>
        <Text>{t('timetable.bus')}</Text>
        <Text>{t('timetable.direction')}</Text>
        <Text>{t('timetable.time')}</Text>
      </View>

      {!data ? null : (
        <FlatList
          data={data.ArrivalTime}
          renderItem={({ item }) => (
            <Item
              title={item.DestinationStopName}
              time={item.ArrivalTime}
              bus={item.RouteNumber}
              minText={t('timetable.minText')}
              nowText={t('timetable.nowText')}
            />
          )}
          keyExtractor={item => item.RouteNumber}
        />
      )}

      {!data
        ? null
        : netInfo.isConnected && data.ArrivalTime.length === 0 && DisplayTime()}
    </View>
  )
}

export default Timetable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bacfde'
  },
  info: {
    marginTop: 5,
    padding: 10,
    textAlign: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 10,
    paddingRight: 31
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 15
  },
  localTime: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 150
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 15
  },
  title: {
    fontSize: 11
  }
})
