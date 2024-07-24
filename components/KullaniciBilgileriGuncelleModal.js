import { Modal, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../api/api';
import Kullanici from '../Models/UserModel.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KullaniciBilgileriGuncelleModal({ visible, Cikis, kullaniciBilgisi }) {
    const [yas, setYas] = useState("");
    const [telefonNo, setTelefonNo] = useState("");
    const [cinsiyet, setCinsiyet] = useState(true);

    useEffect(() => {
        setTelefonNo(kullaniciBilgisi.telefonNo)
        setYas(kullaniciBilgisi.yas)
    }, [kullaniciBilgisi]);
    const handleUpdate = async () => {
        const id = await AsyncStorage.getItem("id")
        try {
            const response = await api.put("/KullaniciControllers/KullaniciGuncelle", {
                KullaniciID:id,
                TelefonNo: telefonNo,
                Cinsiyet: cinsiyet,
                Yas: yas
            });
            if(response.data == true){
                Cikis()
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    if (!kullaniciBilgisi) {
        return (
            <Modal visible={visible}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                </View>
            </Modal>
        );
    }

    return (
        <Modal visible={visible}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Kullanici Bilgilerini Guncelle</Text>
            </View>
            
            <View style={styles.contentContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.infoText}>Kullanıcı Adı:</Text>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="lock" size={20} color="#4CAF50" />
                        <Text style={styles.infoValue}>{kullaniciBilgisi.kullaniciAdi}</Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.infoText}>E-posta:</Text>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="lock" size={20} color="#4CAF50" />
                        <Text style={styles.infoValue}>{kullaniciBilgisi.eposta}</Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.infoText}>Yaş:</Text>
                    <TextInput
                        style={styles.input}
                        value={String(yas)}
                        onChangeText={setYas}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.infoText}>Telefon Numarası:</Text>
                    <TextInput
                        style={styles.input}
                        value={String(telefonNo)}
                        onChangeText={setTelefonNo}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.infoText}>Cinsiyet:</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderCard, cinsiyet === "Erkek" && styles.selectedCard]}
                            onPress={() => setCinsiyet(true)}
                        >
                            <Text style={styles.genderText}>Erkek</Text>
                            {cinsiyet === true && (
                                <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderCard, cinsiyet === "Kadın" && styles.selectedCard]}
                            onPress={() => setCinsiyet(false)}
                        >
                            <Text style={styles.genderText}>Kadın</Text>
                            {cinsiyet === false && (
                                <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Güncelle</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.closeButtonContainer} onPress={Cikis}>
                <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    cikisContainer: {
        position: 'absolute',
        right: 10,
        top: 15,
        width: 50,
    },
    closeButton: {
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
    },
    closeButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 5,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    contentContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    infoText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#333',
    },
    infoValue: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderCard: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#f9f9f9',
    },
    selectedCard: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    genderText: {
        fontSize: 18,
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    updateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
