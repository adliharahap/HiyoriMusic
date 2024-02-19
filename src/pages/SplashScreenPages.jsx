import { View, Text, Image, Button, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { GetMusicFiles } from '../utils/GetMusicFiles_Service';
import CheckMetadataMusicDb from '../utils/CheckMetadataMusiDb';
import cleanUpDatabaseIfMusicDoesntExits from '../utils/cleanUpDatabaseIfMusicDoesntExits';
import { openDatabaseConnection } from '../utils/databases/database';


const SplashScreenPages = () => {
    const navigation = useNavigation();
    let mappingFinished = false;
    AsyncStorage.setItem('musicData', "undefined");

    const fetchData = async () => {
        try {
            await openDatabaseConnection();
            await cleanUpDatabaseIfMusicDoesntExits();
            await GetMusicFiles();
            setTimeout(() => {
                checkPermissionsAndNavigate();
            }, 1500);
        } catch (error) {
            console.error('Error fetching music files:', error);
          // Handle error appropriately
        }
    };

    useEffect(() => {
        // deleteAllData();
        fetchData();
    }, []);

    const checkPermissionsAndNavigate = async () => {
        // Periksa status Onboarding dari penyimpanan lokal
        const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');

        if (onboardingStatus === 'done') {
            // Onboarding sudah dilakukan, periksa izin dan arahkan ke HomeScreen
            const readPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            const writePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

            if (readPermission === RESULTS.GRANTED && writePermission === RESULTS.GRANTED) {
                try {
                    const getData = await AsyncStorage.getItem('musicData');
                    const data = JSON.parse(getData);
                    const keys = Object.keys(data);
                    // console.log(data);
                    await Promise.all(keys.map(async (path, index) => {
                        await CheckMetadataMusicDb(path);
                        // console.log(index);
                    }));
                    mappingFinished = true;

                    if (mappingFinished) {
                        setTimeout(() => {
                            navigation.replace('MainScreen');
                        }, 1500);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                if(readPermission === RESULTS.DENIED && writePermission === RESULTS.DENIED) {
                    navigation.replace('AksesDenied');
                }else if(readPermission === RESULTS.BLOCKED && writePermission === RESULTS.BLOCKED) {
                    navigation.replace('AksesDenied');
                }
            }
        } else {
            // Onboarding belum dilakukan, arahkan ke OnboardingScreen
            navigation.replace('Onboarding');
        }
    };

    // const handleResetOnboarding = async () => {
    //     // Hapus status Onboarding dari penyimpanan lokal
    //     await AsyncStorage.removeItem('onboardingStatus');
    //     console.log('Status Onboarding di-reset');
    // };

    return (
        <>
            <View style={{backgroundColor: 'rgb(15, 15, 15)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../img/Favorite-music.jpeg')} style={{height: 130, width: 130, borderRadius: 100,}} />
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center',paddingTop: 3}}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 30}}>Hiyori Music</Text>
                    </View>
                </View>

                <View style={{position: 'absolute', bottom: 0, paddingBottom: 25, opacity: 0.6}}>
                    <View style={{alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'Poppins-Light'}}>Created by</Text>
                        <Text style={{fontFamily: 'Poppins-Light'}}>Adli Rahman Harun Harahap</Text>
                    </View>
                </View>
                {/* <Button title='reset onboarding' onPress={handleResetOnboarding}></Button> */}
            </View>
        </>
    );
};

export default SplashScreenPages;