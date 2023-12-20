import { View, Text, TouchableOpacity, Button, Platform } from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PermisionFileBoarding = () => {
    const navigation = useNavigation();
    const askfilepermisions = (permissions) => {
        request(permissions).then(result => {
            console.log(result);

            if (result === RESULTS.GRANTED) {
                console.log("alhamdullilah");
                // navigation.replace('Home');
            }else if(result === RESULTS.DENIED) {
                console.log("astafirullah");
            }
        });
    };


    return (
        <>
            <View style={{backgroundColor: 'rgba(15, 15, 15, 1)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {/* <Text>PermisionFileBoarding</Text> */}
                <Button title='Berikan Izin' onPress={() => {
                    if (Platform.OS=='android') {
                        askfilepermisions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                        askfilepermisions(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
                    } else {
                        console.log("this app only support for android");
                    }
                }}/>
            </View>
        </>
    );
};
// onPress={handlePermissionButtonPress} style={{backgroundColor: '#454666', height: 60, width: 180, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
export default PermisionFileBoarding;