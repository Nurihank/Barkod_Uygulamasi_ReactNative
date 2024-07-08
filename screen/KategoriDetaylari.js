import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function KategoriDetaylari({ route }) {
    const [gelenUrun, setGelenUrun] = useState([]);
    const navigation = useNavigation();

    // API'den kategoriye göre ürünleri getir
    const kategoriyeGoreUrunGetirme = async () => {
        try {
            
            const response = await api.get('/KategoriControllers/'+route.params.Kategori.kategoriID);
            console.log(response.data)
            setGelenUrun(response.data)
        } catch (error) {
            console.log('API hatası:', error);
            // Hata durumunda gerekli işlemler yapılabilir (ör. kullanıcıya bildirim gösterme)
        }
    };

    // Component ilk kez yüklendiğinde kategoriye göre ürünleri getir
    useEffect(() => {
        kategoriyeGoreUrunGetirme();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{route.params.kategoriAdi} Kategorisi</Text>
            </View>
            <FlatList
                data={gelenUrun}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate('Ürün Sayfasi', { data: item });
                        }}>
                        <Text style={styles.itemText}>{item.urunAdi}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});
