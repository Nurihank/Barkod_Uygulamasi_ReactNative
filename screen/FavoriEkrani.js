import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

export default function FavoriScreen() {
    const [favoriUrunler, setFavoriUrunler] = useState([]);
    const navigation = useNavigation();

    const FavoriUrunleriGetir = async () => {
        const response = await api.get("/FavoriteControllers");
        setFavoriUrunler(response.data);
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
        backgroundColor: '#f8f8f8', // Light background color
        padding: 20, // Padding around the container
        alignItems: 'center', // Center content horizontally
    },
    closeButton: {
        alignSelf: 'flex-end', // Align to the right
        marginBottom: 20, // Space below the button
        backgroundColor: '#ff4d4d', // Button background color
        borderRadius: 10, // Rounded corners
        padding: 10, // Inner spacing for the button
    },
    title: {
        fontSize: 24, // Title font size
        fontWeight: 'bold', // Bold font weight
        marginBottom: 20, // Space below the title
        color: '#333', // Dark text color
    },
    header: {
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Space items evenly
        width: '100%', // Full width
        borderBottomWidth: 1, // Bottom border
        borderBottomColor: '#ccc', // Border color
        paddingBottom: 10, // Space below header
        marginBottom: 10, // Space below header
    },
    headerText: {
        fontSize: 18, // Header text size
        fontWeight: 'bold', // Bold text
        color: '#555', // Darker gray text
    },
    item: {
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Space items evenly
        padding: 15, // Inner spacing
        borderBottomWidth: 1, // Bottom border for items
        borderBottomColor: '#eee', // Light gray border color
        width: '100%', // Full width
        backgroundColor: '#fff', // White background for items
        borderRadius: 5, // Rounded corners
        marginBottom: 5, // Space below items
        elevation: 2, // Shadow effect for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 2, // Shadow radius
    },
    itemText: {
        fontSize: 16, // Item text size
        color: '#333', // Dark text color
    },
});
