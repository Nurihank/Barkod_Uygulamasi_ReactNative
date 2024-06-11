import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';

import api from '../api/api';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function App() {

    const navigation = useNavigation()

    const [urunler, seturunler] = useState([])

    const getUrunler = () => {
        const searchApi = async () => {
            const response = await api.get("/UrunGetir")
            seturunler(response.data.data)
        }
        useEffect(() => {
            searchApi()
        }, [])
    }
    getUrunler()
    return (
        <View>
            <View style={{ backgroundColor: "pink", flexDirection: "row" }}>
                <SearchBar />

            </View>
            <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}>ÜRÜN RESMİ</Text>
                <Text style={styles.text}>ÜRÜN AÇIKLAMASI</Text>

            </View>
            <View>
                <FlatList
                    data={urunler}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }} onPress={() => { navigation.navigate("Ürün Sayfasi", { id: item.idUrunler }) }}>
                                <Text>{item.urunAdi} </Text>
                                <Text>{item.urunAciklamasi} </Text>
                            </TouchableOpacity>
                        )
                    }}
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