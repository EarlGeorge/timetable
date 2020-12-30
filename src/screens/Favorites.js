import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Modal, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons'

// FlatList Items
const Item = ({ station, info }) => {
    const navigation = useNavigation()
    const { t } = useTranslation()

    const [modalVisible, setModalVisible] = useState(false)

    const onDeleteHandler = async () => {
        const result = await AsyncStorage.getItem('TestFavorite')
        if (result !== null) {
            const array = await JSON.parse(result)
            const deleteItem = await array.filter(item => item.station !== station)
            AsyncStorage.setItem('TestFavorite', JSON.stringify(deleteItem))
        }
        setModalVisible(!modalVisible)
    }

    return (
        <TouchableHighlight style={styles.touchableHighlight}
            onPress={() => { navigation.navigate('Timetable', { stationTimetableId: station }) }}
            onLongPress={() => setModalVisible(true)}
            activeOpacity={0.1}
            underlayColor={'rgba(186, 207, 222, 0.7)'}
        >
            <View style={styles.item}>
                <View style={styles.separator} />
                <Text style={styles.title}>{info}</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={styles.modalText}>{t('favorites.modal')}</Text>

                            <Text style={styles.stationID}>{station}</Text>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={onDeleteHandler} style={styles.modalButtonYes}>
                                    <Text style={styles.modalButtonYesText}>{t('favorites.modalButtonYes')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.modalButtonNo}>
                                    <Text style={styles.modalButtonNoText}>{t('favorites.modalButtonNo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableHighlight>
    );
}

/**
 * Favorite Bus stations screen
**/
const Favorites = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()

    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            const result = await AsyncStorage.getItem('TestFavorite')
            if (result == null) return
            else {
                setList(JSON.parse(result))
            }
        })

        // Cleanup
        return unsubscribe

    }, [navigation])


    const onRefreshHandler = async () => {
        setRefreshing(true)

        const result = await AsyncStorage.getItem('TestFavorite')
        setList(JSON.parse(result))

        setRefreshing(false)
    }

    return (list.length > 0 ?
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) => <Item info={item.info} station={item.station} />}
                keyExtractor={item => item.station}
                onRefresh={onRefreshHandler}
                refreshing={refreshing}
            />
        </View>
        :
        <View style={styles.container}>
            <View style={styles.emptyList}>
                <AntDesign name="staro"
                    color='white'
                    size={45}
                />
                <Text>{t('favorites.empty')}</Text>
            </View>
        </View>
    )
}
export default Favorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde"
    },
    touchableHighlight: {
        alignItems: "center",
        padding: 10
    },
    item: {
        width: '100%'
    },
    title: {
        margin: 1,
        fontSize: 15,
    },
    emptyList: {
        alignItems: 'center',
        top: 200,
        paddingHorizontal: 20
    },
    modalView: {
        top: 50,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButtons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalButtonYes: {
        margin: 10,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f6ff',
    },
    modalButtonYesText: {
        color: 'red',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 17,
        textAlign: 'center',
    },
    modalButtonNo: {
        margin: 10,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f6ff',
    },
    modalButtonNoText: {
        color: '#99b1c2',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 17,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 30,
        textAlign: "center",
    },
    stationID: {
        marginBottom: 30,
        textAlign: "center",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})
