import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchApi from '../hooks/SearchApi';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome kullanıyoruz, istediğiniz ikon setini seçebilirsiniz
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import UrunleriKarsilastirmaModal from '../components/UrunleriKarsilastirmaModal';

export default function UrunKarsilastirmaScreen() {
    const [UrunGetir] = SearchApi(); 
    const [gelenUrun, setGelenUrun] = useState([]);
    const [term, setTerm] = useState("");

    const [birinciUrun, setBirinciUrun] = useState(null);
    const [ikinciUrun, setIkinciUrun] = useState(null); 
    const [urunleriKarsilastirmaModalVisible, setUrunleriKarsilastirmaModalVisible] = useState(false)

    const UrunleriGetirme = async () => {
        const urunResult = await UrunGetir(term);
        setGelenUrun(urunResult);
    };
    const ModalCikis = ()=>{
        setBirinciUrun(null)
        setIkinciUrun(null)
        setUrunleriKarsilastirmaModalVisible(false)
    }
    useEffect(() => {
        UrunleriGetirme();
    }, []);

    const UrunlerSil = ()=>{
        setBirinciUrun(null)
        setIkinciUrun(null)
    }
    const UrunleriKarsilastir = ()=>{
        if(!birinciUrun){
            Alert.alert(
                "ÜRÜN SEÇ",
                "1.Ürün Boş",
                [
                    {
                      text: 'Tamam',
                      style: 'cancel',
                    },
                  ],
            )
        }
        else if(!ikinciUrun){
            Alert.alert(
                "ÜRÜN SEÇ",
                "2.Ürün Boş",
                [
                    {
                      text: 'Tamam',
                      style: 'cancel',
                    },
                  ],
            )
        }else{
            
            setUrunleriKarsilastirmaModalVisible(true)
        }
    }

    const urunSec = (urun) => {
        if (!birinciUrun) {
            setBirinciUrun(urun);
        } else if (!ikinciUrun) {
            setIkinciUrun(urun);
        } else {
            Alert.alert(
                "ÜRÜNLER DOLU",
                "Başka Ürün Seçemezsin",
                [
                    {
                      text: 'Tamam',
                      style: 'cancel',
                    },
                  ],
            )
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                <SearchBar 
                    input={term}
                    inputChange={setTerm}
                    inputEnd={UrunleriGetirme}
                />
                <TouchableOpacity style={styles.compareButton} onPress={UrunleriKarsilastir}>
                    <AntDesign name="checkcircleo" size={35} color="green" />
    
                </TouchableOpacity>
                <TouchableOpacity style={styles.compareButton} onPress={UrunlerSil}>
                    <FontAwesome name="times" size={35} color="red" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.compareContainer}>
                <Text style={styles.compareText}>1. Ürün = {birinciUrun ? birinciUrun.urunAdi : ''}</Text>
                <Text style={styles.compareText}>2. Ürün = {ikinciUrun ? ikinciUrun.urunAdi : ''}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                <Text style={styles.headerText}>Ürünün Adı</Text>
                <Text style={styles.headerText}>Ürünün Fiyatı</Text>
            </View>

            <FlatList
                data={gelenUrun}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => urunSec(item)}
                    >
                        <Text style={styles.itemText}>{item.urunAdi}</Text>
                        <Text style={styles.itemText}>{item.urunFiyati}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <UrunleriKarsilastirmaModal
                visible={urunleriKarsilastirmaModalVisible}
                birinciUrun={birinciUrun}
                ikinciUrun={ikinciUrun}
                closeModal={ModalCikis}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    compareContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    compareText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        flex: 1,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        color: '#555',
        flex: 1,
        textAlign: 'center',
    },
    compareButton: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 5,
        alignItems: 'center',
     
    },
});
