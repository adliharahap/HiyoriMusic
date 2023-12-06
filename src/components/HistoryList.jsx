import { View, Text } from 'react-native'
import React from 'react'
import { Svg, Path } from 'react-native-svg';

const HistoryList = () => {
    return (
        <>
            <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: '#D8D9DA'}}>Die for you</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', width: 40}}>
                    <Svg height="24" viewBox="0 -960 960 960" width="24" fill="#D8D9DA"><Path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></Svg>
                </View>
            </View>
        </>
    );
};

export default HistoryList;