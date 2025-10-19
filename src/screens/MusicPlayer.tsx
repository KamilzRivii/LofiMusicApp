import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Share } from 'react-native';
import { useFavorites } from './FavoritesContext';
import { Track } from '../types/index';
import { ChooseMusicNavigationProp } from '../types/index';

const playerImages = [
  require('../../assets/images/PlayerImages/lofi_1.png'),
  require('../../assets/images/PlayerImages/lofi_2.png'),
  require('../../assets/images/PlayerImages/lofi_3.png'),
  require('../../assets/images/PlayerImages/lofi_4.png'),
  require('../../assets/images/PlayerImages/lofi_5.png'),
  require('../../assets/images/PlayerImages/lofi_6.png'),
  require('../../assets/images/PlayerImages/lofi_7.png'),
  require('../../assets/images/PlayerImages/lofi_8.png'),
  require('../../assets/images/PlayerImages/lofi_9.png'),
  require('../../assets/images/PlayerImages/lofi_10.png'),
  require('../../assets/images/PlayerImages/lofi_11.png'),
  require('../../assets/images/PlayerImages/lofi_12.png'),
  require('../../assets/images/PlayerImages/lofi_13.png'),
  require('../../assets/images/PlayerImages/lofi_14.png'),
  require('../../assets/images/PlayerImages/lofi_15.png'),
  require('../../assets/images/PlayerImages/lofi_16.png'),
  require('../../assets/images/PlayerImages/lofi_17.png'),
  require('../../assets/images/PlayerImages/lofi_18.png'),
  require('../../assets/images/PlayerImages/lofi_19.png'),
  require('../../assets/images/PlayerImages/lofi_20.png'),
  require('../../assets/images/PlayerImages/lofi_21.png'),
  require('../../assets/images/PlayerImages/lofi_22.png'),
  require('../../assets/images/PlayerImages/lofi_23.png'),
];

type MusicPlayerRouteProp = RouteProp<{ 
  MusicPlayer: { 
    trackId: string; 
    trackName: string; 
    previewUrl: string; 
    duration: number;
    spotifyUri?: string; // Opcjonalne URI Spotify
  } 
}, 'MusicPlayer'>;

const MusicPlayer = () => {
  const route = useRoute<MusicPlayerRouteProp>();
  const navigation = useNavigation<ChooseMusicNavigationProp>();
  const { trackName, trackId, spotifyUri } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavorite, removeFavorite } = useFavorites();
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * playerImages.length);
    setRandomImage(playerImages[randomIndex]);
  }, []);

  // Funkcja otwierająca Spotify
  const openInSpotify = async () => {
    try {
      // Próbuj otworzyć w aplikacji Spotify
      const spotifyAppUrl = `spotify:track:${trackId}`;
      const canOpenApp = await Linking.canOpenURL(spotifyAppUrl);

      if (canOpenApp) {
        await Linking.openURL(spotifyAppUrl);
      } else {
        // Jeśli aplikacja nie jest zainstalowana, otwórz w przeglądarce
        const spotifyWebUrl = `https://open.spotify.com/track/${trackId}`;
        await Linking.openURL(spotifyWebUrl);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not open Spotify. Please make sure you have Spotify installed.',
        [{ text: 'OK' }]
      );
      console.error('Error opening Spotify:', error);
    }
  };

  const handleShare = async () => {
    try {
      const spotifyWebUrl = `https://open.spotify.com/track/${trackId}`;
      await Share.share({
        message: `Check out this track: ${trackName}\nListen on Spotify: ${spotifyWebUrl}`,
      });
    } catch (error) {
      console.error("Error sharing the track:", error);
    }
  };

  const handleFavorite = () => {
    const track: Track = {
      id: trackId,
      name: trackName,
      previewUrl: `https://open.spotify.com/track/${trackId}`,
      artists: [],
      duration_ms: 0,
      popularity: 0
    };

    if (isFavorite) {
      removeFavorite(track.id);
    } else {
      addFavorite(track);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {randomImage && <Image source={randomImage} style={styles.image} />}
      <Text style={styles.trackTitle}>{trackName}</Text>

      <Text style={styles.infoText}>
        Tap the play button to listen on Spotify
      </Text>

      <View style={styles.controlsContainer}>
        {/* Przycisk Play otwiera Spotify */}
        <TouchableOpacity style={styles.playButton} onPress={openInSpotify}>
          <FontAwesome name="spotify" size={24} color="white" />
          <Text style={styles.playButtonText}>Play on Spotify</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainerSecond}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <FontAwesome name="heart" size={20} color={isFavorite ? '#DF5202' : 'white'} />
        </TouchableOpacity>

        <Image source={require('../../assets/images/LofiAppLogo.png')} style={styles.logo} />

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <FontAwesome name="share-alt" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('ChooseMusic')}
      >
        <FontAwesome name="arrow-left" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DF5202',
  },
  logo: {
    width: 100,
    height: 100,
  },
  trackTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 30,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#1DB954', // Kolor zielony Spotify
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 50,
  },
  favoriteButton: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 50,
  },
  controlsContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  controlsContainerSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },
});

export default MusicPlayer;