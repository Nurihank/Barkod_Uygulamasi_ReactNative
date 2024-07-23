import api from "../api/api"
import { useEffect, useState} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
const navigation = useNavigation()

    const getAccesToken = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          return token;
        } catch (error) {
          console.error('Access token retrieval error:', error);
          return null;
        }
      };
      const getRefreshToken = async () => {
        try {
          const token = await AsyncStorage.getItem('refreshToken');
          return token;
        } catch (error) {
          console.error('Refresh token retrieval error:', error);
          return null;
        }
      };
      
    const UrunGetir = async (urunAra) => {
        const accessToken = await getAccesToken();
        if (accessToken) {
    
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; //access token kontrolü yapıyor
          try {
            const response = await api.get("/UrunControllers/"+urunAra) 
            return response.data
          } catch (error) {
            console.log('Süresi bitti ya da access token gelmedi:', error);
            const refreshToken = await getRefreshToken()
    
            api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`; //refresh token kontrolü yapıyor
            try {
                const response =  await api.post("/KullaniciControllers/Token")
                await AsyncStorage.setItem('accessToken', response.data);
                UrunGetir()
            } catch (error) {
              Alert.alert("Tekrar Giriş yap")
              await AsyncStorage.clear();
              navigation.navigate("Giriş Ekranı")
            }
            
          }
        } else {
          Alert.alert("Tekrar Giriş yap")
          navigation.navigate("Giriş Ekranı")
        }

        const response = await api.get("/UrunControllers/"+urunAra) 
        return response.data  
    }
     
    const KategoriGetir = async (kategoriAra) => {       
        const response = await api.get("/KategoriControllers") 
        return response.data 
    }  

    useEffect(() => {  
    
    }, [])
 
    return [UrunGetir,KategoriGetir]
}
