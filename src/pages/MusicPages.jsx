import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, Animated, StyleSheet, TouchableWithoutFeedback, FlatList} from 'react-native';
import { Svg, Path} from 'react-native-svg';
import MusicList from '../components/MusicComponent/MusicList';
import LinearGradient from 'react-native-linear-gradient';
import { db } from '../utils/databases/database';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const MusicPages = () => {
    const navigation = useNavigation();
    const [ModalVisibel, setModalVisibel] = useState(false);
    const [musicData, setMusicData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [isFloatBtnHidden, setBtnHidden] = useState(false);
    const [sortirList, setSortirList] = useState("title");
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();

    // usestate focusbutton di sortir music option
    const [autotophide, setautotophide] = useState(0);
    const [judulfocus, setjudulfocus] = useState("true");
    const [artistfocus, setartistfocus] = useState("");
    const [albumfocus, setalbumfocus] = useState("");
    const [ondatefocus, setondatefocus] = useState("");

    const toggleModal = () => {
        setModalVisibel(!ModalVisibel);
    };

    const getMusicData = async (sortBy) => {
        setStartIndex(0);
        // Ambil data dari database dan set ke state musicData
        await new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MusicMetadata;',
                [],
                async (_, result) => {
                    const rows = result.rows;
                    const data = [];
                    for (let i = 0; i < rows.length; i++) {
                        data.push({
                            ...rows.item(i),
                            index: startIndex + i,
                        });
                    }
                    const sortedData = sortData(data, sortBy);
                    setMusicData(sortedData);
                    setStartIndex((prevIndex) => prevIndex + rows.length);

                    const newPlaylist = sortedData.map((item) => {
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
                    await TrackPlayer.reset();
                    await TrackPlayer.add(newPlaylist);
                    resolve();
                },
                (error) => {
                    console.error('Error selecting data: ', error);
                    reject(error);
                }
            );
        });
        });
    }

    const sortData = (data, sortBy) => {

        switch (sortBy) {
            case 'title':
                return data.sort((a, b) => a.Title.localeCompare(b.Title));
            case 'artist':
                return data.sort((a, b) => a.Artist.localeCompare(b.Artist));
            case 'album':
                return data.sort((a, b) => a.Album.localeCompare(b.Album));
            case 'ondate':
                return data.sort((a, b) => a.FileDate.localeCompare(b.FileDate));
            default:
                // Jika sortBy tidak sesuai dengan pilihan yang valid, kembalikan data tanpa pengurutan.
                return data;
        }
    }

    const changeSortirList = (sortir) => {
        let sortirListValue = "";
        let focusValues = { judul: "", artist: "", album: "", ondate: "" };

        switch (sortir) {
            case "Judul":
                sortirListValue = "title";
                focusValues.judul = "true";
            break;
            case "Artist":
                sortirListValue = "artist";
                focusValues.artist = "true";
            break;
            case "Album":
                sortirListValue = "album";
                focusValues.album = "true";
            break;
            default:
                sortirListValue = "ondate";
                focusValues.ondate = "true";
        }

        setSortirList(sortirListValue);
        setTimeout(() => {
            toggleModal();
        }, 500);

        setjudulfocus(focusValues.judul);
        setartistfocus(focusValues.artist);
        setalbumfocus(focusValues.album);
        setondatefocus(focusValues.ondate);
    }

    useEffect(() => {
        getMusicData(sortirList);
    }, [sortirList]);

    const handleAutoTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleScrollFltBTN = (event) => {
        const { y } = event.nativeEvent.contentOffset;
        setautotophide(1);
        // Jika posisi scroll mencapai y = 0, sembunyikan komponen
        if (y <= 150) {
            hideButton();
        } else {
            showButton();
        }
    };

    const showButton = () => {
        if (isFloatBtnHidden) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        
            setBtnHidden(false);
        }
    };
    
    const hideButton = () => {
        if (!isFloatBtnHidden) {
            Animated.timing(slideAnim, {  
                toValue: 100,
                duration: 500,
                useNativeDriver: true,
            }).start();
    
            setBtnHidden(true);
        }
    };
    
    const slideStyle = {
        transform: [
            {
                translateX: slideAnim.interpolate({
                    inputRange: [0, 500],
                    outputRange: [0, 500],
                }),
            },
        ],
    };

    const style = StyleSheet.create({
        floatingButton: {
            position: 'absolute',
            height: 40,
            width: 40,
            backgroundColor: 'rgba(60, 19, 97,0.8)',
            borderRadius: 50,
            bottom: 120,
            right: 50,
            zIndex: 999,
            opacity: autotophide,
        },
    });

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => {
                
                navigation.navigate('Musicplay', { MusicId: index})
                }}>
                <MusicList
                    id={index}
                    img={item.ThumnailData} 
                    title={item.Title} 
                    artist={item.Artist} 
                    album={item.Album} 
                    duration={item.Duration} 
                    path={item.Uri} 
                    favorite={item.Favorite} 
                    filedate={item.FileDate} 
                    filesize={item.FileSize}
                />
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item) => String(item.index);

    return (
        <>
            <Animated.View style={[style.floatingButton, slideStyle]}>
                <TouchableOpacity onPress={handleAutoTop} style={{flex: 1}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" style={{transform: [{rotate: '-90deg'}]}} height="24" viewBox="0 -960 960 960" width="24" fill={"white"}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <ScrollView ref={scrollViewRef} onScroll={handleScrollFltBTN} scrollEventThrottle={16} style={{backgroundColor: 'rgba(15, 15, 15, 1)', flex: 1}} showsVerticalScrollIndicator={false}>
                <StatusBar translucent={true} backgroundColor={"transparent"} />
                <LinearGradient colors={['rgba(131, 0, 0, 1)', 'rgba(15, 15, 15, 1)']} locations={[0, 0.6]} style={{height: 330, position: 'absolute', top: 0, width: '100%'}}></LinearGradient>
                <View>
                    <View style={{height: 120, paddingHorizontal: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50}}>
                                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 36, color: 'rgb(255,255,255)'}}>All Music</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{marginRight: 20}}>
                                    <Svg height="30" viewBox="0 -960 960 960" width="30" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {console.log("aoa wak");}}>
                                    <Svg height="30" viewBox="0 -960 960 960" width="30" fill="white"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 50, marginTop: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: 'rgb(255,255,255)'}}>{startIndex} Music</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={toggleModal}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 15}}>
                                    <Image source={require('../icons/sortir.png')} style={{height: 26, width: 26}} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, minHeight: 500, paddingBottom: 50}}>
                    <FlatList
                        scrollEnabled={false}
                        data={musicData}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                    />
                </View>
            </ScrollView>
            <Modal 
                style={{ margin: 0, padding: 0, zIndex:999 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={ModalVisibel}
                coverScreen={false}
                onBackButtonPress={toggleModal}
                transparent={true}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{width: '80%', height: '50%', backgroundColor: 'rgba(20,20,30,1)', borderRadius: 15}}>
                        <View style={{flex: 1}}>
                            <View style={{height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, borderBottomColor: '#848484', borderBottomWidth: 1.5}}>
                                <View>
                                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 16, color: '#ffffff'}}>Urut Berdasarkan</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><Path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></Svg>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, paddingVertical: 20}}>
                                <SortirMusiclist expfunction={changeSortirList} title="Judul" focus = {judulfocus} />
                                <SortirMusiclist expfunction={changeSortirList} title="Artist" focus ={artistfocus} />
                                <SortirMusiclist expfunction={changeSortirList} title="Album"  focus = {albumfocus} />
                                <SortirMusiclist expfunction={changeSortirList} title="Tahun Ditambahkan" focus = {ondatefocus} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const SortirMusiclist = (props) => {
    const {title, expfunction , focus = false} = props

    let focusdata = focus;

    return (
        <TouchableWithoutFeedback onPress={() => {expfunction(title)}}>
            <View style={{ height: 70, width: '100%', paddingHorizontal: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: focusdata ? 'rgba(255,255,255,0.3)' : 'transparent'}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#ffffff'}}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MusicPages;