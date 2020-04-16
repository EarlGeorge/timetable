import React from 'react'
import Routes from './src/Routes'
import { I18nextProvider } from 'react-i18next'
import i18next from './src/localization/i18next'

const App = () => (<I18nextProvider i18n={i18next}><Routes /></I18nextProvider>)

export default App
