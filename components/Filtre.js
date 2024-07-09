import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Filtre = ({ visible, Cikis, Siralama }) => {
    const [siralamaSecme, setSiralamaSecme] = useState("");

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
                    <TouchableOpacity style={styles.closeButton} onPress={() => Siralama(siralamaSecme)}>
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 16,
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
