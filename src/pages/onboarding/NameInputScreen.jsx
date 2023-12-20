import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NameInputScreen = () => {
    const [borderfocus, setborderfocus] = useState('black');
    const [NameInputValue, setNameInputValue] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        // Mendapatkan data saat komponen dimount
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Mendapatkan data dari AsyncStorage
            const storedName = await AsyncStorage.getItem('UserName');

            if (storedName) {
                // Jika data ditemukan, mengatur nilai awal input
                setNameInputValue(storedName);
            }
        } catch (error) {
            console.error('Gagal mendapatkan data dari AsyncStorage:', error);
        }
    };

    const SaveNameUser = async () => {
        try {
            await AsyncStorage.setItem('UserName', NameInputValue);
            console.log("nama user berhasil di simpan");
            
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        } catch (error) {
            console.log(`data nama user gagal di simpan : ${error}`);
        }
    };
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <Text style={{color: '#000000', fontFamily: 'Poppins-Black', fontSize: 24}}>Hiyori Music</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    <View style={{ alignItems: 'center',marginBottom: 30}}>
                        <Text style={{color: 'black', fontFamily: 'Poppins-Bold', fontSize: 28, textAlign: 'center', paddingHorizontal: 10, marginBottom: 10}}>Tuliskan Nama Kamu</Text>
                        <Text style={{color: '#151515', fontFamily: 'Poppins-Regular', fontSize: 16, textAlign: 'justify', paddingHorizontal: 10}}>Ayo kenalan lebih dekat! Masukkan nama utama Kamu di bawah ini. Gunakan nama yang biasa Kamu pakai sehari-hari.</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput autoCorrect={true} value={NameInputValue} maxLength={12} onChangeText={setNameInputValue} selectionColor={'rgba(15, 15, 15, 1)'} style={{borderColor: borderfocus, borderWidth: 1.5, color: 'black', width: '90%', borderRadius: 10, paddingHorizontal: 10, fontFamily: 'Poppins-Regular', fontSize: 18, fontWeight: 'bold'}} onFocus={() => {setborderfocus('#001B79')}} onBlur={() => {setborderfocus('black')}} />
                        <Text style={{color: '#151515', fontFamily: 'Poppins-Regular', fontSize: 16, textAlign: 'center', paddingHorizontal: 10,marginBottom: 20, marginTop: 10}}>(Contoh: Thoriq, Adli, Imam, Naufal)</Text>
                        <Text style={{ color: '#151515', fontFamily: 'Poppins-Regular', fontSize: 16, textAlign: 'justify', paddingHorizontal: 10, marginBottom: 20 }}>
                            Masukkan nama Kamu (
                            <Text style={{ color: '#800000', fontFamily: 'Poppins-Regular', fontSize: 16 }}>
                                maks. 12 karakter
                            </Text> 
                            ) untuk pengalaman lebih personal. Mudah dan singkat, ya!
                        </Text>
                        <TouchableOpacity onPress={SaveNameUser} style={{height: 60, width: 170,backgroundColor: '#001B79', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
                            <Text style={{color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16, textAlign: 'center'}}>Simpan Nama</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default NameInputScreen;