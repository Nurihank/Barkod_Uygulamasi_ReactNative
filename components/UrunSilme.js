import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SearchBar from './SearchBar';
import SearchApi from '../hooks/SearchApi';
import api from '../api/api';

export default function UrunSilme({ visible, Cikis }) {
    const [term, setTerm] = useState("");
    const [UrunGetir] = SearchApi();
    const [gelenUrun, setGelenUrun] = useState([]);
   // const [silinecekUrunID, setSilinecekUrunID] = useState(null); // Silinecek ürünün ID'sini saklar

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

    const handleUrunSil = (id) => {
        
        Alert.alert(
            "Emin misiniz?",
            "Ürünü silmek istediğinizden emin misiniz?",
            [
                { text: "Hayır", style: "cancel" },
                { text: "Evet", onPress: () => UrunSil(id) }
            ]
        );
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <View style={styles.centeredView}>
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
                                onPress={() => handleUrunSil(item.urunID)} // onPress event'i ile handleUrunSil fonksiyonunu çağır
                            >
                                <Text style={styles.itemText}>{item.urunAdi}</Text>
                                <Text style={styles.itemText}>{item.urunAciklamasi}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="ÇIKIŞ" onPress={Cikis} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%', // Modal içeriğinin ekran yüksekliğinin en fazla %80'sini kaplamasını sağlar
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
