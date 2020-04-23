import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableHighlight, Modal, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'


const Item = ({ station, info }) => {
    const navigation = useNavigation()

    const { t } = useTranslation()

    const [modalVisible, setModalVisible] = useState(false)

    const onDeleteHandler = () => {

        AsyncStorage.getItem('TestFavorite', async (err, result) => {
            if (result !== null) {

                let array = (JSON.parse(result))
                let deleteItem = array.filter(item => item.station !== station)
                await AsyncStorage.setItem('TestFavorite', JSON.stringify(deleteItem))
            }
        })

        setModalVisible(!modalVisible)
    }

    return (
        <TouchableHighlight style={styles.touchableHighlight}
            onPress={() => { navigation.navigate('Timetable', { stationTimetableId: station }) }}
            onLongPress={() => setModalVisible(true)}
            delayLongPress={25}
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

                            <Text>{station}</Text>

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
    const { t } = useTranslation()
    const navigation = useNavigation()

    const [list, setList] = useState()

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('TestFavorite')
                .then(res => setList(JSON.parse(res)))
                .catch(error => console.log('Couldnt load!' + error))
        })

        // Cleanup
        return unsubscribe

    }, [navigation])


    const onRefreshHandler = () => {
        setRefreshing(true)

        AsyncStorage.getItem('TestFavorite')
            .then(res => setList(JSON.parse(res)))
            .then(() => { setRefreshing(false) })
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) => <Item info={item.info} station={item.station} />}
                keyExtractor={item => item.station}
                onRefresh={onRefreshHandler}
                refreshing={refreshing}
            />
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButtonYes: {
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
        marginBottom: 15,
        textAlign: "center"
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})
