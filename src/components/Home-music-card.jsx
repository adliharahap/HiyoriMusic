import { View, Text, Image } from 'react-native'
import React from 'react'
import Svg, { Path, G } from 'react-native-svg';

const HomeMusicCard = (props) => {
    const {coba} = props;
    
    return (
        <View style={{width: '100%', height: 180, backgroundColor: 'rgba(15, 15, 15, 0.6)', borderRadius: 10, display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
            <View style={{height: '100%', width: 100, display: 'flex', justifyContent: 'center'}}>
                <View style={{flex: 1.5, justifyContent: 'center',alignItems: 'center'}}>
                    <Image style={{height: 80, width: 80, borderRadius: 10}} source={require('../img/Favorite-music.jpeg')}></Image>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height="28" viewBox="0 -960 960 960" width="28" fill={'#87C4FF'}><Path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"/></Svg>
                    </View>
                    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height="38" viewBox="0 -960 960 960" width="38" fill={'#A7D397'}><Path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></Svg>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Bold', fontSize: 22, color: '#ffffff'}}>Die For You</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#CCCCCC'}}>The Weekend & Ariana Grande</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 11, color: '#EEEDED'}}>03.17</Text>
                </View>
                <View style={{flex: 1,flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg width="40" height="36" viewBox="0 0 12 8" id="prev" style={{ transform: [{ rotate: '180deg' }],}}><G fill="none" fill-rule="evenodd"><G fill="#CCCCCC" transform="translate(-144 -3805)"><G transform="translate(56 160)"><Path d="M99.684 3649.694l-4.477 3.13c-.636.43-1.207.022-1.207-.692v-1.991l-4.22 2.684c-.635.429-1.78.02-1.78-.693v-6.263c0-.714 1.145-1.122 1.78-.694l4.22 2.685v-1.991c0-.714.571-1.122 1.207-.694l4.309 3.132c.514.347.682 1.04.168 1.387"></Path></G></G></G></Svg>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height="75" viewBox="0 -960 960 960" width="75" fill={'#CCCCCC'}><Path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></Svg>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Svg width="40" height="36" viewBox="0 0 12 8" id="next"><G fill="none" fill-rule="evenodd"><G fill="#CCCCCC" transform="translate(-144 -3805)"><G transform="translate(56 160)"><Path d="M99.684 3649.694l-4.477 3.13c-.636.43-1.207.022-1.207-.692v-1.991l-4.22 2.684c-.635.429-1.78.02-1.78-.693v-6.263c0-.714 1.145-1.122 1.78-.694l4.22 2.685v-1.991c0-.714.571-1.122 1.207-.694l4.309 3.132c.514.347.682 1.04.168 1.387"></Path></G></G></G></Svg>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeMusicCard;