import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import api from '../api/api';
import SifreYenileModal from './SifreYenileModal';

export default function SifremiUnuttumModal({ visible, Cikis }) {
    const [kullaniciAdi, setKullaniciAdi] = useState("");
    const [eposta, setEposta] = useState("");
    const [gelenCode, setGelenCode] = useState(null);
    const [girilenCode, setGirilenCode] = useState(null);
    const [SifreYenileModalVisible, setSifreYenileModalVisible] = useState(false);

    const KodGonder = async () => {
        const response = await api.put("/KullaniciControllers/KodAl", {
            KullaniciAdi: kullaniciAdi,
            Eposta: eposta,
        });
        if (response.data == 0) {
            Alert.alert("Kullanıcı Adı ile E-posta Eşleşmiyor");
        }
        setGelenCode(response.data);
    };

    const CikisSifreYenile = () => {
        setSifreYenileModalVisible(false);
    };

    const KodDogrula = () => {
        if (gelenCode == girilenCode) {
            console.log("Doğru kod");
            setSifreYenileModalVisible(true);
        } else {
            Alert.alert("Kod yanlış, lütfen tekrar deneyin.");
        }
    };

    const GeriGel = () => {
        setGelenCode(0);
    };

    const SifreYenilendiCikis = () => {
        Alert.alert("Şifren Yenilendi Tekrar Giriş Yap")
        setSifreYenileModalVisible(false);
        Cikis();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                {gelenCode ? (
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeInputText}>E-postana Gelen Kodu Gir</Text>
                        <View style={styles.codeInputContainer}>
                            <TextInput
                                placeholder="Kod gir"
                                value={girilenCode}
                                onChangeText={setGirilenCode}
                                style={styles.codeInput}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Kodu Doğrula' onPress={KodDogrula} />
                            <Button title='Geri Gel' onPress={GeriGel} />
                        </View>
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <View style={styles.cikisContainer}>
                            <TouchableOpacity onPress={Cikis}>
                                <Text style={styles.closeButton}>✖️</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>Şifremi Unuttum</Text>
                        </View>

                        <Text style={styles.text}>Kullanıcı Adını Gir</Text>
                        <TextInput
                            placeholder='Kullanıcı Adı'
                            value={kullaniciAdi}
                            onChangeText={setKullaniciAdi}
                            style={styles.input}
                        />

                        <Text style={styles.text}>E-posta'yı Gir</Text>
                        <TextInput
                            placeholder='E-posta'
                            value={eposta}
                            onChangeText={setEposta}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.submitButton} onPress={KodGonder}>
                            <Text style={styles.submitButtonText}>Gönder</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <SifreYenileModal
                    visible={SifreYenileModalVisible}
                    Cikis={CikisSifreYenile}
                    kullaniciAdi={kullaniciAdi}
                    SifreYenilendiCikis={SifreYenilendiCikis}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    cikisContainer: {
        alignItems: "flex-end",
        margin: 20,
    },
    closeButton: {
        fontSize: 40,
        color: "#e63946",
    },
    headerTextContainer: {
        marginBottom: 40,
        backgroundColor: "#0077b6",
        width: '100%',
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: "#0077b6",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        width: '100%',
    },
    submitButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    codeContainer: {
        width: '100%',
        alignItems: "center",
    },
    codeInputContainer: {
        width: '100%',
        marginBottom: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: "#ffffff",
    },
    codeInput: {
        padding: 15,
        fontSize: 18,
        color: "#333",
        borderRadius: 10,
    },
    codeInputText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});
