import {Text, View, StatusBar, Image, TouchableOpacity, LogBox, TouchableWithoutFeedback} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Svg, Path} from 'react-native-svg'
import TextTicker from 'react-native-text-ticker';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event} from 'react-native-track-player';
import MusicControl, { Command } from 'react-native-music-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const PlayMusicPages = () => {
    const [position, setPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const progress = useProgress();

    const route = useRoute();
    const receivedMusicId = route.params?.MusicId;
    LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                // Ambil data dari asynchronous storage
                const storedData = await AsyncStorage.getItem('AllListMusic');
                await TrackPlayer.setupPlayer({});

                if (storedData) {
                    // Parse data dari JSON
                    const parsedData = JSON.parse(storedData);
            
                    const newPlaylist = parsedData.map((item) => {
                        // Fungsi untuk mengonversi format menit:detik menjadi detik
                        const convertDurationToSeconds = (duration) => {
                        const [minutes, seconds] = duration.split(":");
                        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
                        };
            
                        // Fungsi untuk mendapatkan gambar default jika ThumnailData === null
                        const defaultImgMusic = "data:image/png;base64,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";
            
                        return {
                        id: item.ID,
                        url: item.Uri,
                        title: item.Title,
                        artist: item.Artist,
                        album: item.Album,
                        artwork: item.ThumnailData === "null" ? defaultImgMusic : item.ThumnailData,
                        duration: convertDurationToSeconds(item.Duration),
                        // Tambahkan properti lain sesuai kebutuhan
                        };
                    });
                    
                    await TrackPlayer.add(newPlaylist);

                    if (receivedMusicId === undefined) {
                        console.log("MusicId tidak ditemukan.");
                    } else {
                        await TrackPlayer.skip(receivedMusicId);
                        await TrackPlayer.play();
                        MusicControl.updatePlayback({
                            state: MusicControl.STATE_PLAYING,
                        });
                        setIsPlaying(true);
                    }
                }
            } catch (error) {
            }
        };
    
        // Panggil fungsi loadPlaylist
        loadPlaylist();
    
        // Event handler untuk tombol play di notifikasi
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

        MusicControl.on(Command.nextTrack, async () => {
            await TrackPlayer.skipToNext();
            await TrackPlayer.play();
            setIsPlaying(true);
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING,
            });
            updateTrackInfo();
        });
    
        // Handle event ketika tombol previous di notifikasi ditekan
        MusicControl.on(Command.previousTrack, async () => {
            await TrackPlayer.skipToPrevious();
            await TrackPlayer.play();
            setIsPlaying(true);
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING,
            });
            updateTrackInfo();
        });    
          // ... (event handler lainnya)

    }, []);

    useEffect(() => {
        const skipMusic = async () => {

            if (receivedMusicId === undefined) {

            }else {
                await TrackPlayer.skip(receivedMusicId);
                await TrackPlayer.play();
                MusicControl.updatePlayback({
                    state: MusicControl.STATE_PLAYING,
                });
                setIsPlaying(true);
            }

            const playerState = await TrackPlayer.getState();
            if (playerState === TrackPlayer.STATE_PLAYING) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);
            }
        }

        skipMusic();
        updateTrackInfo();

    }, [receivedMusicId])
    

    const updateTrackInfo = async () => {
        // const duration = Math.round(progress.duration);

        const trackId = await TrackPlayer.getCurrentTrack();
        const trackObject = await TrackPlayer.getTrack(trackId);

        // Dapatkan informasi yang Anda butuhkan dari objek lagu (judul, artis, dll.)
        const { title, artist, duration, artwork} = trackObject;

        // Perbarui state komponen dengan informasi lagu yang sedang diputar
        setCurrentTrack({ title, artist, artwork});
        // setsecondmusic(duration);

        showNotification(title, artist, duration, artwork);
    };

    const showNotification = async (title, artist, duration, artwork) => {

        MusicControl.setNowPlaying({
            title: title,
            artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB63Matv0X_AbDKOFkcU8HNHK7AKGomXEGUQ&usqp=CAU',
            artist: artist,
            album: 'Thriller',
            duration: duration,
        });
    };

    const formatTime = (seconds) => {
        const roundedSeconds = Math.round(seconds); // Memastikan nilai detik sudah dibulatkan
        const minutes = Math.floor(roundedSeconds / 60);
        const remainingSeconds = roundedSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const updateNotificationPlayback = () => {
            MusicControl.updatePlayback({
                elapsedTime: progress.position
            });
        };
        
        updateNotificationPlayback();
    }, [progress.position, progress.duration]);
    
    useEffect(() => {
        // Set nilai position ke nilai progress terbaru
        setPosition(progress.position);
    }, [progress.position]);

    const onSlidingComplete = async (value) => {
        await TrackPlayer.seekTo(value);
    };

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        // Saat lagu berikutnya diputar, perbarui informasi lagu
        updateTrackInfo();
    });
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('seek', true) 
    MusicControl.enableControl('changePlaybackPosition', true);
    MusicControl.enableControl('closeNotification', true, { when: 'paused' })
    MusicControl.enableBackgroundMode(true);

    const onValueChange = (value) => {
        setPosition(value);
    };

    // bagian control interface music play pause next prev

    const handleNextPress = async () => {
        await TrackPlayer.skipToNext();
        await TrackPlayer.play();
        setIsPlaying(true);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
        updateTrackInfo();
        const trackIndex = await TrackPlayer.getCurrentTrack();
        console.log(`Track index : ${trackIndex}`);
    };

    const handlePrevPress = async () => {
        await TrackPlayer.skipToPrevious();
        await TrackPlayer.play();
        setIsPlaying(true);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
        updateTrackInfo();
    };

    const handlePause = async () => {
        await TrackPlayer.pause();
        setIsPlaying(false);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        });
    }

    const handlePlay = async () => {
        await TrackPlayer.play();
        setIsPlaying(true);
        // Perbarui ikon di notifikasi saat tombol play diklik
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    }

    return (
        <View style={{flex: 1, backgroundColor:'rgb(15,15,15)'}}>
            <StatusBar backgroundColor="transparent" translucent/>
            <HeaderMusic />
            <View style={{flex: 1}}>
                <View style={{height: 350, width: '100%'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <Image source={{uri: currentTrack?.artwork}} style={{height: 300, width: 300, borderRadius: 20}}></Image>
                    </View>
                </View>
                <View style={{ height: 80}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, paddingHorizontal: 10}}>
                        <TextTicker
                            style={{ fontFamily: 'Poppins-Medium', fontSize: 18, color: '#FFFFFF' }}
                            duration={7000} // Durasi pergerakan teks
                            loop // Mengulangi animasi
                            bounce // Memberikan efek pantulan
                            repeatSpacer={200} // Jarak kembali ke awal
                            marqueeDelay={3000} // Jeda sebelum animasi dimulai
                            scroll
                        >
                            {currentTrack?.title}
                        </TextTicker>
                        {/* <Text numberOfLines={1} style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: 'white'}}>Ariana Grande - Stuck With You djdlfsdfsdfsd</Text> */}
                        <Text numberOfLines={1} style={{fontFamily: 'Poppins-Regular', fontSize: 16, color: '#CCCCCC'}}>{currentTrack?.artist}</Text>
                    </View>
                </View>
                <View style={{height: 40}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <View style={{marginLeft: 20}}>
                                <Svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#FFFFFF"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <View style={{marginRight: 20}}>
                                <Svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#FFFFFF"><Path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></Svg>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height: 60}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, paddingHorizontal: 15, justifyContent: 'center'}}>
                            <Slider
                                style={{ width: '100%'}}
                                minimumValue={0}
                                maximumValue={progress.duration}
                                value={position}
                                onValueChange={(value) => onValueChange(Number(value))}
                                onSlidingComplete={(value) => onSlidingComplete(Number(value))}
                                thumbTintColor='#FFFFFF'
                                minimumTrackTintColor='#F2F2F2'
                                maximumTrackTintColor='#808080'
                                trackStyle={{height: 2.5, borderRadius: 50}}
                                thumbStyle={{height: 13, width: 13}}
                            />
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20}}>
                        <Text>{formatTime(position)}</Text>
                        <Text>{formatTime(progress.duration)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <Image source={require('../../icons/berurut.png')} style={{height: 24, width: 24}} />
                        </View>
                    </View>
                    <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <TouchableOpacity onPress={handlePrevPress}>
                                <Svg height="22" width="22" viewBox="0 0 51.531 51.531" style={{transform: [{rotate: '180deg'}]}}>
                                    <Path fill="#F5F5F5" d="M44.9,1.963c-3.662,0-6.631,2.969-6.631,6.631V23.81c-0.285-0.324-0.617-0.609-1-0.831L6,4.926
                                    c-1.238-0.715-2.762-0.715-4,0C0.763,5.64,0,6.961,0,8.39v36.104c0,1.43,0.763,2.75,2,3.465c0.619,0.356,1.311,0.535,2,0.535
                                    c0.691,0,1.381-0.179,2-0.535l31.269-18.053c0.383-0.223,0.715-0.508,1-0.832v13.863c0,3.662,2.969,6.631,6.631,6.631
                                    s6.631-2.969,6.631-6.631V8.594C51.531,4.932,48.562,1.963,44.9,1.963z"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                    {isPlaying ? (
                        <View>
                            <TouchableOpacity onPress={handlePause}>
                                <Svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F5F5F5"><Path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></Svg>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity onPress={handlePlay}>
                                <Svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F5F5F5"><Path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></Svg>
                            </TouchableOpacity>
                        </View>
                    )}
                    </View>
                    <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <TouchableOpacity onPress={handleNextPress}>
                                <Svg height="22" width="22" viewBox="0 0 51.531 51.531">
                                    <Path fill="#F5F5F5" d="M44.9,1.963c-3.662,0-6.631,2.969-6.631,6.631V23.81c-0.285-0.324-0.617-0.609-1-0.831L6,4.926
                                    c-1.238-0.715-2.762-0.715-4,0C0.763,5.64,0,6.961,0,8.39v36.104c0,1.43,0.763,2.75,2,3.465c0.619,0.356,1.311,0.535,2,0.535
                                    c0.691,0,1.381-0.179,2-0.535l31.269-18.053c0.383-0.223,0.715-0.508,1-0.832v13.863c0,3.662,2.969,6.631,6.631,6.631
                                    s6.631-2.969,6.631-6.631V8.594C51.531,4.932,48.562,1.963,44.9,1.963z"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#F5F5F5"><Path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></Svg>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const HeaderMusic = () => {
    const navigation = useNavigation();

    return (
        <View style={{height: 80, width: '100%'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                    <View style={{paddingLeft: 20, paddingBottom: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="white" style={{transform: [{rotate: '90deg'}]}}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10, paddingBottom: 20}}>
                        <View style={{height: 10, width: 10, borderColor: 'white', borderWidth: 1.5, borderRadius: 50}}></View>
                        <View style={{height: 10, width: 10, borderColor: 'white', borderWidth: 1.5, borderRadius: 50}}></View>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <View style={{paddingRight: 20, paddingBottom: 10,paddingLeft: 4, paddingTop: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="white"><Path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"/></Svg>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PlayMusicPages;