import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FavoriteMusicCard from "../components/Favorite-music-card";
import Svg, { Path } from 'react-native-svg';
import Navbar from "../components/Navbar";

const HomePages = ( {navigation}) => {
    return (
        <>
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <LinearGradient colors={['rgba(131, 0, 0, 1)', 'rgba(15, 15, 15, 1)']} locations={[0, 0.6]} style={{flex: 1, height: 635}}>
                <View style={{height: 350, width: '100%'}}>
                    <View style={{height: 180}}>
                    <View>
                        <Text style={styles.Textheader}>Hiyori Music</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontFamily:'Poppins-Medium', marginBottom: 20, color: 'white', marginLeft: 10}}>Selamat Pagi</Text>
                        <View style={{marginRight: 15}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white"><Path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></Svg>
                        </View>
                    </View>
                    <View style={{width: '95%',backgroundColor: '#272829', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, overflow: 'hidden'}}>
                        <TextInput style={{ width: '85%', fontFamily: 'Poppins-Medium', fontSize: 14, paddingLeft: 10}} placeholder='Cari Lagu Kamu Disini' editable={false}></TextInput>
                        <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                    </View>
                    </View>
                    <View style={{}}>
                    <View style={{paddingTop: 10}}>
                        {/* bagian card music */}
                        <View style={{height: '100%', width: '100%', display: 'flex', flexDirection:'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                            <TouchableOpacity style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row', marginBottom: 10}} onPress={() => navigation.navigate('Wallpaperpages')}>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                                <Svg height="28" viewBox="0 -960 960 960" width="28" fill='#f807cb'><Path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></Svg>
                            </View>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                                <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>Favorite Music</Text>
                            </View>
                            </TouchableOpacity>

                            <View style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row',  marginBottom: 10}}>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                                <Svg height="28" viewBox="0 -960 960 960" width="28" fill="#FFD700"><Path d="m668-340 152-130 120 10-176 153 52 227-102-62-46-198Zm-94-292-42-98 46-110 92 217-96-9ZM294-247l126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM173-80l65-281L20-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L173-80Zm247-340Z"/></Svg>
                            </View>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                                <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>Favorite Artist</Text>
                            </View>
                            </View>

                            <View style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row',  marginBottom: 10}}>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="#39A7FF"><Path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></Svg>
                            </View>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                                <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>All Albums</Text>
                            </View>
                            </View>

                            <View style={{height: 70, width: '46%', backgroundColor: '#272829', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection:'row',  marginBottom: 10}}>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70, width: 45}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="#1AACAC"><Path d="M160-360q-33 0-56.5-23.5T80-440v-360q0-33 23.5-56.5T160-880h360q33 0 56.5 23.5T600-800v360q0 33-23.5 56.5T520-360H160Zm0-80h360v-360H160v360Zm160-70-48-66-72 96h280l-92-120-68 90ZM680-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 20.5 2t19.5 5v-207h160v80h-80v240q0 50-35 85t-85 35ZM160-440v-360 360Z"/></Svg>
                            </View>
                            <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: 70}}>
                                <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center'}}>Last Add</Text>
                            </View>
                            </View>
                        </View>
                    </View>
                    </View>
                </View>
                <View style={{height: 'auto', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 15}}>
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
                    <Text style={{fontSize: 22, fontFamily: 'Poppins-SemiBold', color: 'white', marginBottom: 10}}>Music Yang Disukai</Text>
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
        <Navbar />
        </>
    );
}

    const styles = StyleSheet.create({
        container : {
            flex: 1,
            height: 'auto',
            backgroundColor : '#0F0F0F',
            color : '#fff',
            fontFamily: 'Poppins-Regular',
            paddingBottom: 50,
        },

        Textheader : {
            color : '#fff',
            textAlign : 'center',
            fontFamily: 'Poppins-Bold',
            marginTop : 25,
            marginBottom: 8,
            fontSize : 25,
        }
    });

export default HomePages;