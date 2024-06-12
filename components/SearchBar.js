import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, FlatList ,TouchableOpacity
} from 'react-native'
import React ,{useState} from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../api/api';
import SearchApi from '../hooks/SearchApi';

export default function SearchBar({input,inputChange,inputEnd}) {


    const [urun, setUrun] = useState("")
    const [result,searchApi] = SearchApi()

    /* const asd = ()=>{
        console.log("geldimi")
    }
    const search =async (text)=>{
        setInput(text)
            const response = await api.get("/searchUrun",{
                params:{
                    urunAdi:text
                }
            })
            setUrun(response.data.message)
        
    } */
    
    return (
        <View style={styles.container}>
        <View style={{flexDirection:"row" ,flex:3}}>
            <FontAwesome5 name="search" size={24} color="black" marginHorizontal={15} />
            <TextInput
                placeholder='Arama'
                style={{ fontSize: 20 }}
                value={input}
                onChangeText={inputChange}
                onEndEditing={inputEnd}
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