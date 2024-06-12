import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import api from '../api/api';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchApi from '../hooks/SearchApi';

export default function App() {
    const navigation = useNavigation()
    const [result,UrunGetir] = SearchApi()
    
    const [input, setİnput] = useState("")
    const [urun, seturun] = useState([])


    /* const deneme = async(input)=>{
        setİnput(input)
        console.log(input+" asd")
        const denemecan = async ()=>{
            await UrunGetir(input)
            seturun(result)
        }
        denemecan()
        
    }   */

    /* useEffect(() => {  
        console.log("1")
        deneme(input)
        console.log("2")
    }, []) */

    
   /*  const getUrunler = () => { 
        const searchApi = async () => {
            const response = await api.get("/UrunGetir",{
              params:{
                urunAdi:""
              }
            }) 
            seturunler(response.data.message)
        }
        useEffect(() => { 
            searchApi()
        }, []) 
    }
    getUrunler() */

    return (
        <View>
            <View style={{ backgroundColor: "pink", flexDirection: "row" }}>
                <SearchBar 
                input={input}
                inputChange={setİnput(input)}
               // inputEnd={UrunGetir(input)}
                />
            </View>
            <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}>ÜRÜN RESMİ</Text>
                <Text style={styles.text}>ÜRÜN AÇIKLAMASI</Text>

            </View>
            <View>
                <FlatList
                    data={urun}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }} onPress={() => { navigation.navigate("Ürün Sayfasi", { id: item.idUrunler }) }}>
                                <Text>{item.urunAdi} </Text>
                                <Text>{item.urunAciklamasi} </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        fontSize: 17
    },
    image: {
        height: 250,
        width: 250
    }
});