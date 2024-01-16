import React from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { Svg, Path } from 'react-native-svg';
import MusicList from '../components/MusicComponent/MusicList';

function MusicPages() {
    return (
        <>
            <View style={{backgroundColor: 'rgba(15, 15, 15, 1)', flex: 1}}>
                <View style={{backgroundColor: '#191919', height: 150, width: '100%'}}>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: '95%',backgroundColor: '#272829', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, overflow: 'hidden'}}>
                            <TextInput style={{ width: '85%', fontFamily: 'Poppins-Medium', fontSize: 14, paddingLeft: 10}} placeholder='Cari Lagu Kamu Disini' editable={false}></TextInput>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{position: 'relative', height: '100%', alignItems: 'center', marginLeft: 10}}>
                            <Text style={{paddingHorizontal: 20 ,fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white'}}>All Music</Text>
                            <View style={{position: 'absolute', bottom: -4, height: 5, width: '100%',backgroundColor: 'red', borderRadius: 5}}></View>
                        </View>
                        <View style={{position: 'relative', height: '100%', alignItems: 'center'}}>
                            <Text style={{paddingHorizontal: 20 ,fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white'}}>Favorite Music</Text>
                            {/* <View style={{position: 'absolute', bottom: -4, height: 5, width: '100%',backgroundColor: 'red', borderRadius: 5}}></View> */}
                        </View>
                    </View>
                </View>

                {/* bagian list music */}
                <ScrollView style={{flex: 1, marginTop: 4, backgroundColor: '#191919', padding: 10}}>
                    <View style={{flex: 1, marginBottom: 80}}>
                        <MusicList title="psycho" artist="red-velvet" duration="03.00" />
                        <MusicList title="die for you" artist="red-velvet" duration="03.00" />
                    </View>
                </ScrollView>
            </View>
            <Navbar />
        </>
    );
};

export default MusicPages;