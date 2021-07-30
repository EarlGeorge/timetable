import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

// Component
import Button from '../components/Button'

// Mocking
import EnBus from '../DBSourceMocking/En-Bus-Lines-min.json'
import GeBus from '../DBSourceMocking/Ge-Bus-Lines-min.json'

/**
 * Bus Line screen
 **/

const Lines = () => {
  const { i18n, t } = useTranslation()
  const navigation = useNavigation()
  const { theme } = useTheme()

  const [busArray, setBusArray] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setBusArray(i18n.language == 'en' ? EnBus.Bus : GeBus.Bus)
    })

    // Cleanup
    return unsubscribe
  }, [navigation])

  // FlatList Item
  const Item = ({ busNumber, stopA, stopB }) => {
    const [boolean, setBoolean] = useState(true)

    // Change direction
    const changeDirectionHandler = () => setBoolean(!boolean)

    // Bus Line start-end direction
    const direction = boolean ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LinesMap', { busNumber, forward: 0 })
        }
      >
        <View style={styles.listItem}>
          <Text style={{ color: theme.text }}>{stopA}</Text>
          <Entypo name='arrow-long-right' color='#1f5c87' size={25} />
          <Text style={{ color: theme.text }}>{stopB}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LinesMap', { busNumber, forward: 1 })
        }
      >
        <View style={styles.listItem}>
          <Text style={{ color: theme.text }}>{stopB}</Text>
          <Entypo name='arrow-long-right' color='#1f5c87' size={25} />
          <Text style={{ color: theme.text }}>{stopA}</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <View>
        <View style={[styles.separator, { borderBottomColor: theme.border }]} />

        <View
          style={[
            styles.wrapBusIcon,
            {
              backgroundColor: theme.backgroundColor,
              borderColor: theme.border
            }
          ]}
        >
          <MaterialCommunityIcons
            name='bus'
            color='#1f5c87'
            size={15}
            style={styles.busIcon}
          />

          <Text style={[styles.busNumber, { color: theme.text }]}>
            {busNumber}
          </Text>
        </View>

        <Text style={[styles.from, { color: theme.text }]}>
          {t('lines.from')}
        </Text>

        {direction}

        <View style={styles.changeDirection}>
          <Button
            onPress={changeDirectionHandler}
            text={t('lines.change')}
            buttonColor={theme.buttonColor}
            textColor={theme.buttonText}
            margin={0}
            paddingVertical={4}
            fontSize={12}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={busArray}
        renderItem={({ item }) => (
          <Item
            busNumber={item.RouteNumber}
            stopA={item.StopA}
            stopB={item.StopB}
          />
        )}
        keyExtractor={item => item.RouteNumber}
      />
    </SafeAreaView>
  )
}

export default Lines

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  wrapBusIcon: {
    margin: 2,
    width: 46,
    height: 25,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderBottomColor: 'yellow',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  busIcon: {
    right: 1,
    top: 10,
    paddingRight: 25
  },
  busNumber: {
    top: -8,
    marginLeft: 14,
    fontSize: 12,
    fontWeight: 'bold'
  },
  touchableOpacity: {
    marginLeft: 45,
    padding: 10
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 48
  },
  from: {
    textAlign: 'center',
    top: -10,
    fontWeight: 'bold'
  },
  changeDirection: {
    alignItems: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
