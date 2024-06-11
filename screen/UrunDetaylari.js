import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function UrunDetaylari({ route }) {
    console.log(route.params.id)
    const id = route.params.id
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})