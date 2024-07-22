import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Ayarlar() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Favorileri Temizle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text  style={styles.label}>Önerileriniz ve Tavsiyeleriniz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Şikayet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Hesabı Sil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text style={styles.label}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        
    },buttonContainer:{
        backgroundColor:"gray",
        width:"90%",
        alignItems:"center",
        borderWidth:2,
        borderRadius:15,
        height:60
    },
    label:{
        fontSize:20,
        fontWeight:"bold"
    }

})
