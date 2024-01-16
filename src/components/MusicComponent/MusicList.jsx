import React from "react";
import { View, Image, Text } from "react-native";
import { Svg, Path } from "react-native-svg";

const MusicList = (props) => {
    const {img, title, artist, duration} = props;
    return (
        <>
            <View style={{height: 80, width: '100%', flexDirection: "row", marginBottom: 10}}>
                <View style={{width: 80, justifyContent: "center", alignItems: "center"}}>
                    <Image style={{height: 60, width: 60, borderRadius: 5}} source={require('../../img/Favorite-music.jpeg')} />
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Bold', fontSize: 18, color: '#ffffff'}}>{title}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#CCCCCC'}}>{artist}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 11, color: '#EEEDED'}}>{duration}</Text>
                </View>
                <View style={{width: 40, alignItems: "center", justifyContent: "center"}}>
                    <Svg height="26" viewBox="0 -960 960 960" width="26" fill="white"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                </View>
            </View>
        </>
    );
};

export default MusicList;