import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import HistoryList from '../components/HistoryList';

const History = () => {
    return (
        <>
            <View>
                {/* Pr disini tempat component list history music */}
            </View>
        </>
    );
};

const SearchMusicPages = () => {

    return (
        <>
            <View style={{flex: 1,backgroundColor: 'rgba(15, 15, 15, 1)'}}>
                <View style={{height: 100, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                    <View style={{width: '95%',backgroundColor: '#272829', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, overflow: 'hidden'}}>
                        <TextInput style={{ width: '85%', fontFamily: 'Poppins-Medium', fontSize: 14, paddingLeft: 10}} placeholder='Cari Lagu Kamu Disini' editable={false}></TextInput>
                        <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                        <View>
                            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white'}}>History Pencarian</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: 'white'}}>Lihat Semua</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <HistoryList />
                        <HistoryList />
                        <HistoryList />
                        <HistoryList />
                        <HistoryList />
                    </View>
                </View>
            </View>
        </>
    );
};  

export default SearchMusicPages;