import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Share, Alert, TouchableOpacity, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FontAwesome } from '@expo/vector-icons';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../api/api';
import Kullanici from '../Models/UserModel';
import UrunDuzenlemeModal from '../components/UrunDuzenlemeModal';

export default function UrunDetaylari({ route }) {

    const [urun, setUrun] = useState(null);
    const [favoriMi,setFavoriMi] = useState(false)
    const [UrunDuzenlemeModalVisible,setUrunDuzenlemeModalVisible] = useState(false) 

    const[ad,setAd] = useState()
    const[aciklama,setAciklama] = useState()
    const[Fiyatı,setFiyat] = useState()
    const[barkod,setBarkod] = useState()

    useEffect(() => {
        FavoriMiKontrol()
        UrunGetir()
    }, [])

 
    const FavorilereEkle = async()=>{
        const response = await api.put("/FavoriteControllers/FavoriEkle",{
            UrunID: route.params.data.urunID,
            KullaniciID: Kullanici.id,
        })
        if("Favoriye Eklendi" == response.data){
            FavoriMiKontrol()
        }
    }
 
    const UrunGetir = async()=>{
        const response = await api.get("/UrunControllers/Urun/"+route.params.data.urunID)

        setUrun(response.data)
        setAd(response.data.urunAdi)
        setAciklama(response.data.urunAciklamasi)
        setBarkod(response.data.urunBarcode)
        setFiyat(response.data.urunFiyati)

    }

    const Cikis = ()=>{
        setUrunDuzenlemeModalVisible(false)
        UrunGetir()
    }

    const FavorilerdenCikar = async()=>{
        const response = await api.delete("/FavoriteControllers/FavoriSil", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                UrunID: route.params.data.urunID,
                KullaniciID: Kullanici.id,
            }
        });       
        if(response.data){
            FavoriMiKontrol()
        }
    }

    const FavoriMiKontrol = async ()=>{
        const response = await api.get("/FavoriteControllers/FavoriMi", {
            params: {
                UrunID: route.params.data.urunID,
                KullaniciID: Kullanici.id,
            }
        });
        setFavoriMi(response.data)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Ürün bilgisi: ' + urun.urunAdi + '\n' + urun.urunAciklamasi,
            });
            if (result.action === Share.sharedAction) {

            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    if (!urun) {
        return null;
    }

    return (  
        <ScrollView style={styles.container}>
           
            <View style={styles.header}>
                
                <Text style={styles.headText}>{ad}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Açıklama:</Text>
                <Text style={styles.description}>{aciklama}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ürün Fiyatı</Text>
                <Text style={styles.description}>{Fiyatı}</Text>
            </View>
            <View style={styles.shareButtonContainer}>
                <Button title='Ürünü Paylaş' onPress={onShare} color="#e9967a" />
            </View>
            <View style={styles.qrCodeContainer}>
                <Barcode
                    format="CODE128"
                    value={urun.urunBarcode}
                    text={urun.urunBarcode}
                />
            </View>
            <View style={styles.editContainer}>
                <TouchableOpacity>
                    <FontAwesome name="edit" size={40} color="black" onPress={()=>setUrunDuzenlemeModalVisible(true)}/>
                </TouchableOpacity>
            </View>
            <View>
                {favoriMi 
                ?
                <TouchableOpacity onPress={FavorilerdenCikar}>
                    <MaterialIcons name="favorite" size={40} color="black" /> 
                </TouchableOpacity>
                    
                :
                <TouchableOpacity onPress={FavorilereEkle}>
                    <MaterialIcons name="favorite-border" size={40} color="black" />
                </TouchableOpacity>
                }
                
            </View>
            <UrunDuzenlemeModal
                visible={UrunDuzenlemeModalVisible}
                Cikis={Cikis}
                Urun={urun}
                UrunID={route.params.data.urunID}
            />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        backgroundColor: '#e9967a',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
        flexDirection:"row"
    },
    headText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    shareButtonContainer: {
        marginTop: 20,
        backgroundColor: '#e9967a',
        borderRadius: 5,
        alignSelf: 'center',
        width: '50%',
        overflow: 'hidden',
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginTop: 50,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e9967a',
        borderRadius: 10,
    },
    editContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 280,
    },
});