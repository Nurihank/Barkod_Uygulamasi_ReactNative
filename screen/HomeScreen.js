import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';
import UrunEkleme from '../components/UrunEkleme';
import UrunSilme from '../components/UrunSilme';

export default function App() {
    const navigation = useNavigation();
    const [UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);
    const [urunEkleVisible, setUrunEkleVisible] = useState(false);
    const [urunSilVisible, setUrunSilVisible] = useState(false);


    const UrunleriGetirme = async () => {
        const apiResult = await UrunGetir(term); // api çağrısından sonucu aldık
        setGelenUrun(apiResult); // gelen sonucu set ettik
    };
    useEffect(() => {
        UrunleriGetirme();
    }, []);

    const Cikis = () => { //modaldan çıkışı sağlıyoz
        setUrunEkleVisible(false);
        setUrunSilVisible(false);
        UrunleriGetirme();
    };

    return (
        <View>
            <View style={{ backgroundColor: "pink", flexDirection: "row" }}>
                <SearchBar
                    input={term}
                    inputChange={setTerm}
                    inputEnd={UrunleriGetirme}
                />
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <TouchableHighlight style={{ marginHorizontal: 10 }} onPress={() => setUrunEkleVisible(true)}>
                        <FontAwesome5 name="plus-circle" size={24} color="black" />
                    </TouchableHighlight>

                    <UrunEkleme visible={urunEkleVisible} //ürün ekleme modalı
                        Cikis={Cikis}
                    />

                    <TouchableHighlight style={{ marginRight: 15 }} onPress={() => setUrunSilVisible(true)}>
                        <FontAwesome5 name="trash" size={24} color="black" />
                    </TouchableHighlight>

                    <UrunSilme visible={urunSilVisible}
                        Cikis={Cikis}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={styles.headText}>ÜRÜN</Text>
                <Text style={styles.headText}>ÜRÜN AÇIKLAMASI</Text>
            </View>
            <FlatList
                data={gelenUrun}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer}
                        onPress={() => { navigation.navigate("Ürün Sayfasi", { data : item }) }}>
                        <Text style={styles.itemText}>{item.urunAdi}</Text>
                        <Text style={styles.itemText}>{item.urunAciklamasi}</Text>
                    </TouchableOpacity>
                )}
            />
       
        </View>
    );
}

const styles = StyleSheet.create({
    headText: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 16,
        color: '#333',
        marginTop:8
    },
    itemContainer: {
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#555',
    },
});
