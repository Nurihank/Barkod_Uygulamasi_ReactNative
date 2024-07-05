import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SearchBar from './SearchBar';
import SearchApi from '../hooks/SearchApi';
import api from '../api/api';

export default function UrunSilme({ visible, Cikis }) {
    const [term, setTerm] = useState("");
    const [UrunGetir] = SearchApi();
    const [gelenUrun, setGelenUrun] = useState([]);

    useEffect(() => {
        UrunleriGetirme(); // İlk renderda ürünleri getir
    }, []);

    const UrunleriGetirme = async () => {
        try {
            const apiResult = await UrunGetir(term); // API çağrısından sonucu aldık
            setGelenUrun(apiResult); // Gelen sonucu set ettik
        } catch (error) {
            console.error("Ürünleri getirirken hata oluştu:", error);
            Alert.alert("Ürünleri getirirken bir hata oluştu.");
        }
    };

    const UrunSil = async (id) => {
        try {
            const response = await api.delete("/UrunControllers", {
                headers: {
                    'Content-Type': 'application/json' // Sunucunun beklediği içerik türü
                },
                data: {
                    Id: id
                }
            });
            if (response.data === "Ürün başarıyla silindi") {
                Alert.alert("Başarıyla silindi");
                UrunleriGetirme(); // Ürünleri tekrar getir
                Cikis(); // Çıkış fonksiyonu çalışır
            } else {
                Alert.alert("Ürün silinirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Ürün silinirken hata oluştu:", error);
            Alert.alert("Ürün silinirken bir hata oluştu.");
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                visible={visible}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Silmek istediğiniz ürünü seçin:</Text>
                    <SearchBar
                        input={term}
                        inputChange={setTerm}
                        inputEnd={UrunleriGetirme}
                    />
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>ÜRÜN ADI</Text>
                        <Text style={styles.headerText}>AÇIKLAMA</Text>
                    </View>
                    <FlatList
                        data={gelenUrun}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => { UrunSil(item.urunID) }}
                            >
                                <Text style={styles.itemText}>{item.urunAdi}</Text>
                                <Text style={styles.itemText}>{item.urunAciklamasi}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="ÇIKIŞ" onPress={Cikis} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 10,
        color: '#333',
        textAlign: 'center',
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6495ed",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
        color: '#555',
    },
    buttonContainer: {
        marginTop: 20,
    },
});
