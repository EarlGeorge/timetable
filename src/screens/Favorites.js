import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Picker, AsyncStorage } from 'react-native'
import { useTranslation } from 'react-i18next'

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const Favorites = () => {
    const { t, i18n } = useTranslation()

    let [list, setList] = useState()

    useEffect(() => {

        AsyncStorage.getItem('TestFavorite')
            .then(res => setList(JSON.parse(res)))
            
            .catch(error => console.log('Couldnt load!' + error))
                // console.log(list)
    }, [])

    const showFavorite = () => {
        console.log(list)
    }

    const listview
    if (list !== null) {
        listview = (<FlatList
            data={list}
            renderItem={({ item }) => <Item title={item} />}
            keyExtractor={item => item}
        />)
    }


    /**
     * change App language and store it in AsyncStorage
     */
    const [appLanguage, setAppLanguage] = useState()

    const listLanguage = [
        { key: 'en', label: 'English 🇬🇧' },
        { key: 'ge', label: 'ქართული 🇬🇪' },
    ]
    const onChangeLanguage = async (languageSelected) => {
        setAppLanguage(languageSelected)
        AsyncStorage.setItem('APPLanguage', JSON.stringify(languageSelected))
        await i18n.changeLanguage(languageSelected)
    }


    return (
        <View style={styles.container}>
            <Text>{t('timetable.title')}</Text>
            <Picker
                style={{ height: 250, width: 250 }}
                selectedValue={appLanguage}
                onValueChange={onChangeLanguage}
            >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label={languageItem.label} />
                })}
            </Picker>

            {/* { listview }  */}
        
            <Button
                onPress={showFavorite}
                title="show F"
                color="#841584"
                accessibilityLabel=""
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#bacfde"
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
})

export default Favorites