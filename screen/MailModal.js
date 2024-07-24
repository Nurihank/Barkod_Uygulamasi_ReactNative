import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MailModal({ visible, type, closeModal }) {

    const [HeadText,setHeadText] = useState("")
    const [Label,setLabel] = useState("")

    const SendMail = ()=>{

    }
    console.log(visible)
  return (
    <Modal 
        visible={visible}
        animationType="slide"
        transparent={false}
    >
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
            <View >
                <Text style={styles.modalHeader}>
                    {type} Yazınız
                </Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Başlık</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Başlık giriniz"
                    value={HeadText}
                    onChangeText={setHeadText}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Metin</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    multiline
                    numberOfLines={4}
                    placeholder="Metin giriniz"
                    value={Label}
                    onChangeText={setLabel}
                />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={SendMail}>
                <Text style={styles.sendButtonText}>Gönder</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
  },
  inputContainer: {

    marginTop:50
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
