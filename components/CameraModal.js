import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CameraModal({ visible, Cikis }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false); // Taranan QR kodunu kontrol etmek için state
  const [scannedData, setScannedData] = useState(null); // Taranan QR kodunun verisini saklamak için state

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []); 

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    alert(`QR Kodu Türü: ${type}\nİçerik: ${data}`);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);
  };

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
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          
          style={styles.scanner}
        />
        {scanned && (
          <View style={styles.buttonContainer}>
            <Button title={'Tekrar Tara'} onPress={handleScanAgain} />
            <Button title={'Kapat'} onPress={Cikis} />
          </View>
        )}
        {!scanned && (
          <View style={styles.messageContainer}>
            <Text>Barkod okutulmadı.</Text>
            <Button title={'Kapat'} onPress={Cikis} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal arkaplanını koyulaştırır
  },
  scanner: {
    width: '80%',
    height: '80%', // Make the scanner take 80% of the modal's height
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
