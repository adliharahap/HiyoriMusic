import React from 'react';
import { View, Text, Button, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

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
            <View style={{height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <Text style={{color: '#000000', fontFamily: 'Poppins-Black', fontSize: 24}}>Hiyori Music</Text>
            </View>
            <View style={{ flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Carousel
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    data={Componentdata}
                    width={width}
                    autoPlay={false}
                    loop={false}
                    renderItem={({ item }) => (
                        <View style={{flex: 1, overflow: 'hidden'}}>
                            {item}
                        </View>
                    )}
                    />
                </View>
            </View>
        </View>
    );
};

const OnboardingComponent = (props) => {
    const {title, description, urlimg} = props;
    return (
        <>
            <View style={{flex: 1}}>
                <View style={{height: 160, alignItems: 'center'}}>
                    <Text style={{color: 'black', fontFamily: 'Poppins-Bold', fontSize: 28, textAlign: 'center', paddingHorizontal: 10, marginBottom: 10}}>{title}</Text>
                    <Text style={{color: '#151515', fontFamily: 'Poppins-Regular', fontSize: 16, textAlign: 'center', paddingHorizontal: 10}}>{description}</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image source={urlimg} style={{height: 400, width: 400}} />
                    </View>
                </View>
            </View>
        </>
    );
};

export default OnboardingScreen;