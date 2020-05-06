import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default Button = ({ text, onPress, buttonColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonColor,  }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  }
})