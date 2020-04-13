import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

import enBus from '../EN-BUS.json'
import geBus from '../GEO-BUS.json'

function Item({ busNumber, stopA, stopB }) {
    const { t } = useTranslation()
    const navigation = useNavigation()

    const [boolean, setBoolean] = useState(true)
    //  Change Bus lines Direction
    const changeDirectrion = () => setBoolean(!boolean)

    const directrion = boolean ?
        (<TouchableOpacity onPress={() => { navigation.navigate('LinesMap', { busNumber, forward: 0 }) }} >
            <View style={styles.listItem}>
                <Text>{stopA}</Text>
                <Entypo name="arrow-long-right" color='#1f5c87' size={25} style={styles.directrionIcon} />
                <Text>{stopB}</Text>
            </View>
        </TouchableOpacity>)
        :
        (<TouchableOpacity onPress={() => { navigation.navigate('LinesMap', { busNumber, forward: 1 }) }} >
            <View style={styles.listItem}>
                <Text>{stopB}</Text>
                <Entypo name="arrow-long-right" color='#1f5c87' size={25} style={styles.directrionIcon} />
                <Text>{stopA}</Text>
            </View>
        </TouchableOpacity>)

    return (
        <View>

            <View style={styles.separator} />

            <View style={styles.wrapBusIcon} >
                <MaterialCommunityIcons name="bus" color='#1f5c87' size={15} style={styles.busIcon} />
                <Text style={styles.busNumber}>{busNumber}</Text>
            </View>

            <Text style={styles.from}>{t('lines.from')}</Text>

            {directrion}

            <TouchableOpacity onPress={changeDirectrion}>
                <Text style={styles.changeDirection}>{t('lines.change')}</Text>
            </TouchableOpacity>

        </View>
    );
}

// Bus List screen 
const Lines = () => {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()


    let [db, setDb] = useState({
        busArray: [],
    })

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setDb({ busArray: i18n.language == 'en' ? (enBus.Bus) : (geBus.Bus) })
        })

        // Cleanup
        return unsubscribe

    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Text style={styles.bus}>{t('lines.bus')}</Text>
                <Text style={styles.dir}>{t('lines.direction')}</Text>
            </View>

            <FlatList
                data={db.busArray}
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
        backgroundColor: "#bacfde",
        justifyContent: 'space-between',
    },
    bus: {
        top: 20,
        textAlign: 'left',
        marginHorizontal: 10,
    },
    dir: {
        alignSelf: 'center'
    },
    wrapBusIcon: {
        margin: 2,
        width: 46,
        height: 25,
        borderColor: 'white',
        borderStyle: 'solid',
        backgroundColor: '#c7dceb',
        borderWidth: 1.5,
        borderBottomColor: 'yellow',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busIcon: {
        right: 1,
        top: 10,
        paddingRight: 25,
    },
    busNumber: {
        top: -10,
        marginLeft: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    touchableOpacity: {
        marginLeft: 45,
        padding: 10,
    },
    listItem: {
        flexDirection: "column",
        alignItems: 'center',
        marginVertical: 47,
    },
    from: {
        textAlign: 'center',
        color: 'black',
        top: -10,
        fontWeight: 'bold',
    },
    changeDirection: {
        color: '#1f5c87',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

