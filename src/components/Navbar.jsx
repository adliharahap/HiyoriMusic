import React, { useEffect, useState, useRef} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePages from '../pages/HomePages';
import MusicPages from '../pages/MusicPages';
import SearchMusicPages from '../pages/SearchMusicPages';
import PlaylistPages from '../pages/PlaylistPages';
import { Svg, Path} from 'react-native-svg';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import TrackPlayer, { useProgress, Event, State} from 'react-native-track-player';
import MusicControl, { Command } from 'react-native-music-control';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Slider } from '@miblanchard/react-native-slider';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    const navigation = useNavigation();
    const progress = useProgress();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isplayfirst, setisplayfirst] = useState(false);
    const [MusicPlay, setMusicPlay] = useState({title: '', artist: '', duration: 0, artwork: null,});

    const GetTrackPlayed = async () => {
        const trackId = await TrackPlayer.getCurrentTrack();
        const trackObject = await TrackPlayer.getTrack(trackId);

        // Dapatkan informasi yang Anda butuhkan dari objek lagu (judul, artis, dll.)
        const { title, artist, duration, artwork} = trackObject;
        setMusicPlay({title, artist, duration, artwork});

        const playerState = await TrackPlayer.getState();
        if (playerState === TrackPlayer.STATE_PLAYING) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            setisplayfirst(true);
        }
    };

    useEffect(()=> {
        const onTrackChange = async () => {
            // Jalankan kembali fungsi GetTrackPlayed
            await GetTrackPlayed();
        };

        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, onTrackChange);
    }, []);

    MusicControl.on(Command.play, async () => {
        await TrackPlayer.play();
        setIsPlaying(true);
        // Perbarui ikon di notifikasi saat tombol play diklik
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    });

    // Event handler untuk tombol pause di notifikasi
    MusicControl.on(Command.pause, async () => {
        await TrackPlayer.pause();
        setIsPlaying(false);
        // Perbarui ikon di notifikasi saat tombol pause diklik
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        });
    });

    const handlePause = async () => {
        await TrackPlayer.pause();
        setIsPlaying(false);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        });
    };

    const handlePlay = async () => {
        await TrackPlayer.play();
        setIsPlaying(true);
        // Perbarui ikon di notifikasi saat tombol play diklik
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    };

    const handleNextPress = async () => {
        await TrackPlayer.skipToNext();
        await TrackPlayer.play();
        setIsPlaying(true);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    };

    const handlePrevPress = async () => {
        await TrackPlayer.skipToPrevious();
        await TrackPlayer.play();
        setIsPlaying(true);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    };

    useEffect(() => {
        const checkplaypause = async () => {
            const state = await TrackPlayer.getState();
            if (state === State.Playing) {
                handlePlay();
            }else {
                handlePause();
            }
        }
        checkplaypause();
    }, [progress.position]);



    return (
        <>
        {isplayfirst &&
        <View style={{backgroundColor: '#303030', height: 55, width: '100%', position: 'absolute', zIndex: 999, bottom: 60, borderRadius: 10, overflow: 'hidden'}}>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('Musicplay', { MusicId: 999999 })}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Image source={{uri: MusicPlay.artwork}} style={{width: 40, height: 40, resizeMode: 'cover', borderRadius: 5}} />
                    </View>
                    <View style={{width: '57%', paddingHorizontal: 5}}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <TextTicker
                                style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#FFFFFF' }}
                                duration={7000} // Durasi pergerakan teks
                                loop // Mengulangi animasi
                                bounce // Memberikan efek pantulan
                                repeatSpacer={50} // Jarak kembali ke awal
                                marqueeDelay={2000} // Jeda sebelum animasi dimulai
                                scroll
                            >
                                {MusicPlay.title}
                            </TextTicker>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-start'}}>
                            <Text numberOfLines={1} style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#cccccc' }}> {MusicPlay.artist}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={handlePrevPress}>
                                <Svg width="16" height="16" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" style={{transform: [{rotate: '180deg'}]}}>
                                    <Path d="M1.79062 2.09314C1.63821 1.98427 1.43774 1.96972 1.27121 2.05542C1.10467 2.14112 1 2.31271 1 2.5V12.5C1 12.6873 1.10467 12.8589 1.27121 12.9446C1.43774 13.0303 1.63821 13.0157 1.79062 12.9069L8.79062 7.90687C8.92202 7.81301 9 7.66148 9 7.5C9 7.33853 8.92202 7.18699 8.79062 7.09314L1.79062 2.09314Z" fill="#FFFFFF" />
                                    <Path d="M13 13H14V2H13V13Z" fill="#FFFFFF"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {isPlaying ? (
                                <View>
                                    <TouchableOpacity onPress={handlePause}>
                                        <Svg fill="#FFFFFF" width="26" height="26" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg" ><Path d="M64 96L160 96 160 416 64 416 64 96ZM224 96L320 96 320 416 224 416 224 96Z" /></Svg>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <TouchableOpacity onPress={handlePlay}>
                                        <Svg width="26" height="26" viewBox="0 0 15 15" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><Path d="M4.79062 2.09314C4.63821 1.98427 4.43774 1.96972 4.27121 2.05542C4.10467 2.14112 4 2.31271 4 2.5V12.5C4 12.6873 4.10467 12.8589 4.27121 12.9446C4.43774 13.0303 4.63821 13.0157 4.79062 12.9069L11.7906 7.90687C11.922 7.81301 12 7.66148 12 7.5C12 7.33853 11.922 7.18699 11.7906 7.09314L4.79062 2.09314Z"/></Svg>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={handleNextPress}>
                                <Svg width="16" height="16" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M1.79062 2.09314C1.63821 1.98427 1.43774 1.96972 1.27121 2.05542C1.10467 2.14112 1 2.31271 1 2.5V12.5C1 12.6873 1.10467 12.8589 1.27121 12.9446C1.43774 13.0303 1.63821 13.0157 1.79062 12.9069L8.79062 7.90687C8.92202 7.81301 9 7.66148 9 7.5C9 7.33853 8.92202 7.18699 8.79062 7.09314L1.79062 2.09314Z" fill="#FFFFFF" />
                                    <Path d="M13 13H14V2H13V13Z" fill="#FFFFFF"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height: 1, width: '100%', position: 'absolute', bottom: 20}}>
                <Slider
                    style={{ width: '100%'}}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    value={progress.position}
                    disabled={true}
                    thumbTintColor='#FFFFFF'
                    minimumTrackTintColor='tomato'
                    maximumTrackTintColor='#808080'
                    trackStyle={{height: 1.5, borderRadius: 50}}
                    thumbStyle={{height: 0, width: 0}}
                />
            </View>
        </View>
        }
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 60,
                paddingHorizontal: 5,
                paddingVertical: 5,
                paddingTop: 0,
                backgroundColor: 'rgba(20,20,30,1)',
                position: 'absolute',
                borderTopWidth: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
            },
            tabBarIconStyle: {
                width: 28,
                height: 28,
            },
        })}>
            <Tab.Screen name="Home" component={HomePages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Search" component={SearchMusicPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Music" component={MusicPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></Svg>
                )
            }}}/>
            <Tab.Screen name="Playlist" component={PlaylistPages} options={{tabBarIcon: ({ focused, size }) => {
                return (
                    <Svg height={focused ? size + 5 : size} viewBox="0 -960 960 960" width={focused ? size + 5 : size} fill="white"><Path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></Svg>
                )
            }}}/>
        </Tab.Navigator>
        </>
    );
}

export default Navbar;