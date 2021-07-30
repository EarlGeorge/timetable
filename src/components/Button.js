import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export default Button = ({
  text,
  onPress,
  buttonColor,
  textColor,
  margin,
  paddingVertical,
  fontSize
}) => {
  return (
    <View style={{ margin }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          { backgroundColor: buttonColor, paddingVertical }
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: textColor, paddingVertical, fontSize }
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 7
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})
