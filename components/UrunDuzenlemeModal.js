import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import api from '../api/api'

export default function UrunDuzenlemeModal({ visible, Cikis ,Urun,UrunID}) {

    const [urunAdi, setUrunAdi] = useState(Urun.urunAdi)
    const [urunAciklamasi, setUrunAciklamasi] = useState(Urun.urunAciklamasi)
    const [urunFiyati, setUrunFiyati] = useState(Urun.urunFiyati)
    const [urunBarkodu, setUrunBarkodu] = useState(Urun.urunBarcode)

    if (!Urun) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="blue" />
            <Text>Ürün bilgileri yükleniyor...</Text>
          </View>
        );
      }
      const ModaldanCikis = ()=>{
        setUrunAciklamasi(null)
        Cikis()
      }

      const UrunGuncelle = async () => {
        try {
            const response = await api.put("/UrunControllers", {
                UrunID: UrunID,
                UrunAdi: urunAdi,
                UrunAciklamasi: urunAciklamasi,
                UrunFiyati: urunFiyati,
                UrunBarcode: urunBarkodu
            });
            Cikis()
            // Burada response ile ne yapmak istediğinizi belirleyin
        } catch (error) {
            console.error("API isteği sırasında hata oluştu:", error);
        }
    };
    
  return (
    <Modal visible={visible}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={ModaldanCikis} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modalContent}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Ürün Güncelleme</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Ürün Adı</Text>
            <TextInput style={styles.input} 
             value={urunAdi} onChangeText={setUrunAdi}
             />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Ürün Açıklaması</Text>
            <TextInput style={styles.input}  
            value={urunAciklamasi} onChangeText={setUrunAciklamasi}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Ürün Fiyatı</Text>
            <TextInput style={styles.input}  keyboardType='numeric' 
           value={urunFiyati} onChangeText={setUrunFiyati}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Ürün Barkodu</Text>
            <TextInput style={styles.input}
            value={urunBarkodu} onChangeText={setUrunBarkodu}
            />
          </View>
        </View>

      
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={UrunGuncelle}>
            <Text style={styles.buttonText}>Güncelle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  closeButton: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    backgroundColor: '#228b22',
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#8fbc8f',
    height: 50,
    width: 150,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:3
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
