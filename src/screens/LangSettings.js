import React, {useContext} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {LocalizationContext} from '../localization/LocalizationContext'

const LangSettings = ({navigation}) => {
  const {translations, appLanguage, setAppLanguage} = useContext(
    LocalizationContext,
  )

  const handleSetLanguage = async language => {
    setAppLanguage(language)
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>{translations.BACK}</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center'}}>
        {translations.LANGUAGE_SETTINGS}
      </Text>

      {/* {translations.getAvailableLanguages().map(item => (
        <View key={item}>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => handleSetLanguage(item)}>
            <Text style={{fontSize: 16}}>{item}</Text>
            {appLanguage === item ? (
              <Text style={{marginLeft: 30}}>√</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      ))} */}
    </View>
  )
}

export default LangSettings
