import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Share, Alert, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FontAwesome } from '@expo/vector-icons';

export default function UrunDetaylari({ route }) {
    const [urun, setUrun] = useState(null);
    console.log(route.params.data)
    useEffect(() => {
        if (route.params && route.params.data) {
            setUrun(route.params.data);
        }
    }, [route.params]); 

    const UpdateUrun =async ()=>{
        const response = await api.put("/UrunControllers",{
            
        })
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Ürün bilgisi: ' + urun.urunAdi + '\n' + urun.urunAciklamasi,
            });
            if (result.action === Share.sharedAction) {
                console.log("Paylaşma başarılı oldu");
            } else if (result.action === Share.dismissedAction) {
                console.log("Paylaşma iptal edildi");
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
                <Text style={styles.headText}>{urun.urunAdi}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Açıklama:</Text>
                <Text style={styles.description}>{urun.urunAciklamasi}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ürün Tanıtımı</Text>
                <Text style={styles.description}>{urun.urunlerUzunAciklama}</Text>
            </View>
            <View style={styles.shareButtonContainer}>
                <Button title='Ürünü Paylaş' onPress={onShare} color="#e9967a" />
            </View>
            <View style={styles.qrCodeContainer}>
                <QRCode
                    value={urun.urunAdi}
                    size={200}
                    color="black"
                    backgroundColor="white"
                />
            </View>
            <View style={styles.editContainer}>
                <TouchableOpacity onPress={UpdateUrun}>
                    <FontAwesome name="edit" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    header: {
        backgroundColor: '#e9967a',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
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
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e9967a',
        borderRadius: 10,
    },
    editContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginLeft:280
    },
});
