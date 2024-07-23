import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { WhiteBalance } from 'expo-camera/build/legacy/Camera.types'
import api from '../api/api'
import { useNavigation } from '@react-navigation/native'
import Kullanici from '../Models/UserModel'
import SifremiUnuttumModal from '../components/SifremiUnuttumModal'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GirisEkrani() {

    const [kullaniciAdi, setKullaniciAdi] = useState("")
    const [sifre, setSifre] = useState("")
    const navigation = useNavigation();
    const[SifremiUnuttumModalVisible,setSifremiUnuttumVisible] = useState(false);
    
    const GirisYap = async()=>{
        const response = await api.post("/KullaniciControllers/KullaniciGiris",{
            KullaniciAdi:kullaniciAdi,
            Sifre:sifre
        })
   
        if("Başarıyla Giriş Yaptın" == response.data.message){
          console.log(response.data)

          await AsyncStorage.setItem('accessToken', response.data.accesTokenValue);
          await AsyncStorage.setItem('refreshToken', response.data.refreshTokenValue);
          await AsyncStorage.setItem('id', response.data.userId);

            Kullanici.image = response.data.image;
            Kullanici.id = response.data.userId;
            navigation.navigate("Ana Sayfa")
            setKullaniciAdi("")
            setSifre("")
        }else{
            Alert.alert(response.data)
            setKullaniciAdi("")
            setSifre("")
        }
    }
    
    const SifremiUnuttumModalCikis = ()=>{
      setSifremiUnuttumVisible(false)
    }

  return (
    <View style={styles.container}>
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>
                GİRİŞ YAP
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
                secureTextEntry
                style={styles.input}
            />
        </View>
        <View style={styles.sifremiUnuttumContainer}>
          <TouchableOpacity onPress={()=>setSifremiUnuttumVisible(true)}>
            <Text style={{fontWeight:"bold"}}>
              Şifremi Unuttum
            </Text>
          </TouchableOpacity>
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
        <SifremiUnuttumModal
          visible={SifremiUnuttumModalVisible}
          Cikis={SifremiUnuttumModalCikis}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f7fa", // Açık mavi
  },
  HeaderContainer: {
    backgroundColor: "#ffffff", // Beyaz
    width: 300,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 25,
  },
  HeaderText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00796b", // Koyu yeşil
    height: 50,
  },
  input: {
    width: 275,
    height: 45,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#333',
    backgroundColor: '#ffffff',
    marginVertical: 15,
  },
  ButtonContainer: {
    backgroundColor: "#00796b", // Koyu yeşil
    left: 70,
    marginTop: 20,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textGiris: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  textKayit: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b",
  },
  ButtonContainerKayıt: {
    backgroundColor: "#ffffff", // Beyaz
    left: 70,
    marginTop: 20,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00796b", // Kenar rengi
  },
  sifremiUnuttumContainer:{
    left:120
  }
});
