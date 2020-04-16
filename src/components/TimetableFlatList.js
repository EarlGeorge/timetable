import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, Animated, Easing } from 'react-native'
import Constants from 'expo-constants'


function Item({ title, time, bus }) {

    // Side effects
    useEffect(() => {
        // start animation after Flatlist render
        focusAnimation()

        // Cleanup
        return focus.stopAnimation()

    }, [focusAnimation])

    let focus = new Animated.Value(0)
    
    // Item time animation
    function focusAnimation() {
        focus.setValue(0)
        Animated.timing(focus, {
            toValue: 1,
            duration: 500,
            easing: Easing.bounce,
            useNativeDriver: true
        }).start(() => focusAnimation())
    }

    // apply animation if time is only below two minutes
    let willBeIn = time
    if (time <= 2 || 0) {
        willBeIn = (
            <Animated.View style={[{ opacity: focus }]}>
                <Text>Now</Text>
            </Animated.View>
        )
    } else {
        willBeIn = (
            <Text>in {time} min</Text>
        )
    }

    return (
        <View style={styles.listItemView}>
            <Text>{bus}</Text>
            <Text style={styles.title}>{title}</Text>
            {willBeIn}
        </View>
    )
}

/**
 * FlatList Component
**/
const TimetableFlatList = ({ setData, refreshHandler }) => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={setData}
                renderItem={({ item }) => (
                    <Item
                        title={item.DestinationStopName}
                        time={item.ArrivalTime}
                        bus={item.RouteNumber}
                    />
                )}
                keyExtractor={item => item.RouteNumber}
                refreshControl={refreshHandler}
            />
        </SafeAreaView>
    )
}

export default TimetableFlatList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 15,
    },
    title: {
        fontSize: 11,
    },
})
