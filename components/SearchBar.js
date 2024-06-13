import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, FlatList ,TouchableOpacity
} from 'react-native'
import React ,{useState} from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar({input,inputChange,inputEnd}) {  
    
    return (
        <View style={styles.container}>
        <View 
       style={{flexDirection:"row"}}
        >
            <FontAwesome5 name="search" size={24} color="black" marginHorizontal={15} />
            <TextInput
                placeholder='Arama'
                style={{ fontSize: 20 }}
                value={input}
                onChangeText={inputChange}
                onEndEditing={inputEnd}
            />
        </View>  
    </View>
    )}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 15,
        backgroundColor: "gray",
        borderRadius: 18,
        height: 50,
        alignItems: "center",
        flex:1,
        justifyContent: "space-between"
    }
})