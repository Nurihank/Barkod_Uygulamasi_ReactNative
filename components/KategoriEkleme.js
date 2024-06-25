import { StyleSheet, Text, View, Modal, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import api from '../api/api'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';

export default function KategoriEkleme({ visible, Cikis }) {
   
    const navigation = useNavigation();
    const[kategoriAdi,setKategoriAdi] = useState()

    const KategoriEkle  = async () => {
        const response = await api.post("/KategoriEkle", {
            kategoriAdi: kategoriAdi
        })
        if (response.data.status == 200) {
            setKategoriAdi("")
            Alert.alert("Başarıyla eklendi")
            Cikis() //cikis fonksiyonu çalışır
        }

    }
    return (
        <Modal
            animationType="slide"
            visible={visible}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Kategorinin Adı</Text>
                <TextInput
                    style={styles.textInput}
                    value={kategoriAdi}
                    onChangeText={setKategoriAdi}
                />
                <View style={styles.buttonContainer}>
                    <Button title='EKLE' onPress={() => KategoriEkle()} />
                    <Button title="ÇIKIŞ" onPress={Cikis} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
        alignSelf: 'flex-start'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
})