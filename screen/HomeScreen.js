import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';
import UrunEkleme from '../components/UrunEkleme';
import UrunSilme from '../components/UrunSilme';
import { AntDesign } from '@expo/vector-icons';
import Filtre from '../components/Filtre.js';
import api from '../api/api.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CameraModal from '../components/CameraModal.js';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import FavoriModal from './FavoriEkrani.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const navigation = useNavigation();
    const [UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);
    const [urunEkleVisible, setUrunEkleVisible] = useState(false);
    const [urunSilVisible, setUrunSilVisible] = useState(false);
    const [urunFiltrele, setUrunFiltrele] = useState(false);
    const [cameraModal, setCameraModal] = useState(false);
    const [favoriModalVisible, setFavoriModalVisible] = useState(false);

    const UrunleriGetirme = async () => {
        const urunResult = await UrunGetir(term);
        const id = await AsyncStorage.getItem("id")
        console.log(id)
        setGelenUrun(urunResult);
    };
    
    const FiyatAraliginaGoreArama = async (enDüşük, enYüksek) => {
        const response = await api.get("/FiltreControllers/FiyatAraligi/" + enDüşük + "/" + enYüksek);
        setGelenUrun(response.data);
        setUrunFiltrele(false);
    };

    useEffect(() => {
        UrunleriGetirme();
    }, []);

    const Cikis = () => {
        setUrunEkleVisible(false);
        setUrunSilVisible(false);
        setCameraModal(false);
        setUrunFiltrele(false);
        setFavoriModalVisible(false);
        UrunleriGetirme();
    };

    const CameraModalCikis = async (term) => {
        setCameraModal(false);
        const response = await api.get("/UrunControllers/UrunBarcode/" + term);
        setGelenUrun([response.data]);
    };

    async function Siralama(siralamaSecme) {
        const response = await api.get("/FiltreControllers/" + siralamaSecme);
        setGelenUrun(response.data);
        setUrunFiltrele(false);
    }

    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <View style={{ backgroundColor: "#f0f0f0", flexDirection: "row", justifyContent: "space-arround", alignItems: "center" }}>
                <SearchBar
                    input={term}
                    inputChange={setTerm}
                    inputEnd={UrunleriGetirme}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Kategori Sayfasi")}>
                    <AntDesign name="windowso" size={30} color="black" />
                </TouchableOpacity>
                <TouchableHighlight style={{ marginHorizontal: 10 }} onPress={() => setUrunEkleVisible(true)}>
                    <FontAwesome5 name="plus-circle" size={24} color="black" />
                </TouchableHighlight>
                <UrunEkleme 
                    visible={urunEkleVisible}
                    Cikis={Cikis}
                />
                <TouchableHighlight style={{ marginRight: 15 }} onPress={() => setUrunSilVisible(true)}>
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableHighlight>
                <UrunSilme 
                    visible={urunSilVisible}
                    Cikis={Cikis}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setUrunFiltrele(true)}>
                        <MaterialCommunityIcons name="sort" size={32} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Favori")}>
                        <MaterialIcons name="favorite" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Ürünleri Karşılaştır")}>
                        <MaterialIcons name="compare" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setCameraModal(true)}>
                        <MaterialCommunityIcons name="qrcode-scan" size={32} color="black" />
                    </TouchableOpacity>
                </View>
                <CameraModal
                    visible={cameraModal}
                    Cikis={Cikis}
                    CameraModalCikis={CameraModalCikis}
                />
                <Filtre 
                    visible={urunFiltrele}
                    Cikis={Cikis}
                    Siralama={Siralama}
                    FiyatAraliginaGoreArama={FiyatAraliginaGoreArama}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={styles.headText}>ÜRÜN</Text>
                <Text style={styles.headText}>ÜRÜN FİYATI</Text>
            </View>
            <FlatList
                data={gelenUrun}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer}
                        onPress={() => navigation.navigate("Ürün Sayfasi", { data: item })}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemText}>{item.urunAdi}</Text>
                        </View>
                        <Text style={styles.itemText}>{item.urunFiyati}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => navigation.navigate("Profil")}>
                    <MaterialCommunityIcons name="face-man-profile" size={47} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => navigation.navigate("Ayarlar")}>
                    <Ionicons name="settings" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headText: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 16,
        color: '#333',
        marginTop: 8,
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
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    },
    footer: {
        position: 'absolute',
        left: 17,
        right: 17,
        bottom: 5,
        height: 65,
        backgroundColor: '#a1c6ea', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 25,
    },
});
