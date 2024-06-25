import { StyleSheet, Text, TouchableOpacity, View ,Image,PermissionsAndroid} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchCamera } from 'react-native-image-picker';
export default function App() {

    const[cameraPhoto,setCameraPhoto] = useState()

    const openCamera =async ()=>{   
       const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        ) 
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("izin")
            const result = await launchCamera({
                saveToPhotos : true,
                mediaType:"photo",
                buttonPositive:"OK",
                buttonNegative:"Cancel"
            })
            setCameraPhoto(result.assets[0]?.uri) 
        }
    }
    return (
    <View style={styles.container}>
        <View>
            <Image resizeMode='contain' style={styles.img} source={{uri:cameraPhoto}}/>
            <TouchableOpacity onPress={openCamera}>
                <MaterialCommunityIcons name="qrcode-scan" size={40} color="black" /> 
            </TouchableOpacity>
            
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    
})