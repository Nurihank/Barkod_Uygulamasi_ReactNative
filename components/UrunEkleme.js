import { StyleSheet, Text, View, Modal, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import api from '../api/api'
import { useNavigation } from '@react-navigation/native'

export default function UrunEkleme({ visible, Cikis }) {
    const [urunAdi, setUrunAdi] = useState("")
    const [aciklamasi, setAciklamasi] = useState("")
    const [uzunAciklamasi, setUzunAciklamasi] = useState("")
    const [dosyaYolu, setDosyaYolu] = useState("")
    const navigation = useNavigation();

    const UrunEkle = async () => {
        const response = await api.post("/UrunEkle", {
            urunAdi: urunAdi,
            urunAciklamasi: aciklamasi,
            urunlerResmi: dosyaYolu,
            urunlerUzunAciklama: uzunAciklamasi

        })
        if (response.data.status == 200) {
            setUrunAdi("")
            setAciklamasi("")
            setDosyaYolu("")
            setUzunAciklamasi("")
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
                <Text style={styles.label}>Ürünün Adı</Text>
                <TextInput
                    style={styles.textInput}
                    value={urunAdi}
                    onChangeText={setUrunAdi}
                />
                <Text style={styles.label}>Ürünün Açıklaması</Text>
                <TextInput
                    style={styles.textInput}
                    value={aciklamasi}
                    onChangeText={setAciklamasi}
                />
                <Text style={styles.label}>Ürünün Uzun Açıklaması</Text>
                <TextInput
                    style={styles.textInput}
                    value={uzunAciklamasi}
                    onChangeText={setUzunAciklamasi}
                />
                <Text style={styles.label}>Ürünün Resim Yolu</Text>
                <TextInput
                    style={styles.textInput}
                    value={dosyaYolu}
                    onChangeText={setDosyaYolu}
                />
                <View style={styles.buttonContainer}>
                    <Button title='EKLE' onPress={() => UrunEkle()} />
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