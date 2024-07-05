import { StyleSheet, Text, View, Modal, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function UrunEkleme({ visible, Cikis }) {
    const [urunAdi, setUrunAdi] = useState("");
    const [aciklamasi, setAciklamasi] = useState("");
    const [uzunAciklamasi, setUzunAciklamasi] = useState("");
    const [dosyaYolu, setDosyaYolu] = useState();
    const navigation = useNavigation();

    const UrunEkle = async () => {
        const response = await api.post("/UrunControllers", {
            UrunAdi: urunAdi,
            UrunAciklamasi: aciklamasi,
            KategoriID: uzunAciklamasi,
            //KategoriID: dosyaYolu,
        });
        if (response.data == "Başarıyla eklendi") {
            setUrunAdi("");
            setAciklamasi("");
            setDosyaYolu("");
            setUzunAciklamasi("");
            Alert.alert("Başarıyla eklendi");
            Cikis(); //cikis fonksiyonu çalışır
        }
    };

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
                <Text style={styles.label}>Kategori ID</Text>
                <TextInput
                    style={styles.textInput}
                    value={uzunAciklamasi}
                    onChangeText={setUzunAciklamasi}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => UrunEkle()}>
                        <FontAwesome5 name="plus" size={20} color="white" />
                        <Text style={styles.buttonText}>EKLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={Cikis}>
                        <FontAwesome5 name="times" size={20} color="white" />
                        <Text style={styles.buttonText}>ÇIKIŞ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        alignSelf: 'flex-start',
        color: '#333',
    },
    textInput: {
        height: 50, // Increased height
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15, // Increased padding
        marginVertical: 5,
        width: '100%',
        backgroundColor: 'white',
        fontSize: 16, // Increased font size
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9967a',
        padding: 15, // Increased padding
        borderRadius: 5,
        width: '45%',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 16, // Increased font size
    },
});
