import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

export default function UrunDetaylari({ route }) {
    var urun = route.params.data

    return (
        <View>
            <View style={{ alignItems: "center", backgroundColor: "#e9967a" }}>
                <Text style={styles.HeadText}>{urun.urunAdi}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <Text>Açıklama = </Text>
                <Text>{urun.urunAciklamasi}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HeadText: {
        fontSize: 38,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15
    }
})