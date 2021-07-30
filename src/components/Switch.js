import React, { useEffect } from 'react'
import { Animated, Easing, StyleSheet, View, Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Switch = ({ isOn, onToggle }) => {
  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
  }, [animatedValue, isOn])

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 27]
  })

  const background = isOn ? '#4f5f78' : '#97b9d2'
  const toggle = isOn ? '#c4d3e0' : '#f5dd4b'
  const border = isOn ? 'white' : '#d7b04e'
  const borderWidth = isOn ? (Platform.OS === 'android' ? 0.8 : null) : 1.1
  const shadow = isOn ? 'white' : '#97b9d2'

  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View style={[styles.switchContainer, { backgroundColor: background }]}>
        <Animated.View
          style={[
            styles.switchWheel,
            {
              transform: [{ translateX: moveToggle }],
              borderColor: border,
              borderWidth: borderWidth,
              backgroundColor: toggle,
              shadowColor: shadow
            }
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Switch

const styles = StyleSheet.create({
  switchContainer: {
    width: 52,
    height: 29,
    borderRadius: 20,
    justifyContent: 'center'
  },
  switchWheel: {
    width: 21,
    height: 21,
    borderRadius: 12.5,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4
  }
})
