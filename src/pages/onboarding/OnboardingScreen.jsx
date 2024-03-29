import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { check ,request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from './Notification';


const OnboardingScreen = () => {
    
    const OnboardingData = [
        {
            title: "Selamat Datang!",
            description: "Selamat Datang di Hiyori Music, Teman Musik Terbaikmu! Terima kasih telah memilih petualangan musik bersama kami. Bersiaplah untuk pengalaman mendengarkan musik yang luar biasa!",
            urlimg: require('./Onboarding-Images/welcome2.png'),
        },
        {
            title: "Tuliskan Nama Kamu",
            description: "Mari kita kenali satu sama lain. Silakan masukkan nama Kamu di bawah ini agar kami dapat memberikan pengalaman yang lebih personal.",
            urlimg: require('./Onboarding-Images/yourname.jpeg'),
        },
        {
            title: "Izin Akses File",
            description: "Untuk memberikan pengalaman mendengarkan musik offline yang optimal, kami memerlukan izin untuk mengakses file di perangkat Kamu. Jangan khawatir, privasi Kamu adalah prioritas kami.",
            urlimg: require('./Onboarding-Images/izinakses2.jpeg'),
        },
        {
            title: "Hore! Siap Menikmati",
            description: "Sekarang Kamu siap untuk mengeksplorasi dan menikmati musik tanpa koneksi internet. Kami sangat berharap kamu menemukan playlist favorit dan merasakan pengalaman musik yang luar biasa.",
            urlimg: require('./Onboarding-Images/terimakasih.jpeg'),
        },
    ];

    const [OnboardingData1, OnboardingData2, OnboardingData3, OnboardingData4] = OnboardingData;
    const Componentdata = [
        <OnboardingComponent title={OnboardingData1.title} description={OnboardingData1.description} urlimg={OnboardingData1.urlimg} />,
        <OnboardingComponent title={OnboardingData2.title} description={OnboardingData2.description} urlimg={OnboardingData2.urlimg}/>,
        <OnboardingComponent title={OnboardingData3.title} description={OnboardingData3.description} urlimg={OnboardingData3.urlimg}/>,
        <OnboardingComponent title={OnboardingData4.title} description={OnboardingData4.description} urlimg={OnboardingData4.urlimg}/>,
    ];
    const width = Dimensions.get('window').width;

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <Text style={{color: '#000000', fontFamily: 'Poppins-Black', fontSize: 24}}>Hiyori Music</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Carousel
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                data={Componentdata}
                width={width}
                autoPlay={false}
                loop={false}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={{flex: 1, overflow: 'hidden'}}>
                        {item}
                    </View>
                )}
                />
            </View>

            {/* carousel Button */}
            {/* <View style={{position: 'absolute', height: 80, width: '100%', bottom: 0, paddingHorizontal: 20}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0} style={{height: 50, width: 50, borderRadius: 100, backgroundColor: 'rgba(128,128,128, 0.5)', justifyContent: 'center', alignItems: 'center', shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3}}>
                        <Svg height="44" viewBox="0 -960 960 960" width="44" fill="white"><Path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></Svg>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} disabled={currentIndex === OnboardingData.length - 1} style={{height: 50, width: 50, borderRadius: 100, backgroundColor: 'rgba(128,128,128, 0.5)', justifyContent: 'center', alignItems: 'center', shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3}}>
                        <Svg height="44" viewBox="0 -960 960 960" width="44" fill="white"><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
};

const OnboardingComponent = (props) => {
    const navigation = useNavigation();
    const {title, description, urlimg} = props;
    const [TampilkanButtonInputNama] = useState("Tuliskan Nama Kamu");
    const [TampilkanButtonIzinFile] = useState("Izin Akses File");
    const [TampilkanButtonGetStarted] = useState("Hore! Siap Menikmati");
    const [NameComplete, SetIfNameComplete] = useState("#001B79");
    const [ButtonUpdateName, setIFNameUpdate] = useState("Tuliskan Nama");
    const [IzinFileComplete, SetiIfizinFileComplete] = useState('#001B79');
    const [IzinBtnUpdateName, SetIzinBtnUpdateName] = useState('Berikan Izin');
    const [storagePermissionStatus, setStoragePermissionStatus] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [NotificationStatus, setNotificationStatus] = useState();
    const [NotificationMessage, SetNotificationMessage] = useState('');

    // const handleShowNotification = () => {
    //     setShowNotification(true);
    // };

    const handleCloseNotification = () => {
        setShowNotification(false);

        if(NotificationStatus === true) {
            navigation.replace('SplashScreen');
        }
    };

    async function fetchData() {
        await checkUserName();
        await checkStoragePermission();
        console.log('Screen re-rendered');
    }

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            // Lakukan aksi render ulang layar atau operasi lainnya di sini
                console.log('Screen is focused, perform rerender or other actions');
        }, [])
    );

    const checkStoragePermission = async () => {
        try {
            const readPermissionResult = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            const writePermissionResult = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        
            // Set status izin untuk digunakan dalam komponen Anda
            setStoragePermissionStatus({ read: readPermissionResult, write: writePermissionResult });
        
            // Log status izin ke konsol
            // console.log('Read Permission:', readPermissionResult);
            // console.log('Write Permission:', writePermissionResult);
        
            // Contoh: Jika keduanya diberikan, lakukan sesuatu
            if (readPermissionResult === 'granted' && writePermissionResult === 'granted') {
                SetiIfizinFileComplete('#008000');
                SetIzinBtnUpdateName('Izin Diberikan');
                return true;

            }else if(readPermissionResult === 'denied') {
                return false;
            }
        } catch (error) {
            console.error('Error checking storage permission:', error);
        }
    };

    async function checkUserName() {
        try {
            const GetDatauser = await AsyncStorage.getItem('UserName');

            if (GetDatauser) {
                setIFNameUpdate("Update Nama");
                SetIfNameComplete("#008000");
                return true;
            }else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const askfilepermisions = (permissions) => {
        request(permissions).then(result => {
            console.log(result);

            if (result === RESULTS.GRANTED) {
                checkStoragePermission();
                // navigation.replace('Home');
            }else if(result === RESULTS.DENIED) {
                console.log("astafirullah");
            }else if(result === RESULTS.BLOCKED) {
                console.log("im fine bjir");
                navigation.replace('AksesBLocked');
            }
        });
    };

    const CheckNameandFileAkses = async () => {
        try {
            const storagePermissionResult = await checkStoragePermission();
            const userNameResult = await checkUserName();
        
            if (storagePermissionResult && userNameResult) {
                console.log("File akses diizinkan");
                setNotificationStatus(true);
                SetNotificationMessage("Selamat! Nama kamu berhasil disimpan, dan akses file telah diizinkan. Kamu siap menjelajahi dunia musik bersama Hiyori Music!");
                setShowNotification(true);
                AsyncStorage.setItem('onboardingStatus', 'done');
            } else {
                console.log("File akses ditolak");

                if(!storagePermissionResult && !userNameResult) {
                    setNotificationStatus(false);
                    SetNotificationMessage("Mohon isi nama terlebih dahulu agar kami dapat memberikan pengalaman yang lebih personal. Jangan lupa izinkan aplikasi untuk mengakses file agar kamu bisa menikmati semua fitur Hiyori Music!");
                    setShowNotification(true);

                }else if(!storagePermissionResult) {
                    setNotificationStatus(false);
                    SetNotificationMessage("Tolong izinkan aplikasi untuk mengakses file di perangkat Kamu. Ini penting untuk memberikan pengalaman mendengarkan musik terbaik tanpa hambatan. Terima kasih!");
                    setShowNotification(true);

                }else if(!userNameResult) {
                    setNotificationStatus(false);
                    SetNotificationMessage("Mari lengkapi pengalaman musikmu! Tolong tuliskan nama Kamu agar kami dapat menyajikan layanan yang lebih personal dan menyenangkan. Terima kasih banyak!");
                    setShowNotification(true);
                }
            }
        } catch (error) {
            console.log('Error checking name and file access:', error);
        }
    };

    return (
        <>
            <View style={{flex: 1}}>
                <View style={{height: 160, alignItems: 'center'}}>
                    <Text style={{color: 'black', fontFamily: 'Poppins-Bold', fontSize: 28, textAlign: 'center', paddingHorizontal: 10, marginBottom: 10}}>{title}</Text>
                    <Text style={{color: '#151515', fontFamily: 'Poppins-Regular', fontSize: 16, textAlign: 'center', paddingHorizontal: 10}}>{description}</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('InputName')}} style={{height: 60, width: 170,backgroundColor: NameComplete, justifyContent: 'center', alignItems: 'center', borderRadius: 100, display: title === TampilkanButtonInputNama ? 'flex' : 'none'}}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16, textAlign: 'center'}}>{ButtonUpdateName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image source={urlimg} style={{height: 400, width: 400}} />
                    </View>
                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, left: 0, right: 0}}>
                <TouchableOpacity onPress={() => {
                        if (Platform.OS == 'android') {
                            askfilepermisions(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
                            askfilepermisions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                        } else {
                            console.log("this app only support for android");
                        }
                    }} style={{height: 60, width: 170, backgroundColor: IzinFileComplete, justifyContent: 'center', alignItems: 'center', borderRadius: 100, display: title === TampilkanButtonIzinFile ? 'flex' : 'none'}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16, textAlign: 'center'}}>{IzinBtnUpdateName}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={CheckNameandFileAkses} style={{height: 60, width: 170, backgroundColor: '#001B79', justifyContent: 'center', alignItems: 'center', borderRadius: 100, display: title === TampilkanButtonGetStarted ? 'flex' : 'none'}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16, textAlign: 'center'}}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <View style={{position: 'absolute',width: '100%', top: 50, justifyContent: 'center', alignItems: 'center'}}>
                {showNotification && (
                    <Notification
                    message= {NotificationMessage}
                    onClose={handleCloseNotification}
                    status= {NotificationStatus}
                    />
                )}
            </View>
        </>
    );
};

export default OnboardingScreen;