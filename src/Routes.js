import React, { useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { NavigationContainer, DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

import MapDemo from './components/MapDemo'

// Screens 
import Favorites from './screens/Favorites'
import Stations from './screens/Stations'
import About from './screens/About'
import Timetable from './screens/Timetable'


const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const Drawerr = ({ navigation }) => {


    useFocusEffect(
        React.useCallback(() => {
            alert('Screen was focused');
            // Do something when the screen is focused
            return () => {
                alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    useEffect(() => {
        let unsubscribe = navigation.addListener('tabPress', () => {
            // Prevent default behavior
            // e.preventDefault();
            navigation.dispatch(DrawerActions.toggleDrawer());

            // alert('Default behavior prevented');
            // Do something manually
            // ...
        });

        return unsubscribe;
    }, [navigation]);
    // tabLongPress: (navigation) => {
    //     //your code and other stuff 
    //     navigation.dispatch(DrawerActions.toggleDrawer());
    // }

    return (
        <Drawer.Navigator initialRouteName="Stations" >
            <Drawer.Screen
                name="About"
                component={About}
                options={{
                    drawerIcon: () => <AntDesign name="swap" size={37} color="#d5d9de" />
                }}
            />
            <Drawer.Screen
                name="Bus Map Demo"
                component={MapDemo}
                options={{
                    drawerIcon: () => <MaterialCommunityIcons name="earth" size={37} color="#d5d9de" />
                }}
            />
            <Drawer.Screen
                name="Stations"
                component={Stations}
                options={{
                    drawerIcon: () => <Entypo name="info" size={37} color="#d5d9de" />
                }}
            />
            <Drawer.Screen
                name="Timetable"
                component={Timetable}
                options={{
                    drawerIcon: () => <Entypo name="bookmark" size={37} color="#d5d9de" />
                }}
            />
        </Drawer.Navigator>
    );
}

function MyTabs() {
    const navigation = useNavigation()

    return (
        <Tab.Navigator
            initialRouteName="Stations"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Feed"
                component={Favorites}
                tabBarOptions={styles.containerStyle}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} style={{ ...styles.containerStyle }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Stations"
                component={Stations}
                options={{
                    tabBarLabel: 'Stations',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="location" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Favorites}
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
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyTabs" component={MyTabs} options={{
                    headerTitle: 'Map',
                    headerMode: "float",
                    mode: "modal"
                }} />
                <Stack.Screen name="Timetable" component={Timetable} />
                <Stack.Screen name="Drawerr" component={Drawerr} />
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
