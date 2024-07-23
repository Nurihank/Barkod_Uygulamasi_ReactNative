import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from "../api/api";
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import KullaniciBilgileriGuncelleModal from '../components/KullaniciBilgileriGuncelleModal';
import Kullanici from '../Models/UserModel';
import SifreYenileModal from '../components/SifreYenileModal';
import SifreDegistirmeModal from '../components/SifreDegistirmeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen() {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [kullaniciBilgisi, setKullaniciBilgisi] = useState('');
  const [eposta, setEposta] = useState('');
  const [telefonNo, setTelefonNo] = useState('');
  const [cinsiyet, setCinsiyet] = useState("");
  const [yas, setYas] = useState('');
  const [image, setImage] = useState(Kullanici.image);
  const [GuncelleVisible,setGuncelleVisible] = useState(false)
  const[SifreDegistirmeModalVisible,setSifreDegistirmeModalVisible] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
        alert('Sorry, we need camera roll and camera permissions to make this work!');
      }
    })();
  }, []);

  const SifreYenileme = ()=>{
    setSifreDegistirmeModalVisible(true)
  }

  const Cikis = ()=>{
    setGuncelleVisible(false)
    setSifreDegistirmeModalVisible(false)
    KullaniciBilgileri();
  }
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    Kullanici.image = result.assets[0].uri
    const response = await api.put("/KullaniciControllers/ProfilResmiKaydet",{
      id:Kullanici.id,
      imagePath:result.assets[0].uri
    })
    response();
    setImage(null)
    if (!result.canceled) {
      setImage(Kullanici.image);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    Kullanici.image = result.assets[0].uri
    console.log(result.assets[0].uri)
    setImage(null)
    const response = await api.put("/KullaniciControllers/ProfilResmiKaydet",{
      id:Kullanici.id,
      imagePath:result.assets[0].uri
    })
    
    if (!result.canceled) {
      setImage(Kullanici.image);
    } 
  };
 
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


  //en son c#dan refresh token ile yeni token getirme endpointi yazcaz
  const KullaniciBilgileri = async () => {
    

    const accessToken = await getAccesToken();
    if (accessToken) {

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; //access token kontrolü yapıyor
      try {
        const response = await api.get("/KullaniciControllers/KullaniciBilgileri/" +Kullanici.id);
        setKullaniciBilgisi(response.data)

        if (response.data.cinsiyet) { 
          setCinsiyet("erkek");
        }else{
          setCinsiyet("Kadın")
        }
    
        setEposta(response.data.eposta);
        setTelefonNo(response.data.telefonNo);
        setKullaniciAdi(response.data.kullaniciAdi);
        setYas(response.data.yas);

      } catch (error) {
        console.log('Süresi bitti ya da access token gelmedi:', error);
        const refreshToken = await getRefreshToken()

        api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`; //refresh token kontrolü yapıyor
        try {

            const response =  await api.post("/KullaniciControllers/Token")
            await AsyncStorage.setItem('accessToken', response.data);
            KullaniciBilgileri()
          //içine refresk tokenle yeni token getirme yapacaz
        } catch (error) {
          Alert.alert("Tekrar giriş yapmak zorundasin")
          await AsyncStorage.setItem('accessToken', "null");
          await AsyncStorage.setItem('refreshToken', "null");
          navigation.navigate("Giriş Ekranı")
        }
        
      }
    } else {
      console.error('Access token not available.');
    }

    
  };

  useEffect(() => {
    KullaniciBilgileri();
  }, []);

  return (
    <View style={styles.container}> 
      <View style={styles.imageContainer}>
        <Image 
          source={image ? { uri: image } : require("../assets/profile-default.jpg")} 
          style={styles.image}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
            <MaterialCommunityIcons name="image" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={()=>setGuncelleVisible(true)}>
            <FontAwesome5 name="user-edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kullanici Adi:</Text>
          <Text style={styles.info}>{kullaniciAdi}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Eposta:</Text>
          <Text style={styles.info}>{eposta}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Yas:</Text>
          <Text style={styles.info}>{yas}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefon Numarası:</Text>
          <Text style={styles.info}>{telefonNo}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cinsiyet:</Text>
          <Text style={styles.info}>{cinsiyet}</Text>
        </View>
        <View>
          <View style={styles.changePasswordContainer}>
            <TouchableOpacity style={styles.changePasswordButton} onPress={SifreYenileme}>
                <Text style={styles.changePasswordText}>Şifre Değiştirme</Text>
            </TouchableOpacity>
          </View>
        </View>
          
      </View>
      <KullaniciBilgileriGuncelleModal 
        visible={GuncelleVisible}
        Cikis={Cikis}
        kullaniciBilgisi={kullaniciBilgisi}
      />
      <SifreDegistirmeModal
        visible={SifreDegistirmeModalVisible}
        Cikis={Cikis}
        KullaniciAdi={kullaniciAdi}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#4CAF50',
    marginRight: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  galleryButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#FF9800',
    borderRadius: 20,
    padding: 5,
  },
  textInputContainer: {
    marginVertical: 10,
  },
  inputGroup: {
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#555',
    padding: 10,
    borderColor: '#A5D6A7',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  changePasswordContainer: {
    alignItems: "flex-end",
    marginVertical: 20,
  },
  changePasswordButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  changePasswordText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

