import React, { useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { NavigationContainer, DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

// Screens 
import Favorites from './screens/Favorites'
import Stations from './screens/Stations'
import About from './screens/About'
import Timetable from './screens/Timetable'
import Feedback from './screens/Feedback'


const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const Drawerr = () => {
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            // alert('Screen was focused');
            // Do something when the screen is focused

            let unsubscribe = navigation.addListener('tabPress', () => {
                navigation.dispatch(DrawerActions.toggleDrawer());
            })
            return () => {
                // alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                unsubscribe;
            };
        }, [navigation])
    );

    // useEffect(() => {
    //     let unsubscribe = navigation.addListener('tabPress', () => {
    //         // Prevent default behavior
    //         // e.preventDefault();
    //         navigation.dispatch(DrawerActions.toggleDrawer());

    //         // alert('Default behavior prevented');
    //         // Do something manually
    //         // ...
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    // tabLongPress: (navigation) => {
    //     //your code and other stuff 
    //     navigation.dispatch(DrawerActions.toggleDrawer());
    // }

    return (
        <Drawer.Navigator  >
            <Drawer.Screen
                name="About"
                component={About}
                options={{
                    drawerIcon: () => <AntDesign name="swap" size={37} color="#d5d9de" />
                }}
            />
            {/* <Drawer.Screen
                name="Stations"
                component={Stations}
                options={{
                    drawerIcon: () => <Entypo name="info" size={37} color="#d5d9de" />
                }}
            /> */}
            {/* <Drawer.Screen
                name="Timetable"
                component={Timetable}
                options={{
                    drawerIcon: () => <Entypo name="bookmark" size={37} color="#d5d9de" />
                }}
            /> */}
        </Drawer.Navigator>
    );
}

function MyTabs() {
    const navigation = useNavigation()
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
                    headerTitle: `${t('routes.favorites')}`,
                    tabBarLabel: `${t('routes.favorites')}`,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} style={{ ...styles.containerStyle }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Stations"
                component={Stations}
                options={{
                    tabBarLabel: `${t('routes.stations')}`,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="location" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Drawerr}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="swap" color={color} size={size} onPress={() => navigation.toggleDrawer()} />
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
                    headerTitle: `${t('routes.stations')}`,
                    // headerShown: false,
                    headerMode: "float",
                    mode: "modal"
                }} />
                <Stack.Screen name="Timetable" component={Timetable} options={{ title: t('timetable.title') }} />
                <Stack.Screen name="Drawerr" component={Drawerr} />
                <Stack.Screen
                    name="Feedback"
                    component={Feedback}
                    options={{ headerTitle: `${t('routes.feedback')}`}}
                />
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

export default Route
