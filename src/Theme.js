import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Theme Context global state.
 * Dark Light mode!
 **/

const themes = {
  dark: {
    backgroundColor: '#3b4657',

    text: '#c9d0d8',
    border: '#4e5a6e',
    shadow: 'white',

    buttonColor: '#4e5a6e',
    buttonText: '#c9d0d8',

    headerBackground: '#242f3e',
    headerColor: '#c9d0d8',

    bottomTabNavBackground: '#242f3e',
    bottomTabNavActive: 'red',
    bottomTabNavInactive: 'gray'
  },

  light: {
    backgroundColor: '#bacfde',

    text: 'black',
    border: 'white',
    shadow: 'black',

    buttonColor: '#c7dceb',
    buttonText: 'black',

    headerBackground: '#ebf7ff',
    headerColor: 'black',

    bottomTabNavBackground: '#ebf7ff',
    bottomTabNavActive: 'red',
    bottomTabNavInactive: 'gray'
  }
}

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}

const ThemeContext = createContext(initialState)

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false) // Default theme is light

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem('BusTimetableDayNight')

      if (value !== null) {
        setDark(JSON.parse(value))
      }
    }
    fetchData()
  }, [])

  // Toggle to set mode.
  const toggle = async () => {
    setDark(!dark)

    await AsyncStorage.setItem('BusTimetableDayNight', JSON.stringify(!dark))
  }

  // Selected theme mode.
  const theme = dark ? themes.dark : themes.light

  return (
    <ThemeContext.Provider
      value={{
        dark,
        theme,
        toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
