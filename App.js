import 'react-native-gesture-handler'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { enableScreens } from 'react-native-screens'
import i18next from './src/localization/i18next'
import { ThemeProvider } from './src/Theme'
import Routes from './src/Routes'

enableScreens(false)

const App = () => (
  <I18nextProvider i18n={i18next}>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </I18nextProvider>
)

export default App
