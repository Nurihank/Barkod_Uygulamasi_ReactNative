import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from "../api/api";
import { AntDesign } from '@expo/vector-icons';
import MailModal from './MailModal';

export default function Ayarlar() {

  const navigation = useNavigation();
  const [MailModalVisible,setMailModalVisible] = useState(false)
  const [type,setType] = useState("")

  const CikisYap = () => {
    const showAlert = () => {
      Alert.alert(
        "Çıkış Yapmak İstediğine Emin Misin?",
        "Bu işlem geri alınamaz.",
        [
          {
            text: "Evet",
            onPress: () => Cikis(), 
          },
          {
            text: "Hayır",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    };
  
    const Cikis = async () => {
      await AsyncStorage.clear();
      navigation.navigate("Giriş Ekranı");
    };
  
    showAlert();
  };

  const AnaEkranGeriDon = async () => {
    navigation.navigate("Ana Sayfa");
  };

 const closeModal = ()=>{
  setMailModalVisible(false)
 }

 const SendMailModal = (type)=>{
  setType(type)
  setMailModalVisible(true)
 }

  const FavorileriSifirla = async () => {
    const id = await AsyncStorage.getItem("id");
    console.log(id);
    const showAlert = () => {
      Alert.alert(
        "Favorileri Sıfırlamak İstediğine Emin Misin?",
        "Bu işlem geri alınamaz.",
        [
          {
            text: "Evet",
            onPress: () => Sifirla(), 
          },
          {
            text: "Hayır",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    };

    const Sifirla = async () => {
      try {
        const response = await api.delete("/FavoriteControllers/FavoriSıfırla", {
          headers: {
              'Content-Type': 'application/json' // Sunucunun beklediği içerik türü
          },
          data: {
              KullaniciID: id
          }
        });
        console.log(response.data);
        // Favoriler sıfırlandıktan sonra ek işlemler yapılabilir, örneğin kullanıcı bilgilendirilebilir.
      } catch (error) {
        console.error("Favorileri sıfırlama sırasında bir hata oluştu:", error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir veya loglanabilir.
      }
    };

    showAlert();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={AnaEkranGeriDon} style={styles.button}>
          <AntDesign name="home" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={FavorileriSifirla} style={styles.button}>
          <AntDesign name="heart" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Favorileri Sıfırla</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>İzin Yönetimi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>SendMailModal("Önerileriniz ve Tavsiyeleriniz için")}>
          <AntDesign name="bulb1" size={24} color="black" style={styles.icon}  />
          <Text style={styles.label}>Önerileriniz ve Tavsiyeleriniz</Text>
        </TouchableOpacity>
      </View>
      <MailModal
        visible={MailModalVisible}
        closeModal={closeModal}
        type={type}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>SendMailModal("Şikayetinizi")}>
          <AntDesign name="exclamationcircle" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Şikayet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={CikisYap} style={styles.button}>
          <AntDesign name="logout" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="deleteuser" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Hesabı Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Arka plan rengi
  },
  buttonContainer: {
    backgroundColor: "white",
    width: "95%",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
    marginVertical: 10, // Her bir buton arası boşluk
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row", // Ikon ve metni yan yana yerleştirmek için
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});
