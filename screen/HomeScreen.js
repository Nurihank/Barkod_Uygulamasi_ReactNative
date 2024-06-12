import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';


export default function App() {
    const navigation = useNavigation();
    const [UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);

    const UrunleriGetirme = async () => {
        const apiResult = await UrunGetir(term); // api çağrısından sonucu aldık
        setGelenUrun(apiResult); // gelen sonucu set ettik
    }

    return (
        <View>
            <View style={{ backgroundColor: "pink", flexDirection: "row" }}>
                <SearchBar
                    input={term}
                    inputChange={setTerm}
                    inputEnd={UrunleriGetirme}
                />
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <TouchableHighlight style={{ marginHorizontal: 10 }} onPress={() => { Alert.alert("Ekleme") }}>
                        <FontAwesome5 name="plus-circle" size={24} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight style={{ marginRight: 15 }} onPress={() => { Alert.alert("Silme") }}>
                        <FontAwesome5 name="trash" size={24} color="black" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.HeadText}>ÜRÜN</Text>
                <Text style={styles.HeadText}>ÜRÜN ACIKLAMASI</Text>
            </View>
            <View style={{}}>
                <FlatList
                    data={gelenUrun}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }} onPress={() => { navigation.navigate("Ürün Sayfasi", { id: item.idUrunler }) }}>
                                <Text>{item.urunAdi}</Text>
                                <Text>{item.urunAciklamasi}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.idUrunler.toString()}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17
    },
    image: {
        height: 250,
        width: 250
    },
    HeadText: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 16
    },
    image: {
        height: 100,
        width: 100
    }
});
