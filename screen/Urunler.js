import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'

export default function Urunler({urunleriGönder}) {
    const [result, setresult] = useState([])
    setresult(urunleriGönder)
  return (
    <View>
      <Text>Urunler</Text>
    </View>
  )
}

const styles = StyleSheet.create({})