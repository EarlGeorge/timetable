import React, { useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

// Screens 
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
                    headerTitle: t('routes.favorites'),
                    tabBarLabel: t('routes.favorites'),
                    title: t('routes.favorites'),
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="staro" color={color} size={size} style={{ ...styles.containerStyle }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Stations"
                component={Stations}
                options={ //({ route }) => ({ title: route.params.name }),
                    {
                        tabBarLabel: t('routes.stations'),
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
                    tabBarLabel: t('routes.stations'),
                    title: t('routes.stations'),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="dots-three-horizontal" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="About"
                component={About}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="info" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

{/* <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <View>
            <Icon
              onPress={() => navigation.toggleDrawer()}
              name="menu"
            />
          </View>
        ),
      }}
/> */}


const Route = () => {
    const { t } = useTranslation()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyTabs" component={MyTabs} options={{
                    headerTitle: t('routes.stations'),
                    // headerShown: false,
                    headerMode: "float",
                    mode: "modal"
                }} />
                <Stack.Screen name="Timetable" component={Timetable} options={{ title: t('timetable.title') }} />
                <Stack.Screen
                    name="Feedback"
                    component={Feedback}
                    options={{ headerTitle: t('routes.feedback') }}
                />
                 <Stack.Screen name="LinesMap" component={LinesMap} options={{ title: t('timetable.title') }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route

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
