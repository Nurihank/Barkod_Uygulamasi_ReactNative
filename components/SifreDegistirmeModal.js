import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import api from '../api/api';

export default function SifreDegistirmeModal({ visible, Cikis, KullaniciAdi }) {
    const [yeniSifre, setYeniSifre] = useState('');
    const [sifreTekrar, setSifreTekrar] = useState('');

    const SifreDegistir = async() => {
        if(sifreTekrar == yeniSifre){
            const response = await api.put("/KullaniciControllers/SifreDegistir",{
                Sifre:yeniSifre,
                KullaniciAdi:KullaniciAdi
            })
            setYeniSifre("")
            setSifreTekrar("")
            Alert.alert("Şifreyi Başarıyla Değiştiniz")
            Cikis();  
        }
        else{
            setYeniSifre("")
            setSifreTekrar("")
            Alert.alert("şifreler aynı değil")
        }
        
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={Cikis}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Şifre Değiştirme</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Yeni Şifre:</Text>
                    <TextInput
                        placeholder="Yeni Şifre"
                        value={yeniSifre}
                        onChangeText={setYeniSifre}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Şifre Tekrar:</Text>
                    <TextInput
                        placeholder="Şifre Tekrar"
                        value={sifreTekrar}
                        onChangeText={setSifreTekrar}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={SifreDegistir}>
                    <Text style={styles.submitButtonText}>Şifreyi Değiştir</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    closeButton: {
        fontSize: 24,
        color: 'red',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#48d1cc',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
