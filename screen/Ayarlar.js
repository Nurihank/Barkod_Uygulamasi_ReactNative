import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Ayarlar() {
  const navigation = useNavigation()

  const Kapat = async()=>{
    await AsyncStorage.clear();
    navigation.navigate("Giriş Ekranı")

  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Favorileri Temizle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text  style={styles.label}>Önerileriniz ve Tavsiyeleriniz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Şikayet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={Kapat}>
            <Text style={styles.label}>Hesabı Kapat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        
    },buttonContainer:{
        backgroundColor:"gray",
        width:"90%",
        alignItems:"center",
        borderWidth:2,
        borderRadius:15,
        height:60
    },
    label:{
        fontSize:20,
        fontWeight:"bold"
    }

})
