import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'


const Favorites = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Favorites</Text>
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
    info: {
        padding: 25,
        fontSize: 15,
    }
})

export default Favorites