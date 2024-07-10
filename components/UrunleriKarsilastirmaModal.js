import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo için Icon paketi

export default function UrunleriKarsilastirmaModal({ birinciUrun, ikinciUrun, visible, closeModal }) {
    
  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Ionicons name="close-outline" size={50} color="red" />
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Karşılaştırma Ekranı</Text>
        </View>
        
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.productType}>BİRİNCİ ÜRÜN</Text>
            <Text style={styles.productName}>{birinciUrun ? birinciUrun.urunAdi : ''}</Text>
            <Text style={styles.price}>Fiyat : {birinciUrun ? birinciUrun.urunFiyati : ''}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.productType}>İKİNCİ ÜRÜN</Text>
            <Text style={styles.productName}>{ikinciUrun ? ikinciUrun.urunAdi : ''}</Text>
            <Text style={styles.price}>Fiyat : {ikinciUrun ? ikinciUrun.urunFiyati : ''}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  productType: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'transparent',
    padding: 15,
  },
});
