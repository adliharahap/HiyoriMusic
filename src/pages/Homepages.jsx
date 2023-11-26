import { StyleSheet, View, ScrollView, Text} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import CarouselMusicCard from '../components/CarouselMusiccard';

let Homepages = () => {


  return (
    <>
        <Video 
          source={require('../img/Lively-walpaper/loli.mp4')} 
          ref={(ref) => {
            this.player = ref
          }} 
          onBuffer={this.onBuffer}
          onError={this.videoError} 
          style={styles.backgroundVideo}
          resizeMode="cover"
          repeat={true}
          volume={0} //Pr: user dapat mengatur volume nanti
        ></Video>
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20}}>
            <View style={styles.MusicSettings}>
            </View>
          </View>
          <View style={{flex: 1}}>

          </View>
          {/* carousel music */}
          <CarouselMusicCard />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  MusicSettings: {
    height: 160,
    width: '90%',
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    borderRadius: 20,
  },
});


export default Homepages;
