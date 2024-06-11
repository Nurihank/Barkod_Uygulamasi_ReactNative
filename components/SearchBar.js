import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row" ,flex:3}}>
                <FontAwesome5 name="search" size={24} color="black" marginHorizontal={15} />
                <TextInput
                    placeholder='Arama'
                    style={{ fontSize: 20 }}
                />
            </View>
            <View style={{flexDirection:"row" , flex:1}}>
                <TouchableHighlight style={{marginHorizontal:10}}  onPress={() => { Alert.alert("Ekleme") }}>
                    <FontAwesome5 name="plus-circle" size={24} color="black"  />
                </TouchableHighlight>
                <TouchableHighlight style={{ marginRight: 15 }}  onPress={() => { Alert.alert("Silme") }}>
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 15,
        flex:1,
        backgroundColor: "gray",
        borderRadius: 18,
        height: 50,
        alignItems: "center",
        flex: 2,
        justifyContent: "space-between"
    },
})