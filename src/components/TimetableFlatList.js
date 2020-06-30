import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, Animated, Easing } from 'react-native'
import Constants from 'expo-constants'

/**
 * Timetable FlatList component!
**/
function Item({ title, time, bus, nowText, minText }) {

    // start animation after Flatlist render
    useEffect(() => {
        focusAnimation()

        // Cleanup
        return focus.stopAnimation()

    }, [focusAnimation])

    let focus = new Animated.Value(0)

    // focus animation
    function focusAnimation() {
        focus.setValue(0)
        Animated.timing(focus, {
            toValue: 1,
            duration: 500,
            easing: Easing.bounce,
            useNativeDriver: true
        }).start(() => focusAnimation())
    }

    // apply animation if time is below two minutes or 0 and display 'Now' instead of time.
    // time is number it can be between 0-90: represents minutes.
    const willBeIn = () => {
        if (time <= 2 || 0) {
            return (
                <Animated.View style={[{ opacity: focus }]}>
                    <Text>{nowText}</Text>
                </Animated.View>
            )
        }
        else {
            return (
                <Text>{time} {minText}</Text>
            )
        }
    }

    return (
        <View style={styles.listItemView}>
            <Text>{bus}</Text>
            <Text style={styles.title}>{title}</Text>
            {willBeIn()}
        </View>
    )
}

/**
 * FlatList Component
**/
const TimetableFlatList = ({ setData, refreshHandler, nowText, minText }) => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={setData}
                renderItem={({ item }) => (
                    <Item
                        title={item.DestinationStopName}
                        time={item.ArrivalTime}
                        bus={item.RouteNumber}
                        nowText={nowText}
                        minText={minText}
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
