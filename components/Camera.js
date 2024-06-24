import { StyleSheet, Text, TouchableOpacity, View ,Image,PermissionsAndroid} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { launchCamera } from 'react-native-image-picker';
export default function App() {

    const[cameraPhoto,setCameraPhoto] = useState()
    let options = {
        saveToPhotos : true,
        mediaType:"photo",
        buttonPositive:"OK",
        buttonNegative:"Cancel"
    }
    const openCamera =async ()=>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        )

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("adsdas")
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
            <TouchableOpacity onPress={()=>openCamera}>
                <Text style={{fontSize:25}}>OPEN CAMERA</Text> 
            </TouchableOpacity>
            
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"White"
    },
    img:{
        height:100,
        width:100
    }
})