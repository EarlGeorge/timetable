import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Modal
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons'

// components
import Button from '../components/Button'

/**
 * Favorite Bus stations screen
 **/

const Favorites = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [list, setList] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  // used for removing [square brackets] in array of an objects.
  const myRegex = args => args.replace(/(?!^)[\[\]](?!$)/g, '')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const result = await AsyncStorage.getItem('TestFavorite')

      if (result == null) return
      else {
        setList(JSON.parse(myRegex(result)))
      }
    })

    // Cleanup
    return unsubscribe
  }, [navigation])

  const onRefreshHandler = async () => {
    setRefreshing(true)

    const result = await AsyncStorage.getItem('TestFavorite')
    setList(JSON.parse(myRegex(result)))

    setRefreshing(false)
  }

  // FlatList Item
  const Item = ({ station, info }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const onDeleteHandler = async () => {
      const result = await AsyncStorage.getItem('TestFavorite')
      if (result !== null) {
        const array = await JSON.parse(result)
        const deleteItem = await array.filter(item => item.station !== station)
        AsyncStorage.setItem('TestFavorite', JSON.stringify(deleteItem))
      }
      setModalVisible(!modalVisible)
    }

    return (
      <TouchableHighlight
        style={styles.touchableHighlight}
        onPress={() => {
          navigation.navigate('Timetable', { stationTimetableId: station })
        }}
        onLongPress={() => setModalVisible(true)}
        activeOpacity={0.1}
        underlayColor={'transparent'}
      >
        <View style={styles.item}>
          <View
            style={[styles.separator, { borderBottomColor: theme.border }]}
          />

          <Text style={{ color: theme.text }}>{info}</Text>

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.backgroundColor,
                  shadowColor: theme.shadow
                }
              ]}
            >
              <Text style={[styles.modalText, { color: theme.text }]}>
                {t('favorites.modal')}
              </Text>

              <Text style={[styles.modalStation, { color: theme.text }]}>
                {info}
              </Text>

              <View style={styles.modalButtons}>
                <Button
                  onPress={onDeleteHandler}
                  text={t('favorites.modalButtonYes')}
                  buttonColor={theme.buttonColor}
                  textColor='red'
                  margin={25}
                  paddingVertical={4}
                  fontSize={15}
                />

                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  text={t('favorites.modalButtonNo')}
                  buttonColor={theme.buttonColor}
                  textColor={theme.buttonText}
                  margin={25}
                  paddingVertical={4}
                  fontSize={15}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      {list.length > 0 ? (
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Item info={item.info} station={item.station} />
          )}
          keyExtractor={item => item.station}
          onRefresh={onRefreshHandler}
          refreshing={refreshing}
        />
      ) : (
        <View style={styles.emptyList}>
          <AntDesign name='staro' color='white' size={45} />
          <Text style={{ color: theme.text }}>{t('favorites.empty')}</Text>
        </View>
      )}
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  touchableHighlight: {
    alignItems: 'center',
    padding: 10
  },
  item: {
    width: '100%'
  },
  title: {
    margin: 1,
    fontSize: 15
  },
  emptyList: {
    alignItems: 'center',
    top: 200,
    paddingHorizontal: 20
  },
  modalView: {
    top: 50,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center'
  },
  modalStation: {
    marginBottom: 30,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
