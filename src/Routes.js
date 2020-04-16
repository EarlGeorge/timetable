import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

/**
 * App Screens 
**/
import Favorites from './screens/Favorites'
import Stations from './screens/Stations'
import About from './screens/About'
import Timetable from './screens/Timetable'
import Feedback from './screens/Feedback'
import LinesMap from './screens/LinesMap'
import Lines from './screens/Lines'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs() {
    const { t } = useTranslation()

    return (
        <Tab.Navigator
            initialRouteName="Stations"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                tabBarOptions={styles.containerStyle}
                options={{
                    title: t('routes.favorites'),
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="staro" color={color} size={size} style={{ ...styles.containerStyle }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Stations"
                component={Stations}
                options={{
                    title: t('routes.stations'),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="location" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Lines"
                component={Lines}
                options={{
                    title: t('routes.lines'),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="dots-three-horizontal" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="About"
                component={About}
                options={{
                    title: t('routes.about'),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="info" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

function getHeaderTitle(route) {
    const { t } = useTranslation()

    // Accessing the tab navigator's state using `route.state`
    const routeName = route.state

        ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
        : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
        route.params?.screen || 'Stations'

    switch (routeName) {
        case 'Stations':
            return t('routes.stations')
        case 'Favorites':
            return t('routes.favorites')
        case 'Lines':
            return t('routes.lines')
        case 'About':
            return t('routes.about')
    }
}

/**
 * App root: *
**/
export default Routes = () => {
    const { t } = useTranslation()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyTabs" component={MyTabs} options={({ route }) => ({

                    headerStyle: { backgroundColor: 'white' },
                    // headerShown: false,
                    headerBackTitle: getHeaderTitle(route),

                    headerTitle: getHeaderTitle(route)

                })} />
                <Stack.Screen name="Timetable" component={Timetable} options={{ title: t('routes.timetable') }} />
                <Stack.Screen name="Feedback" component={Feedback} options={{ title: t('routes.feedback') }} />
                <Stack.Screen name="LinesMap" component={LinesMap} options={{ title: t('routes.linesMap') }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#ddd',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 1, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    }
})
