import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screen/HomeScreen.js"
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UrunDetaylari from './screen/UrunDetaylari.js';
import Kategori from './screen/Kategori.js';
import KategoriDetaylari from './screen/KategoriDetaylari.js';
import Onboarding from './screen/OnBoardingScreen.js';
import UrunKarsilastirmaScreen from './screen/UrunKarsilastirmaScreen.js';
import FavoriScreen from './screen/FavoriEkrani.js';
import ProfileScreen from './screen/ProfileScreen.js';
import GirisEkrani from './screen/GirisEkrani.js';
import KayitEkrani from './screen/KayitEkrani.js';


const Stack = createNativeStackNavigator();
export default function App() {
  //burda en başta onboarding ekranı olacak UNUTMA
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Giriş Ekranı" component={GirisEkrani} />
      <Stack.Screen name="Ana Sayfa" component={HomeScreen}
                      options={{ title: 'Ana Sayfa', headerBackVisible: false }}/>
                        
        <Stack.Screen name="Ürün Sayfasi" component={UrunDetaylari} />
        <Stack.Screen name="Kategori Sayfasi" component={Kategori} />
        <Stack.Screen name="Kategori Detayı" component={KategoriDetaylari} />
        <Stack.Screen name="Ürünleri Karşılaştır" component={UrunKarsilastirmaScreen} />
        <Stack.Screen name="Favori" component={FavoriScreen} options={{headerBackVisible:false,title: 'Favori Sayfası'}}/>
        <Stack.Screen name="Profil" component={ProfileScreen} />
        <Stack.Screen name="Kayıt Ekranı" component={KayitEkrani} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

