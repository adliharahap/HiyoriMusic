import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { interpolate } from 'react-native-reanimated';
import HomeMusicCard from './Home-music-card';

const CarouselMusicCard = () => {
    const data = [
        <HomeMusicCard coba="adli" />, 
        <HomeMusicCard coba="azka" />, 
        <HomeMusicCard coba="mik" />, 
        <HomeMusicCard coba="mama" />, 
        <HomeMusicCard coba="ayah" />
    ];
    
    const PAGE_WIDTH = 350;
    
    const customAnimation = (value) => {
        'worklet';
        
        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
        const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
        const rotateZ = `${interpolate(value, [-1, 0, 1], [-45, 0, 45])}deg`;
        const translateX = interpolate(value, [-1, 0, 1], [-PAGE_WIDTH, 0, PAGE_WIDTH]);
        const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);
        
        return {
            transform: [{ scale }, { rotateZ }, { translateX }],
            zIndex,
            opacity,
        };
    };
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Carousel
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            width={PAGE_WIDTH}
            data={data}
            autoPlay={false}
            loop={false}
            renderItem={({ item }) => (
                <View style={{flex: 1 ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                {item}
                </View>
            )}
            customAnimation={customAnimation}
            />
        </View> 
    );
};

export default CarouselMusicCard;
