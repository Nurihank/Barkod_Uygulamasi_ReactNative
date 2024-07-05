import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Button, Share } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome5 } from '@expo/vector-icons'; // 
import { Entypo } from '@expo/vector-icons';
import { CameraView, Camera } from "expo-camera";

export default function CameraModal({ visible, Cikis }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []); 

  const handleBarCodeScanned =async ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    setData(data);
    //alert(`QR Kodu Türü: ${type}\nİçerik: ${data}`);
    onShare()
    
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);
  };

  if (!visible) {
    return null;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Ürün Bilgisi : " + data
      });
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          
          style={styles.scanner}
        />
        {scanned && (
          <View style={styles.buttonContainer}>
            <Entypo name="share-alternative" size={30} color="white" onPress={onShare} />
            <FontAwesome5 name="redo" size={30} color="white" onPress={handleScanAgain} />
            <FontAwesome5 name="times" size={30} color="white" onPress={Cikis} />
          </View>
        )}
        {!scanned && (
          <View style={styles.messageContainer}>
            <Text>Barkod okutulmadı.</Text>
            <FontAwesome5 name="times" size={24} color="black" onPress={Cikis} />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanner: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
