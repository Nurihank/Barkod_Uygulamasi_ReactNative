import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function UrunDetaylari({ route }) {
    var urun = route.params.data

    return (
        <ScrollView>
            <View style={{ alignItems: "center", backgroundColor: "#e9967a" }}>
                <Text style={styles.HeadText}>{urun.urunAdi}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <Text style={styles.text}>Açıklama = </Text>
                <Text style={styles.text}>{urun.urunAciklamasi}</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 29 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Ürün Tanıtımı</Text>
                <Text>{urun.urunlerUzunAciklama}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeadText: {
        fontSize: 38,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18
    }
})