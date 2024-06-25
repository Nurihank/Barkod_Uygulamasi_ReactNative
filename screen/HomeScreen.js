import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';
import UrunEkleme from '../components/UrunEkleme';
import UrunSilme from '../components/UrunSilme';
import Kamera from "../components/Camera.js"
import { AntDesign } from '@expo/vector-icons';
import Filtre from '../components/Filtre.js';
import api from '../api/api.js';


export default function App() {
    const navigation = useNavigation();
    const [UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);
    const [urunEkleVisible, setUrunEkleVisible] = useState(false);
    const [urunSilVisible, setUrunSilVisible] = useState(false);
    const [urunFiltrele, setUrunFiltrele] = useState(false);


    const UrunleriGetirme = async () => {
        const urunResult = await UrunGetir(term); // api çağrısından sonucu aldık
        setGelenUrun(urunResult) // gelen sonucu set ettik    
    };

    useEffect(() => {
        UrunleriGetirme(); 
    }, []);

    const Cikis = () => { //modaldan çıkışı sağlıyoz
        setUrunEkleVisible(false);
        setUrunSilVisible(false);       
        UrunleriGetirme();
    };

   async function Siralama (siralamaSecme){
        setUrunFiltrele(false)
        if(siralamaSecme == "1"){
            const response = await api.get("/AdanZye")
            setGelenUrun(response.data.message);
        }else if(siralamaSecme == "2"){
            const response = await api.get("/UcuzdanPahaliya")
            setGelenUrun(response.data.message);
        }else if(siralamaSecme == "3"){
            const response = await api.get("/PahalidanUcuza")
            setGelenUrun(response.data.message);
        }
        
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "pink", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <SearchBar
                    input={term}
                    inputChange={setTerm}
                    inputEnd={UrunleriGetirme}
                />
                <TouchableOpacity onPress={()=>navigation.navigate("Kategori Sayfasi")}>
                    <AntDesign name="windowso" size={30} color="black" />  
                </TouchableOpacity>
                
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                <TouchableOpacity onPress={()=>setUrunFiltrele(true)}>
                    <AntDesign name="filter" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                    <Kamera/>
                    <Filtre 
                        visible={urunFiltrele}
                        Cikis={Cikis}
                        Siralama={Siralama}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={styles.headText}>ÜRÜN</Text>
                <Text style={styles.headText}>ÜRÜN FİYATI</Text>
            </View>
            <FlatList
                data={gelenUrun}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer}
                        onPress={() => { navigation.navigate("Ürün Sayfasi", { data : item }) }}>
                        <Text style={styles.itemText}>{item.urunAdi}</Text>
                        <Text style={styles.itemText}>{item.fiyat}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()} 
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
