import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screen/HomeScreen.js"
const Stack = createNativeStackNavigator();

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UrunDetaylari from './screen/UrunDetaylari.js';
import Kategori from './screen/Kategori.js';
import KategoriDetaylari from './screen/KategoriDetaylari.js';
import Onboarding from './screen/OnBoardingScreen.js';
import UrunKarsilastirmaScreen from './screen/UrunKarsilastirmaScreen.js';
import InfiniteScrollExample from './screen/Dene.js';

export default function App() {
  //burda en başta onboarding ekranı olacak UNUTMA
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen name="Ana Sayfa" component={HomeScreen}
                      options={{ title: 'Ana Sayfa', headerBackVisible: false }}/>
        <Stack.Screen name="Ürün Sayfasi" component={UrunDetaylari} />
        <Stack.Screen name="Kategori Sayfasi" component={Kategori} />
        <Stack.Screen name="Kategori Detayı" component={KategoriDetaylari} />
        <Stack.Screen name="Ürünleri Karşılaştır" component={UrunKarsilastirmaScreen} />
        <Stack.Screen name="dene" component={InfiniteScrollExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

