import {Text, View, StatusBar, Image, TouchableOpacity, LogBox, TouchableWithoutFeedback, ToastAndroid} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Svg, Path} from 'react-native-svg'
import TextTicker from 'react-native-text-ticker';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event, RepeatMode, State} from 'react-native-track-player';
import MusicControl, { Command } from 'react-native-music-control';
import { useRoute, useNavigation } from '@react-navigation/native';
import repeatImage from '../../icons/repeat1.png';
import shuffleImage from '../../icons/shuffle.png';
import berurutImage from '../../icons/berurut.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayMusicPages = () => {
    const [position, setPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const progress = useProgress();
    const [selectedOption, setSelectedOption] = useState(1);
    const [selected, setselected] = useState(berurutImage);
    const [shuffledIds, setShuffledIds] = useState([]);
    const [totalIds, setTotalIds] = useState(0);
    const [HasSliding, setHasSliding] = useState(false);

    const route = useRoute();
    const receivedMusicId = route.params?.MusicId;
    LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

    useEffect(() => {
        RenderselectedQueQue();
        const RenderShuffle = async () => {
            const getvalue = await AsyncStorage.getItem('QueQueSelected');
            if (!getvalue) {
                await AsyncStorage.setItem('QueQueSelected', '1');
            }

            try {
                const storedIndexes = await AsyncStorage.getItem('shuffledIndexes');
                if (storedIndexes) {
                    setShuffledIds(JSON.parse(storedIndexes));

                }else {
                    getAllTrackIds();
                }
            } catch (error) {
                console.log(error);
            }
        }
        RenderShuffle();
    }, []);

    useEffect(() => {
        const skipMusic = async () => {
            if (receivedMusicId == 999999) {
                const state = await TrackPlayer.getState();
                if (state === State.Playing) {
                    MusicControl.updatePlayback({
                        state: MusicControl.STATE_PLAYING,
                    });
                    setIsPlaying(true);
                }else if(state === State.Paused) {
                    MusicControl.updatePlayback({
                        state: MusicControl.STATE_PAUSED,
                    });
                    setIsPlaying(false);
                }
            }else {
                await TrackPlayer.skip(receivedMusicId);
                await TrackPlayer.play();
                MusicControl.updatePlayback({
                    state: MusicControl.STATE_PLAYING,
                });
                setIsPlaying(true);
            }
        }

        skipMusic();
        updateTrackInfo();
    }, []);
    

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
            artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmA4J9PD5rgcLxyoMFsTnw1jHyEO0w4nk7dA&usqp=CAU',
            artist: artist,
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
                elapsedTime: progress.position,
            });
        };
        updateNotificationPlayback();
    }, [progress.position, progress.duration]);
    
    useEffect(() => {
        if (!HasSliding) {
            // Set nilai position ke nilai progress terbaru
            setPosition(progress.position);
        }

        async function checkTrackPlayerShuffleEnd() {
            const getvalue = await AsyncStorage.getItem('QueQueSelected');
            const selectedvalue = parseInt(getvalue, 10);

            if (selectedvalue == 2) {
                if (progress.duration && progress.position) {
                    const remainingTime = progress.duration - progress.position;
                    if (remainingTime <= 1) {
                        handleNextPress();
                    }
                }
            }
        }

        checkTrackPlayerShuffleEnd();
        
    }, [progress.position]);

    const onSlidingComplete = async (value) => {
        await TrackPlayer.seekTo(value);
    };

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        const RenderShuffle = async () => {
            const storedIndexes = await AsyncStorage.getItem('shuffledIndexes');
            if (storedIndexes) {
                setShuffledIds(JSON.parse(storedIndexes));
            }
        }
        
        updateTrackInfo();
        RenderShuffle();
    });

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async(event) => {
        await TrackPlayer.skip(0);
    });

    const onValueChange = (value) => {
        setPosition(value);
    };

    // bagian control interface music play pause next prev

    const handleNextPress = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        if (!getvalue) {
            console.log("alamak");
            await AsyncStorage.setItem('QueQueSelected', '1');
        }
        const selectedvalue = parseInt(getvalue, 10);
        if (selectedvalue === 1) {
            await TrackPlayer.skipToNext();
        }else if(selectedvalue === 2) {
            const currentIndex = await TrackPlayer.getCurrentTrack();
            const currentId = shuffledIds.indexOf(currentIndex); // Dapatkan indeks dari id yang sedang diputar sekarang

            let nextIndex = currentId + 1;
            if (nextIndex >= shuffledIds.length) {
            nextIndex = 0; // Kembali ke awal array jika sudah mencapai akhir
            }

            await TrackPlayer.skip(shuffledIds[nextIndex]);
            // console.log('next id: ', shuffledIds[nextIndex]);
        }else if(selectedvalue === 3) {
            await TrackPlayer.skipToNext();
        }
        await TrackPlayer.play();
        setIsPlaying(true);
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
        updateTrackInfo();
    };

    const handlePrevPress = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        const selectedvalue = parseInt(getvalue, 10);
        if (selectedvalue === 1) {
            await TrackPlayer.skipToPrevious();

        }else if(selectedvalue === 2) {
            const currentIndex = await TrackPlayer.getCurrentTrack();
            const currentId = shuffledIds.indexOf(currentIndex); // Dapatkan indeks dari id yang sedang diputar sekarang

            let previousIndex = currentId - 1;
            if (previousIndex < 0) {
            previousIndex = shuffledIds.length - 1; // Kembali ke akhir array jika sudah mencapai awal
            }

            await TrackPlayer.skip(shuffledIds[previousIndex]);
            // console.log('previous id: ', shuffledIds[previousIndex]);
        }else if(selectedvalue === 3) {
            await TrackPlayer.skipToPrevious();
        }
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
    };

    const RenderselectedQueQue = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        const selectedvalue = getvalue ? parseInt(getvalue, 10) : 1;
        try {
            if (selectedvalue === 3) {
                setselected(repeatImage);
                await TrackPlayer.setRepeatMode(RepeatMode.Track);
            }else if(selectedvalue === 2) {
                setselected(shuffleImage);
                await TrackPlayer.setRepeatMode(RepeatMode.Off);
            }else if(selectedvalue === 1) {
                setselected(berurutImage);
                await TrackPlayer.setRepeatMode(RepeatMode.Off);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const ChangeSelectedOptions = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        const selectedvalue = parseInt(getvalue, 10);
        try {
            if (selectedvalue === 3) {
                await AsyncStorage.setItem('QueQueSelected', '1');
                await TrackPlayer.setRepeatMode(RepeatMode.Off);
                setSelectedOption(1);
                setselected(berurutImage);
                ToastAndroid.showWithGravityAndOffset(
                    'Pemutaran Berurut',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    0,
                    450
                );
            }else if(selectedvalue === 2) {
                await AsyncStorage.setItem('QueQueSelected', '3');
                await TrackPlayer.setRepeatMode(RepeatMode.Track);
                setSelectedOption(3);
                setselected(repeatImage);
                ToastAndroid.showWithGravityAndOffset(
                    'Ulangi Music',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    0,
                    450
                );
            }else if(selectedvalue === 1) {
                await AsyncStorage.setItem('QueQueSelected', '2');
                await TrackPlayer.setRepeatMode(RepeatMode.Off);
                setSelectedOption(2);
                setselected(shuffleImage);
                ToastAndroid.showWithGravityAndOffset(
                    'Pemutaran Acak',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    0,
                    450
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        MusicControl.on(Command.play, async () => handlePlay());
        MusicControl.on(Command.pause, async () => handlePause());
        MusicControl.on(Command.nextTrack, async () => handleNextPress());
        MusicControl.on(Command.previousTrack, async () => handlePrevPress());
    }, []);


    return (
        <View style={{flex: 1, backgroundColor:'rgb(15,15,15)'}}>
            <StatusBar backgroundColor="transparent" translucent/>
            <HeaderMusic />
            <View style={{flex: 1}}>
                <View style={{height: 350, width: '100%'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <Image source={{uri: currentTrack?.artwork}} style={{height: 300, width: 300, borderRadius: 20}} />
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
                                onSlidingStart={(value) => setHasSliding(true)}
                                onSlidingComplete={(value) => {
                                    setHasSliding(false);
                                    onSlidingComplete(Number(value));
                                }}
                                thumbTintColor='#FFFFFF'
                                minimumTrackTintColor='#F2F2F2'
                                maximumTrackTintColor='#808080'
                                trackStyle={HasSliding ? {height: 2.5, borderRadius: 50, borderWidth: 6, borderColor: 'rgba(58,58,58,0.5)'} : {height: 2.5, borderRadius: 50}}
                                thumbStyle={HasSliding ? {height: 14, width: 14} : {height: 12, width: 12}}
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
                        <TouchableOpacity onPress={ChangeSelectedOptions}>
                            <Image source={selected} style={{height: selectedOption === 1 ? 24 : 26, width: selectedOption === 1 ? 24 : 26}} />
                        </TouchableOpacity>
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