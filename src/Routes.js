import React from 'react'
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
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

/**
 * Bottom Tab Nav 
**/
const BottomTab = () => {

    const Tab = createBottomTabNavigator()
    const { t } = useTranslation()

    return (
        <Tab.Navigator
            initialRouteName="Stations"
            tabBarOptions={{
                activeTintColor: 'red',
                style: { backgroundColor: '#f7fcff' }
            }}
        >
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: t('routes.favorites'),
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="staro" color={color} size={size} />
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

/**
 * App root: *
**/
export default Routes = () => {

    const Stack = createStackNavigator()
    const { t } = useTranslation()

    const getHeaderTitle = (route) => {

        // Accessing the tab navigator's state using 'getFocusedRouteNameFromRoute'

        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, default is set to 'Stations'
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stations'

        switch (routeName) {
            case 'Stations':
                return t('routes.stationsHeader')
            case 'Favorites':
                return t('routes.favoritesHeader')
            case 'Lines':
                return t('routes.linesHeader')
            case 'About':
                return t('routes.aboutHeader')
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ebf7ff' }, headerTitleAlign: 'center' }} >
                <Stack.Screen name="BottomTab" component={BottomTab} options={({ route }) => ({
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

