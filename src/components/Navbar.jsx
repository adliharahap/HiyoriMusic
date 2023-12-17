import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

function Navbar() {
    const navigation = useNavigation();
    return (
        <>
            <View style={{position: 'absolute', bottom: 0, width: '100%', height: 50, backgroundColor: 'rgba(15, 15, 15, 1)', paddingTop: 5}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.navlist}>
                        <TouchableOpacity style={styles.NavIconsCenter} onPress={() => {navigation.navigate('Home');}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white"><Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></Svg>
                            <Text style={styles.navtext}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navlist}>
                        <TouchableOpacity style={styles.NavIconsCenter} onPress={() => {navigation.navigate('SearchMusic');}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white"><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                            <Text style={styles.navtext}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navlist}>
                        <TouchableOpacity style={styles.NavIconsCenter} onPress={() => {navigation.navigate('Music');}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white"><Path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></Svg>
                            <Text style={styles.navtext}>Music</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navlist}>
                        <TouchableOpacity style={styles.NavIconsCenter} onPress={() => {navigation.navigate('Playlist');}}>
                            <Svg height="28" viewBox="0 -960 960 960" width="28" fill="white"><Path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></Svg>
                            <Text style={styles.navtext}>Playlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    navlist: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    NavIconsCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    navtext: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    }
});

export default Navbar;