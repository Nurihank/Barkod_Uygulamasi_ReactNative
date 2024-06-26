import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen() {
  const navigation = useNavigation()

  const handleDone = ()=>{
    navigation.navigate("Ana Sayfa")
  }

    return (
        <Onboarding
          onDone={handleDone}
          onSkip={handleDone}
            pages={[
                {
                    backgroundColor: '#f7f7f7',
                    title: <Text style={styles.title}>MERHABALAR</Text>,
                    subtitle: <Text style={styles.subtitle}>Aradığın her türlü kamp ürünleri</Text>,
                    image: <Image style={styles.img} source={require('../assets/urun.jpg')} />,
                },
                {
                    backgroundColor: '#f7f7f7',
                    title: <Text style={styles.title}>KAMP ÜRÜNLERİ</Text>,
                    subtitle: <Text style={styles.subtitle}>İstediğin kategoriye göre ürünler vardır binlerce çadır binlerce kamp ürünleri</Text>,
                    image: <Image style={styles.img} source={require('../assets/urun.jpg')} />,
                },
                {
                  backgroundColor: '#f7f7f7',
                  title: <Text style={styles.title}>KAMP ÜRÜNLERİ</Text>,
                  subtitle: <Text style={styles.subtitle}>İstediğin kategoriye göre ürünler vardır binlerce çadır binlerce kamp ürünleri</Text>,
                  image: <Image style={styles.img} source={require('../assets/urun.jpg')} />,
              },
              {
                backgroundColor: '#f7f7f7', 
                title: <Text style={styles.title}>KAMP ÜRÜNLERİ</Text>,
                subtitle: <Text style={styles.subtitle}>İstediğin kategoriye göre ürünler vardır binlerce çadır binlerce kamp ürünleri</Text>,
                image: <Image style={styles.img} source={require('../assets/urun.jpg')} />,
            },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    img: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: '#d3d3d3',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666',
        paddingHorizontal: 30,
        textAlign: 'center',
    },
});
