import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';
import Kullanici from "../Models/UserModel"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoriScreen() {
    const [favoriUrunler, setFavoriUrunler] = useState([]);
    const navigation = useNavigation();

    const FavoriUrunleriGetir = async () => {
        const id = await AsyncStorage.getItem("id")
        console.log(id)
        const response = await api.get("/FavoriteControllers/FavoriUrunler",{
            params:{
                KullaniciID:id
            }
        }
        )
        setFavoriUrunler(response.data)
    };

    useEffect(() => {
        FavoriUrunleriGetir();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Ana Sayfa")} style={styles.closeButton}>
                <FontAwesome name="close" size={35} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.title}>Favori Ürünler</Text>

            <View style={styles.header}>
                <Text style={styles.headerText}>Ürünün Adı</Text>
                <Text style={styles.headerText}>Ürünün Fiyatı</Text>
            </View>

            <FlatList
                data={favoriUrunler}
                keyExtractor={(item) => item.urunID.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Ürün Sayfasi", { data: item })}>
                        <Text style={styles.itemText}>{item.urunAdi}</Text>
                        <Text style={styles.itemText}>{item.urunFiyati}₺</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        backgroundColor: '#ff4d4d',
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});
