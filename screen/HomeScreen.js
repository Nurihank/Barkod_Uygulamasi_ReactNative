import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import api from '../api/api';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';
import Urunler from './Urunler';

export default function App() {
    const navigation = useNavigation();
    const [result, UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);

    const deneme = async () => {
        console.log("1*****************");
        console.log(term);

        const apiResult = await UrunGetir(term); // API çağrısından sonucu al
        console.log(apiResult);
        setGelenUrun(apiResult); // Yeni sonucu state'e ata
        console.log("2*************************");
    }

    return (
        <View>
            <View style={{ backgroundColor: "pink", flexDirection: "row" }}>
                <SearchBar
                    input={term}
                    inputChange={setTerm}
                    inputEnd={deneme}
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
            <View style={{ backgroundColor: "red" }}>
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
    }
});
