import React from 'react';
import { View, Text, Button } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
    // const navigation = useNavigation();

    // const handleGrantPermissions = async () => {
    //     const result = await request([
    //     PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    //     PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    //     ]);

    //     if (result.every(status => status === RESULTS.GRANTED)) {
    //     // Izin diberikan, tandai bahwa Onboarding sudah dilakukan
    //     AsyncStorage.setItem('onboardingStatus', 'done');
    //     // Arahkan ke HomeScreen
    //     navigation.replace('Home');
    //     } else {
    //     // Izin tetap ditolak, mungkin berikan pesan atau tindakan tambahan
    //     console.log('Izin masih ditolak');
    //     // Ganti dengan navigasi ke screen lain jika diperlukan
    //     navigation.replace('OtherScreen');
    //     }
    // };

    return (
        <>
            <View>
                
            </View>
        </>
    );
};

export default OnboardingScreen;