import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { WhiteBalance } from 'expo-camera/build/legacy/Camera.types'
import api from '../api/api'
import { useNavigation } from '@react-navigation/native'
import Kullanici from '../Models/UserModel'
export default function GirisEkrani() {

    const [kullaniciAdi, setKullaniciAdi] = useState("")
    const [sifre, setSifre] = useState("")
    const navigation = useNavigation();

    
    const GirisYap = async()=>{
        const response = await api.post("/KullaniciControllers/KullaniciGiris",{
            KullaniciAdi:kullaniciAdi,
            Sifre:sifre
        })
        console.log(response.data)
        if("Başarıyla Giriş Yaptın" == response.data.message){
            Kullanici.id = response.data.userId;
            navigation.navigate("Ana Sayfa")
        }else{
            Alert.alert(response.data)
        }
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>
                KULLANICI GİRİŞİ
            </Text>
            <Text>
                
            </Text>
        </View>
        
        <View>
            <TextInput
                value={kullaniciAdi}
                onChangeText={setKullaniciAdi}
                placeholder='Kullanici Adi'
                style={styles.input}
            />
            <TextInput
                value={sifre}
                onChangeText={setSifre}
                placeholder='Sifre'
                style={styles.input}
            />
        </View>
        <View style={styles.ButtonContainer}> 
            <TouchableOpacity onPress={GirisYap}>
                <Text style={styles.textGiris}>Giriş Yap</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainerKayıt}> 
            <TouchableOpacity onPress={()=>navigation.navigate("Kayıt Ekranı")}>
                <Text style={styles.textKayit}>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#b0e0e6"
    },
    HeaderText:{
        fontSize:40,
        fontWeight:"bold",
        color:"#FFFFFF",
        height:110
    },
    HeaderContainer:{
        backgroundColor:"#8fbc8f",
        width:300,
        height:150,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        marginBottom:25
    },
    input: {
        width:250, // Genişlik ayarı
        height: 60, // Yükseklik ayarı
        borderColor: '#007BFF', // Kenar rengi
        borderWidth: 1, // Kenar kalınlığı
        borderRadius: 5, // Kenar yuvarlama
        paddingHorizontal: 15, // İç boşluk
        fontSize: 20, // Yazı boyutu
        color: '#333', // Yazı rengi
        backgroundColor: '#fff', // Arka plan rengi
        marginVertical:15
      },
      ButtonContainer:{
        backgroundColor:"#00ced1",
        left:100,
        marginTop:20,
        height:50,
        width:150,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15
      },
      textGiris:{
        fontSize:20,
        fontWeight:"e0ffff",
        color:"white",
        fontWeight:"bold"
      },
      textKayit:{
        fontSize:20,
        fontWeight:"bold",
        color:"#00ced1",
        fontWeight:"bold"
      },
      ButtonContainerKayıt:{
        backgroundColor:"white",
        left:100,
        marginTop:20,
        height:50,
        width:150,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15
      }
})