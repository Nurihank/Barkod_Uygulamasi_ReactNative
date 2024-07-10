import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight, ScrollView } from 'react-native';
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
import FiyatAraligiModal from '../components/FiyatAraligiModal.js';
import { endEvent } from 'react-native/Libraries/Performance/Systrace.js';


export default function App() {
    const navigation = useNavigation();
    const [UrunGetir] = SearchApi();
    const [term, setTerm] = useState("");
    const [gelenUrun, setGelenUrun] = useState([]);
    const [urunEkleVisible, setUrunEkleVisible] = useState(false);
    const [urunSilVisible, setUrunSilVisible] = useState(false);
    const [urunFiltrele, setUrunFiltrele] = useState(false);
    const [cameraModal, setCameraModal] = useState(false);
    const [fiyatAraligiModalVisible, setFiyatAraligiModalVisible] = useState(false);

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
        UrunleriGetirme(false);
        setCameraModal(false);
        setUrunFiltrele(false)
        setFiyatAraligiModalVisible(false)
    };

    const CameraModalCikis =async (term)=>{
        setCameraModal(false);
        alert(term)
        const response = await api.get("/UrunControllers/UrunBarcode/"+term)
    //    alert(term)
        setGelenUrun([response.data])
    }

    const FiyatAraliginaGoreArama = async(enDüsük,enYüksek)=>{
        console.log("Küçük "+enDüsük)
        console.log("yüksek "+enYüksek)
        const response = await api.get("/FiltreControllers/FiyatAraligi/"+enDüsük+"/"+enYüksek)
        setGelenUrun(response.data);
        setFiyatAraligiModalVisible(false)
    }

   async function Siralama (siralamaSecme){
        
        if(siralamaSecme == "1"){
            const response = await api.get("/FiltreControllers/"+siralamaSecme)  
            setGelenUrun(response.data);
            setUrunFiltrele(false)
        }else if(siralamaSecme == "2"){
            const response = await api.get("/FiltreControllers/"+siralamaSecme)    
            setGelenUrun(response.data);
            setUrunFiltrele(false)
        }else if(siralamaSecme == "3"){
            const response = await api.get("/FiltreControllers/"+siralamaSecme)    
            setGelenUrun(response.data);
            setUrunFiltrele(false)
        }else{
            Alert.alert(
                "FİLTRELEME SEÇ",
                "Herhangi Bir Filtreleme Seçmen Lazım",
                [
                    {
                      text: 'Tamam',
                      style: 'cancel',
                    },
                  ],
            ) 
        }
        
    }

    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <View style={{ backgroundColor: "#87CEEB", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
                <TouchableOpacity onPress={()=>setFiyatAraligiModalVisible(true)}>
                    <MaterialIcons name="price-change" size={30} color="black" />
                </TouchableOpacity>
                <FiyatAraligiModal
                    visible={fiyatAraligiModalVisible}
                    FiyatAraliginaGoreArama={FiyatAraliginaGoreArama}
                    Cikis={Cikis}
                />
                <TouchableOpacity onPress={()=>navigation.navigate("Ürünleri Karşılaştır")}>
                    <MaterialIcons name="compare" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity  onPress={()=>setCameraModal(true)}>
                        <MaterialCommunityIcons name="qrcode-scan" size={32} color="black" />
                    </TouchableOpacity>
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
                        <Text style={styles.itemText}>{item.urunFiyati}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={{marginHorizontal:20}}>
                    <MaterialCommunityIcons name="face-man-profile" size={47} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:20}} >
                    <Ionicons name="settings" size={40}  color="black" />
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
        marginTop: 8
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
    footer: {
        position: 'absolute',
        left: 17,
        right: 17,
        bottom: 5,
        height: 65,
        backgroundColor: '#f0e68c',
        justifyContent: 'center',
        alignItems: 'center',
        //justifyContent:"space-between",
        flexDirection: "row",
        borderRadius:25,
        
    },
    
});
