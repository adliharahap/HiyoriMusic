import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePages from './src/pages/HomePages';
import Wallpaperpages from './src/pages/Wallpaperpages';
import MusicPages from './src/pages/MusicPages';
import SearchMusicPages from './src/pages/SearchMusicPages';
import PlaylistPages from './src/pages/PlaylistPages';
import SplashScreenPages from './src/pages/SplashScreenPages';
import OnboardingScreen from './src/pages/onboarding/OnboardingScreen';
import NameInputScreen from './src/pages/onboarding/NameInputScreen';
import FIleAksesDenied from './src/pages/FileAksesDenied/FIleAksesDenied';
import FileAksesBlocked from './src/pages/FileAksesDenied/FileAksesBlocked';

const Stack = createNativeStackNavigator();

const routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
                <Stack.Screen name='SplashScreen' component={SplashScreenPages} />
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='AksesDenied' component={FIleAksesDenied} />
                <Stack.Screen name='AksesBLocked' component={FileAksesBlocked} />
                <Stack.Screen name='InputName' component={NameInputScreen} />
                <Stack.Screen name='Home' component={HomePages} />
                <Stack.Screen name='Music' component={MusicPages} />
                <Stack.Screen name='SearchMusic' component={SearchMusicPages} />
                <Stack.Screen name='Playlist' component={PlaylistPages} />
                <Stack.Screen name="Wallpaperpages" component={Wallpaperpages} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default routing;