import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableHighlight, Modal, Button, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

function Separator() {
    return <View style={styles.separator} />;
}

function Item({ station, info }) {
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

                <Separator />

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

                            <Button
                                title={t('favorites.modalButtonYes')}
                                onPress={onDeleteHandler}
                                color="red"
                            />
                            {/* <Button
                                title={t('favorites.modalButtonNo')}
                                onPress={() => setModalVisible(!modalVisible)}
                            /> */}

                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.button}>
                                <Text style={styles.buttonText}>{t('favorites.modalButtonNo')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableHighlight>
    );
}

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
            <Text>{t('favorites.title')}</Text>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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

    button: {
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f6ff',
        top: 20
    },
    buttonText: {
        color: '#99b1c2',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 17,
        textAlign: 'center',
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


    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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

export default Favorites