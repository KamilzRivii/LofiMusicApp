import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppBackground from '@/components/AppBackground';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack'; // Importuj typy dla nawigacji
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';
import { useTranslation } from 'react-i18next';
import dailyRecommendations from '../data/dailyRecommendations.json';

// Zdefiniuj typy dla propsów
type HomeProps = {
  navigation: StackNavigationProp<any>; // Użyj odpowiedniego typu nawigacji
};

const Home: React.FC<HomeProps> = ({ navigation }) => { // Użyj typów w komponencie

  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  const getDailyRecommendation = () => {
    const randomIndex = Math.floor(Math.random() * dailyRecommendations.length);
    return dailyRecommendations[randomIndex];
  };

  const handleDailyRecommendation = () => {
    const recommendation = getDailyRecommendation();
    navigation.navigate('MusicPlayer', {
      trackId: recommendation.trackId,
      trackName: recommendation.trackName,
      previewUrl: recommendation.previewUrl,
      duration: recommendation.duration,
    });
  };
  

  useEffect(() => {
    const resetNavigation = navigation.getState().routes.find(route => route.name === 'ChooseMusic');
    if (resetNavigation?.params?.reset) {
      navigation.navigate('ChooseMusic'); // Przejdź do ekranu ChooseMusic
    }
  }, [navigation]);

  return (
    <AppBackground>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/LofiAppLogo.png')} style={styles.logo} />
          <Text style={[styles.title, dynamicStyles.text]}>{t('title_home')}</Text>
        </View>
        <Ionicons name="person-circle-outline" size={40} color="#DF5202" />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={[styles.welcomeText, dynamicStyles.text]}>{t('welcome')}</Text>
        <Text style={[styles.subText, dynamicStyles.text]}>{t('subText')}</Text>
      </View>




      <TouchableOpacity
      style={styles.tile1}
      onPress={handleDailyRecommendation}
      >
      <LinearGradient
        colors={['#0D0D0D', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.randomGradient}
      >
        <Text style={styles.tileText}>{t('playRandomSong')}</Text>
      </LinearGradient>
      </TouchableOpacity>




      <TouchableOpacity 
        style={styles.tile2} 
        onPress={() => {
          navigation.navigate('ChooseMusic', { reset: true }); // Przejdź do ChooseMusic
        }}

      >
        <LinearGradient
          colors={['#111111', 'transparent']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.tileText}>{t('chooseMusic')}</Text>
        </LinearGradient>
      </TouchableOpacity>



      <TouchableOpacity
      style={styles.artistContainer}
      onPress={() => {
        navigation.navigate('TopArtist', { reset: true }); // Przejdź do TopArtist
      }}
      >
        <LinearGradient
          colors={['#0D0D0D', 'transparent']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.artistsGradient}
        >
          <Text style={styles.tileText}>{t('topArtist')}</Text>
        </LinearGradient>
      </TouchableOpacity>



    </AppBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    paddingHorizontal: 10,
    paddingTop: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistsGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
  randomGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeContainer: {
    height: '15%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 3,
    borderTopColor: '#DF5202',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  tile1: {
    height: '20%',
    backgroundColor: '#333333',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DF5202'
  },
  artistContainer: {
    height: '15%',
    backgroundColor: '#333333',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DF5202'
  },
  tile2: {
    height: '25%',
    backgroundColor: '#444444',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DF5202'
  },
  tileText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Home;
