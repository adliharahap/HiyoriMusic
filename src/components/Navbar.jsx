import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePages from '../pages/HomePages';
import MusicPages from '../pages/MusicPages';
import SearchMusicPages from '../pages/SearchMusicPages';
import PlaylistPages from '../pages/PlaylistPages';
import { Svg, Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 60,
                paddingHorizontal: 5,
                paddingVertical: 5,
                paddingTop: 0,
                backgroundColor: 'rgba(20,20,30,1)',
                position: 'absolute',
                borderTopWidth: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
            },
            tabBarIconStyle: {
                width: 28,
                height: 28,
            },
        })}>
            <Tab.Screen name="Home" component={HomePages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Search" component={SearchMusicPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Music" component={MusicPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Playlist" component={PlaylistPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></Svg>
                )
            }}}/>
        </Tab.Navigator>
    );
}

export default Navbar;