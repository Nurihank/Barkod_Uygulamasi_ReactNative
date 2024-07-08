import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Button, Share } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { CameraView,Camera } from 'expo-camera';

export default function CameraModal({ visible, Cikis ,CameraModalCikis}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned =async ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    CameraModalCikis(data)
    setScanned(false);
    setScannedData(null);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);  
  };

  /* const onShare = async (UrunBilgisi) => {
    try {
      await Share.share({
        message: "Ürün Bilgisi : " + UrunBilgisi
      });
    } catch (error) {
      alert(error.message);
    }
  }; */

  if (!visible) {
    return null;
  }

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        {hasPermission === null ? (
          <Text>Kamera izni isteniyor...</Text>
        ) : hasPermission === false ? (
          <Text>Kameraya erişim izni verilmedi.</Text>
        ) : (
          <CameraView 
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
        )}
        {scanned && (
          <View style={styles.buttonContainer}>
            <Entypo name="share-alternative" size={30} color="white"
            // onPress={onShare}
             />
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
