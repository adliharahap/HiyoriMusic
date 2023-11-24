import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react'
import FavoriteMusicCard from './src/components/Favorite-music.-card';
import Svg, { Path } from 'react-native-svg';

const LibraryPages = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
          <LinearGradient colors={['rgba(131, 0, 0, 1)', 'rgba(15, 15, 15, 1)']} locations={[0, 0.6]} style={{flex: 1, height: 635}}>
            <View style={{height: 350, width: '100%'}}>
              <View style={{height: 260}}>
                <View>
                  <Text style={styles.Textheader}>Hiyori Music</Text>
                </View>
                {/* untuk fitur pencarian dan pengaturan */}
              </View>
              <View style={{}}>
                <View style={{paddingTop: 10}}>
                    {/* bagian card music */}
                    <View style={{height: '100%', width: '100%', display: 'flex', flexDirection:'row', justifyContent: 'space-around'}}>
                      <View style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row'}}>
                        <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                          <Svg height="28" viewBox="0 -960 960 960" width="28" fill='#f807cb'><Path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></Svg>
                        </View>
                        <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                          <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>Favorite Music</Text>
                        </View>
                      </View>

                      <View style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row'}}>
                        <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                          <Svg height="28" viewBox="0 -960 960 960" width="28" fill="#FFD700"><Path d="m668-340 152-130 120 10-176 153 52 227-102-62-46-198Zm-94-292-42-98 46-110 92 217-96-9ZM294-247l126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM173-80l65-281L20-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L173-80Zm247-340Z"/></Svg>
                        </View>
                        <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                          <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>Favorit Artist</Text>
                        </View>
                      </View>
                    </View>
                </View>
              </View>
            </View>
            <View style={{height: 'auto', width: '100%', paddingLeft: 10, paddingRight: 10}}>
              <View>
                <View>
                  <Text style={{fontSize: 22, fontFamily: 'Poppins-SemiBold', color: 'white', marginBottom: 10}}>Baru Saja Diputar</Text>
                </View>
                <ScrollView horizontal={true} style={{overflow: 'hidden'}}>
                  <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
                    <FavoriteMusicCard NameMusic="People with badguys" Artist="Libianca"></FavoriteMusicCard>
                    <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                    <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                  </View>
                </ScrollView>
              </View>
            </View>
          </LinearGradient> 
          <View style={{height: 'auto', width: '100%', paddingLeft: 10, paddingRight: 10}}>
            <View>
              <View>
                <Text style={{fontSize: 22, fontFamily: 'Poppins-SemiBold', color: 'white', marginBottom: 10}}>Direkomendasikan Khusus Hari Ini</Text>
              </View>
              <ScrollView horizontal={true} style={{overflow: 'hidden'}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
                  <FavoriteMusicCard NameMusic="People with badguys" Artist="Libianca"></FavoriteMusicCard>
                  <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                  <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                </View>
              </ScrollView>
            </View>

            <View>
              <View>
                <Text style={{fontSize: 22, fontFamily: 'Poppins-SemiBold', color: 'white', marginBottom: 10}}>Top Hits Indonesia</Text>
              </View>
              <ScrollView horizontal={true} style={{overflow: 'hidden'}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
                  <FavoriteMusicCard NameMusic="People with badguys" Artist="Libianca"></FavoriteMusicCard>
                  <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                  <FavoriteMusicCard NameMusic="People" Artist="Libianca"></FavoriteMusicCard>
                </View>
              </ScrollView>
            </View>
          </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    height: 'auto',
    backgroundColor : '#0F0F0F',
    color : '#fff',
    fontFamily: 'Poppins-Regular'
  },

  Textheader : {
    color : '#fff',
    textAlign : 'center',
    fontFamily: 'Poppins-Bold',
    marginTop : 25,
    fontSize : 25
  }
});

export default LibraryPages;