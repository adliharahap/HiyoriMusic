import React from 'react';
import {Text, View, Image } from 'react-native';

const FavoriteMusicCard = (props) => {
    const {NameMusic, Artist} = props;

    return(
        <View>
            <View style={{height: 230, width: 150, borderRadius:10, overflow: 'hidden'}}>
                <View>
                    <Image source={require('../img/Favorite-music.jpeg')} style={{height:150, width:150, borderRadius:10,}}></Image>
                </View>
                <View style={{paddingLeft: 5, paddingRight: 5}}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 22, fontFamily: 'Poppins-Medium', color: 'white'}}>{NameMusic}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 14, fontFamily: 'Poppins-Light', color: '#B9B4C7'}}>{Artist}</Text>
                </View>
            </View>
        </View>
    );
}

export default FavoriteMusicCard;