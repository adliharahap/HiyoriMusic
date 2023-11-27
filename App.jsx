import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryPages from './src/pages/LibrariesPages';
import Homepages from './src/pages/Homepages';

const Stack = createNativeStackNavigator();

const routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
                <Stack.Screen name='Home' component={Homepages} />
                <Stack.Screen name="Library" component={LibraryPages} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default routing;