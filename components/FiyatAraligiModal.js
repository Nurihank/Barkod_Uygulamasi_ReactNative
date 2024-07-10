import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function FiyatAraligiModal({ visible, FiyatAraliginaGoreArama, Cikis }) {
  const [enDüsük, setEnDüsük] = useState('');
  const [enYüksek, setEnYüksek] = useState('');

  return (
    <Modal 
        visible={visible} 
        animationType="slide">
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={Cikis}>
                    <FontAwesome name="close" size={35} color="red" />
                </TouchableOpacity>
                
                <Text style={styles.label}>En Düşük Fiyat</Text>
                <TextInput
                style={styles.input}
                value={enDüsük}
                onChangeText={setEnDüsük}
                placeholder='En Düşük'
                keyboardType='numeric'
                />
                <Text style={styles.label}>En Yüksek Fiyat</Text>
                <TextInput
                style={styles.input}
                value={enYüksek}
                onChangeText={setEnYüksek}
                placeholder='En Yüksek'
                keyboardType='numeric'
                />
                <TouchableOpacity style={styles.button} onPress={() => FiyatAraliginaGoreArama(enDüsük, enYüksek)}>
                <Text style={styles.buttonText}>Bu Aralıkla Arama Yap</Text>
                </TouchableOpacity>
            </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 999,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
