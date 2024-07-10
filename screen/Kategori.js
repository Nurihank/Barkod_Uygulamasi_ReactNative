import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import SearchApi from '../hooks/SearchApi';
import SearchBar from '../components/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import KategoriEkleme from '../components/KategoriEkleme';

export default function Kategori() {
  const [UrunGetir, KategoriGetir] = SearchApi();
  const [term, setTerm] = useState('');
  const [gelenKategori, setGelenKategori] = useState('');
  const [kategoriEkleVisible, setKategoriEkleVisible] = useState(false);
  const navigation = useNavigation();

  const Cikis = () => {
    setKategoriEkleVisible(false);
    KategorileriGetir();
  };

  const KategorileriGetir = async () => {
    const kategoriResult = await KategoriGetir(term);
    setGelenKategori(kategoriResult);
  };
  useEffect(() => {
    KategorileriGetir();
  }, []);
  return (
    <View style={styles.container}>
     
      <View style={styles.toolbar}>
      <View style={styles.searchBarContainer}>
        <SearchBar input={term} inputChange={setTerm} inputEnd={KategorileriGetir} />
      </View>
        <TouchableOpacity onPress={() => navigation.navigate('Kategori Sayfasi')}>
          <AntDesign name="windowso" size={30} color="black" />
        </TouchableOpacity>

        <TouchableHighlight style={styles.iconButton} onPress={() => setKategoriEkleVisible(true)}>
          <FontAwesome5 name="plus-circle" size={24} color="black" />
        </TouchableHighlight>
        <KategoriEkleme visible={kategoriEkleVisible} Cikis={Cikis} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headText}>Kategori</Text>
      </View>
      <FlatList
        data={gelenKategori}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Kategori Detayı",{Kategori:item})}>
            <Text style={styles.itemText}>{item.kategoriAdi}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9', // Hafif gri arka plan
  },
  searchBarContainer: {
    height: 80,
    width: '70%',
    marginBottom: 10,
    marginLeft: 10, // Sol tarafa boşluk ekledik
    borderRadius: 10, // Yuvarlatılmış köşeler
    backgroundColor: '#fff', // Beyaz arka plan
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row', // İçerik merkezlemek için
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20, // Sağ tarafa boşluk ekledik
    backgroundColor: '#fff', // Beyaz arka plan
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10, // Yuvarlatılmış köşeler
    elevation: 2, // Hafif gölge
  },
  iconButton: {
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Koyu gri renk
  },
  itemContainer: {
    backgroundColor: '#f0f0f0', // Açık gri arka plan
    padding: 15,
    marginBottom: 10,
    borderRadius: 5, // Hafif yuvarlatılmış köşeler
  },
  itemText: {
    fontSize: 16,
  },
});

