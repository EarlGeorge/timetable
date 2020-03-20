import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// List of all bus station numbers 
const Timetable = ({ route }) => {
    
    const { post } = route.params
    console.log(post + 'it is Timetable')

    // let [points, setPoints] = useState({})

    return (
        <View style={styles.container}>
            <Text>Timetable {post}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bacfde"
    }
})

export default Timetable
