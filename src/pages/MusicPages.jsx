import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import { Svg, Path} from 'react-native-svg';
import MusicList from '../components/MusicComponent/MusicList';
import LinearGradient from 'react-native-linear-gradient';
import { db } from '../utils/databases/database';
import Modal from "react-native-modal";
import deleteAllData from '../../coba';

const MusicPages = () => {
    const [ModalVisibel, setModalVisibel] = useState(false);
    const [musicData, setMusicData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [isFloatBtnHidden, setBtnHidden] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();

    const toggleModal = () => {
        setModalVisibel(!ModalVisibel);
        
    };

    const getMusicData = async (sortBy) => {
        setStartIndex(0);
        // Ambil data dari database dan set ke state musicData
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MusicMetadata;',
                [],
                (_, result) => {
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
                },
                (error) => {
                    console.error('Error selecting data: ', error);
                }
            );
        });
    }

    const sortData = (data, sortBy) => {
        const dateParser = (dateString) => {
            const [day, month, year, time] = dateString.split(/[\/\s:.]/);
            return new Date(`${year}-${month}-${day} ${time}`);
        };

        switch (sortBy) {
            case 'title':
                return data.sort((a, b) => a.Title.localeCompare(b.Title));
            case 'artist':
                return data.sort((a, b) => a.Artist.localeCompare(b.Artist));
            case 'album':
                return data.sort((a, b) => a.Album.localeCompare(b.Album));
            case 'year':
                return data.sort((a, b) => dateParser(b.FileDate) - dateParser(a.FileDate));
            default:
                // Jika sortBy tidak sesuai dengan pilihan yang valid, kembalikan data tanpa pengurutan.
                return data;
        }
    }

    useEffect(() => {
        getMusicData('year');
    }, []);

    const handleAutoTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleScrollFltBTN = (event) => {
        const { y } = event.nativeEvent.contentOffset;
        
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

    return (
        <>
            {!isFloatBtnHidden && (
                <Animated.View style={[style.floatingButton, slideStyle]}>
                    <TouchableOpacity onPress={handleAutoTop} style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" style={{transform: [{rotate: '-90deg'}]}} height="24" viewBox="0 -960 960 960" width="24" fill={"white"}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )}
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
                                <View style={{marginRight: 20}}>
                                    <Svg height="30" viewBox="0 -960 960 960" width="30" fill="white" style={{marginLeft: 10}}><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                                </View>
                                <View>
                                    <Svg height="30" viewBox="0 -960 960 960" width="30" fill="white"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                                </View>
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
                    {musicData.map((musicInfo, index) => (
                        <TouchableOpacity key={index} onPress={() => {console.log("kont", index);}}>
                            <MusicList
                            id={musicInfo.ID}
                            img={musicInfo.ThumnailData} 
                            title={musicInfo.Title} 
                            artist={musicInfo.Artist} 
                            duration={musicInfo.Duration} 
                            path={musicInfo.Uri} 
                            favorite={musicInfo.Favorite} 
                            filedate={musicInfo.FileDate} 
                            filesize={musicInfo.FileSize} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Modal 
                style={{ margin: 0, padding: 0 }}
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
                                <SortirMusiclist title="Judul"  />
                                <SortirMusiclist title="Artist" focus="true" />
                                <SortirMusiclist title="Album" />
                                <SortirMusiclist title="Tahun Ditambahkan" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const SortirMusiclist = (props) => {
    const {title, focus = false} = props

    let focusdata = focus;

    return (
        <View style={{ height: 70, width: '100%', paddingHorizontal: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: focusdata ? 'rgba(255,255,255,0.3)' : 'transparent'}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#ffffff'}}>{title}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        height: 40,
        width: 40,
        backgroundColor: '#3c1361',
        borderRadius: 50,
        bottom: 100,
        right: 50,
        zIndex: 999,
    },
});

export default MusicPages;