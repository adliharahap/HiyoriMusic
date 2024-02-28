import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wallpaperpages from './src/pages/Wallpaperpages';
import SplashScreenPages from './src/pages/SplashScreenPages';
import OnboardingScreen from './src/pages/onboarding/OnboardingScreen';
import NameInputScreen from './src/pages/onboarding/NameInputScreen';
import FIleAksesDenied from './src/pages/FileAksesDenied/FIleAksesDenied';
import FileAksesBlocked from './src/pages/FileAksesDenied/FileAksesBlocked';
import Navbar from './src/components/Navbar';
import PlayMusicPages from './src/pages/playMusic/PlayMusicPages';

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
                <Stack.Screen name='MainScreen' component={Navbar} />
                <Stack.Screen name="Wallpaperpages" component={Wallpaperpages} />
                <Stack.Screen name="Musicplay" component={PlayMusicPages} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default routing;