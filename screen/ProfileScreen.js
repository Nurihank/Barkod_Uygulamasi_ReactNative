import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export default function ProfileScreen() {

    const [isim, setİsim] = useState("")
    const [email, setEmail] = useState("")
    const [Telefon, setTelefon] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilim</Text>
        <FontAwesome name="user-circle" size={100} color="#555" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>İsim:</Text>
        <View style={styles.row}>
          <TextInput
            value={isim}
            onChangeText={setİsim}
            placeholder={isim}
          />
          <EvilIcons name="pencil" size={30} color="black" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.row}>
          <Text style={styles.info}> {email}</Text>
          <EvilIcons name="pencil" size={30} color="black" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Telefon:</Text>
        <View style={styles.row}>
          <Text style={styles.info}>{Telefon}</Text>
          <EvilIcons name="pencil" size={30} color="black" />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    color: '#555',
  },
  info: {
    fontSize: 18,
    color: '#333',
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns the icon and text vertically
  
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
