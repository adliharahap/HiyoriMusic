import React from "react";
import { View, Image, Text } from "react-native";
import { Svg, Path } from "react-native-svg";

const PlaylistList = () => {
    return (
        <>
            <View style={{height: 80, width: '100%', flexDirection: "row", marginBottom: 10}}>
                <View style={{width: 80, justifyContent: "center", alignItems: "center"}}>
                    <Image style={{height: 80, width: 80}} source={require('../../img/Albums/Favorite-music.jpeg')} />
                </View>
                <View style={{flex: 1, justifyContent: "center", paddingLeft: 10}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Bold', fontSize: 18, color: '#ffffff'}}>Favorite Music</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 12, color: '#CCCCCC'}}>Playlist • </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 12, color: '#CCCCCC'}}>17 Lagu</Text>
                    </View>
                </View>
            </View>
        </>      
    );
};

export default PlaylistList;