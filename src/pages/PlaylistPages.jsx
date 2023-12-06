import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar';
import { Svg, Path } from 'react-native-svg';
import PlaylistList from '../components/MusicComponent/PlaylistList';

const PlaylistPages = () => {
    return (
        <>
            <View style={{flex: 1,backgroundColor: 'rgba(15, 15, 15, 1)'}}>
                <View style={{backgroundColor: '#191919', height: 150, width: '100%', position: 'relative'}}>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: '95%',backgroundColor: '#272829', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, overflow: 'hidden'}}>
                            <TextInput style={{ width: '85%', fontFamily: 'Poppins-Medium', fontSize: 14, paddingLeft: 10}} placeholder='Cari Playlist Kamu Disini' editable={false}></TextInput>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{position: 'relative', height: '100%', alignItems: 'center', marginLeft: 10}}>
                            <View style={{backgroundColor: '#1ED760', borderRadius: 30}}>
                                <Text style={{paddingHorizontal: 20 ,fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white'}}>Playlist</Text>
                            </View>
                            {/* <View style={{position: 'absolute', bottom: -4, height: 5, width: '100%',backgroundColor: 'red', borderRadius: 5}}></View> */}
                        </View>
                        <View style={{position: 'relative', height: '100%', alignItems: 'center'}}>
                            <View style={{/*backgroundColor: '#1ED760',*/ borderRadius: 30}}>
                                <Text style={{paddingHorizontal: 20 ,fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white'}}>Artis</Text>
                            </View>
                            {/* <View style={{position: 'absolute', bottom: -4, height: 5, width: '100%',backgroundColor: 'red', borderRadius: 5}}></View> */}
                        </View>
                        <View style={{position: 'relative', height: '100%', alignItems: 'center', flex: 1, alignItems: 'flex-end', paddingRight: 20}}>
                            <View>
                                <Svg height="30" viewBox="0 -960 960 960" width="30" fill="white"><Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></Svg>
                            </View>
                        </View>
                    </View>
                </View>

                {/* container playlist & artis */}
                <ScrollView style={{flex: 1, backgroundColor: '#191919', marginTop: 5, padding: 10}}>
                    <View style={{flex: 1, marginBottom: 100}}>
                        <PlaylistList />
                        <PlaylistList />
                        <PlaylistList />
                        <PlaylistList />
                        <PlaylistList />
                        <PlaylistList />
                        <PlaylistList />
                    </View>
                </ScrollView>
            </View>
            <Navbar />
        </>
    );
};

export default PlaylistPages;