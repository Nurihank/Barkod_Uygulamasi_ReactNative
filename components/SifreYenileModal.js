import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

export default function SifreYenileModal({ visible, Cikis,kullaniciAdi,SifreYenilendiCikis }) {
  const [yeniSifre, setYeniSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
    const navigation = useNavigation()
  const sifreYenile = async() => {
    if(yeniSifre == sifreTekrar){
        const response =  await api.put("/KullaniciControllers/SifreYenile",{
            KullaniciAdi:kullaniciAdi,
            Sifre:yeniSifre
        })

        if(response.data){
           SifreYenilendiCikis()
        }
    }else{
        Alert.alert("şifreler aynı değil")
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.cikisContainer}>
          <TouchableOpacity onPress={Cikis}>
            <Text style={styles.closeButton}>✖️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Şifre Yenile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Yeni Şifre</Text>
          <TextInput
            placeholder='Yeni Şifre'
            value={yeniSifre}
            onChangeText={setYeniSifre}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Şifreyi Tekrar Girin</Text>
          <TextInput
            placeholder='Şifre Tekrar'
            value={sifreTekrar}
            onChangeText={setSifreTekrar}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={sifreYenile}>
          <Text style={styles.submitButtonText}>Şifreyi Yenile</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  cikisContainer: {
    alignItems: "flex-end",
    margin: 20,
  },
  closeButton: {
    fontSize: 40,
    color: "#e63946",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#0077b6",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: '100%',
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
