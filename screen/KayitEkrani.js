import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import api from "../api/api"
import Kullanici from '../Models/UserModel';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KayitEkrani() {
  const navigation = useNavigation()
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [telefonNo, setTelefonNo] = useState('');
  const [cinsiyet, setCinsiyet] = useState(null);
  const [yas, setYas] = useState('');

  const KayitOl = async () => {
    if (!kullaniciAdi || !eposta || !sifre || !telefonNo || !cinsiyet || !yas) {
      console.error("Tüm alanları doldurun!");
      return;
    }
    console.log("asd")
    const userData = {
      KullaniciAdi: kullaniciAdi,
      Eposta: eposta,
      Sifre: sifre,
      TelefonNo: telefonNo,
      Cinsiyet: cinsiyet,
      Yas: yas,
    };
  
    try {
      const response = await api.post("/KullaniciControllers/KullaniciKayit", userData);
  
      if (response.data.message === "okey") {
        Kullanici.id = response.data.userId;
        const idString = JSON.stringify(response.data.userId)
        await AsyncStorage.setItem('id',idString );
        await AsyncStorage.setItem('accessToken', response.data.accesTokenValue);
        await AsyncStorage.setItem('refreshToken', response.data.refreshTokenValue);
        console.log(response.data)

        alert("Kayıt başarılı!");
        navigation.navigate("Ana Sayfa")
        
      } else {
        alert(response.data.message); // Sunucudan gelen hata mesajı
      }
    } catch (error) {
      console.error("Kayıt hatası:", error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={kullaniciAdi}
        onChangeText={setKullaniciAdi}
      />

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={eposta}
        onChangeText={setEposta}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={sifre}
        onChangeText={setSifre}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        value={telefonNo}
        keyboardType="numeric"
        onChangeText={setTelefonNo}
      />

      <Text style={styles.label}>Cinsiyet:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setCinsiyet(true)}
        >
          <Text style={styles.radioText}>Erkek</Text>
          {cinsiyet === true && <View style={styles.radioSelected} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setCinsiyet(false)}
        >
          <Text style={styles.radioText}>Kadın</Text>
          {cinsiyet === false && <View style={styles.radioSelected} />}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={yas}
        onChangeText={setYas}
        keyboardType="numeric"
      />

      <Button title="Kayıt Ol" onPress={KayitOl} color="#e9967a" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#e9967a',
  },
  input: {
    height: 50,
    borderColor: '#e9967a',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e9967a',
  },
});
