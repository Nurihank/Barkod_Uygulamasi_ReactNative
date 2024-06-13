import { StyleSheet, Text, View, Modal, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import SearchApi from '../hooks/SearchApi';
import api from '../api/api';

export default function UrunSilme({ visible, Cikis }) {
    const [term, setTerm] = useState("");
    const [UrunGetir] = SearchApi();
    const [gelenUrun, setGelenUrun] = useState([]);

    const UrunleriGetirme = async () => {
        const apiResult = await UrunGetir(term); // api çağrısından sonucu aldık
        setGelenUrun(apiResult); // gelen sonucu set ettik
    }

    useEffect(() => {
        UrunleriGetirme()
    }, [])

    const UrunSil = async (id) => {
        const response = await api.delete("/UrunSil", {
            params: {
                idUrunler: id
            }
        })
        UrunleriGetirme()
        if (response.data.status == 200) {
            Alert.alert("Başarıyla silindi")
            UrunleriGetirme()
            Cikis() //cikis fonksiyonu çalışır
        }
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                visible={visible}
            >
                <View>
                    <Text style={styles.title}>Silmek istediğin ürünü yaz ve seç</Text>
                    <View style={{ backgroundColor: "", flexDirection: "row" }}>
                        <SearchBar
                            input={term}
                            inputChange={setTerm}
                            inputEnd={UrunleriGetirme}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#6495ed" }}>
                        <Text style={styles.TextLeft}>ÜRÜNLER</Text>
                        <Text style={styles.TextRight}>ÜRÜN ACIKLAMASI</Text>
                    </View>
                    <View>
                        <FlatList
                            data={gelenUrun}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}
                                        onPress={() => { UrunSil(item.idUrunler) }}>
                                        <Text style={styles.itemText}> {item.urunAdi}</Text>
                                        <Text style={styles.itemText}>{item.urunAciklamasi}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="ÇIKIŞ" onPress={Cikis} />
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 16,
        color: '#333',
    },
    itemText: {
        fontSize: 16,
        color: '#555',
    },
    TextLeft: {
        fontSize: 20
        , fontWeight: "bold",
        margin: 5,
        marginLeft: 18
    },
    TextRight: {
        fontSize: 20
        , fontWeight: "bold",
        margin: 5,
        marginRight: 18
    }, buttonContainer: {
        marginTop: 15,
    }
});

