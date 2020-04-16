import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default Button = ({ text, onPress, buttonColor, textColor, buttonBRadius }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonColor, borderRadius: buttonBRadius }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    // borderRadius: 15,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: '#99b1c2',
  },
  buttonText: {
    // color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    // fontSize: 17,
    textAlign: 'center',
  }
})