import { View, Text } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import HomeMusicCard from './Home-music-card';

const CarouselMusicCard = () => {
    const data = [
        <HomeMusicCard />, 
        <HomeMusicCard />, 
        <HomeMusicCard />, 
        <HomeMusicCard />, 
        <HomeMusicCard />
    ];

    return (
        <>
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Carousel
                    data={data}
                    renderItem={({ item}) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {item}
                        </View>
                    )}
                    sliderWidth={420}
                    itemWidth={310}
                    />
                </View>
        </View>
        </>
    );
};

export default CarouselMusicCard;