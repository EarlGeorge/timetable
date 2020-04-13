import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Item = ({ 
    busNumber,
    handlePageNavigationForward,
    handlePageNavigationBackward,
    stopA,
    stopB,
    textFrom,
    textTill }) => {

    return (
        <View style={styles.container}>

            <View style={styles.separator} />

            <View style={styles.wrapIcon} >
                <MaterialCommunityIcons name="bus" color='#1f5c87' size={15} style={styles.busIcon} />
                <Text style={styles.busNumber}>{busNumber}</Text>
            </View>

            <TouchableOpacity onPress={handlePageNavigationForward}>
                <Text style={styles.touchableOpacity}> {textFrom} {stopA}  -> {textTill} {stopB}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePageNavigationBackward}>
                <Text style={styles.touchableOpacity}> {textFrom} {stopB}  -> {textTill} {stopA}</Text>
            </TouchableOpacity>
        </View>
    );
}


/**
 * Bus lines FlatList: stateless component
**/
export default LinesFlatList = ({ setData, handlePageNavigationForward, handlePageNavigationBackward, textFrom, textTill, }) => {
    return (
        <FlatList
            data={setData}
            renderItem={({ item }) => (
                <Item
                    busNumber={item.RouteNumber}
                    stopA={item.StopA}
                    stopB={item.StopB}
                    handlePageNavigationForward={handlePageNavigationForward}
                    handlePageNavigationBackward={handlePageNavigationBackward}
                    textFrom={textFrom}
                    textTill={textTill}
                />
            )}
            keyExtractor={item => item.RouteNumber}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde",
    },
    wrapIcon: {
        margin: 2,
        width: 46,
        height: 25,
        borderColor: 'white',
        borderStyle: 'solid',
        backgroundColor: "#c7dceb",
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
        // alignSelf: 'flex-end',
    },
    busNumber: {
        top: -10,
        marginLeft: 14,
        // fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    touchableOpacity: {
        marginLeft: 45,
        padding: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})