import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FiyatAraligiModal from "./FiyatAraligiModal";

const Filtre = ({ visible, Cikis, Siralama, FiyatAraliginaGoreArama }) => {
    const [siralamaSecme, setSiralamaSecme] = useState("");
    const [fiyatAraligiModalVisible, setFiyatAraligiModalVisible] = useState(false);

    const FiyatAraligiFiltrele = () => {
        setFiyatAraligiModalVisible(true);
    };

    const FiyatAraligiModalKapatma = () => {
        setFiyatAraligiModalVisible(false);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true} // Modal arkaplanının şeffaf olmasını sağlar
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Nasıl Sıralamak İstersin?</Text>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSiralamaSecme("1")}>
                        <Text style={styles.optionText}>A'dan Z'ye</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSiralamaSecme("2")}>
                        <Text style={styles.optionText}>Ucuzdan Pahalıya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSiralamaSecme("3")}>
                        <Text style={styles.optionText}>Pahalıdan Ucuza</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={FiyatAraligiFiltrele}>
                        <Text style={styles.optionText}>Fiyat Aralığı</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} onPress={() => Siralama(siralamaSecme)}>
                        <Text style={styles.filterButtonText}>Filtrele</Text>
                    </TouchableOpacity>
                    <FiyatAraligiModal
                        visible={fiyatAraligiModalVisible}
                        FiyatAraliginaGoreArama={FiyatAraliginaGoreArama}
                        FiyatAraligiModalKapatma={FiyatAraligiModalKapatma}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={Cikis}>
                        <Text style={styles.closeButtonText}>Çıkış</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    optionButton: {
        width: "100%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 16,
        textAlign: "center",
    },
    filterButton: {
        marginTop: 15,
        backgroundColor: "blue",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    filterButtonText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
    closeButton: {
        marginTop: 15,
    },
    closeButtonText: {
        fontSize: 18,
        color: "blue",
    },
});

export default Filtre;
