// src/components/Playlist.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from './FavoritesContext';
import { Track } from '../types/index';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '../types/NavigationTypes'; // Importuj typ nawigacji
import { StackNavigationProp } from '@react-navigation/stack'; // Importuj typ dla nawigacji
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';
import { useTranslation } from 'react-i18next';

// Określamy typ dla nawigacji do ekranu MusicPlayer
type MusicPlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MusicPlayer'>;

const Playlist: React.FC = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation<MusicPlayerScreenNavigationProp>(); // Określamy typ nawigacji
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;
  const { t } = useTranslation();

  const goToMusicPlayer = (track: Track, index: number) => {
    setCurrentTrackIndex(index);
      navigation.navigate('MusicPlayer', {
        trackId: track.id.replace('spotify:track:', ''), // Usuń prefix jeśli istnieje
        trackName: track.name,
        previewUrl: '', // Już nie potrzebne
        duration: track.duration_ms,
      });
  };
  

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, dynamicStyles.container]}>
        <Text style={[styles.emptyMessage, dynamicStyles.text]}>{t('yourPlaylistEmpty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.playlistTitle, dynamicStyles.text]}>{t('yourPlaylist')}</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => goToMusicPlayer(item, index)}
            style={[styles.trackContainer, currentTrackIndex === index && styles.activeTrack]}
          >
            <Text style={styles.trackNumber}>{index + 1}</Text>
            <Text style={styles.trackName}>{item.name}</Text>
            {currentTrackIndex === index && (
              <FontAwesome name="music" size={20} color="green" style={styles.playingIcon} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  playlistTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  emptyMessage: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#444444',
  },
  trackNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  trackName: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
  },
  playingIcon: {
    marginLeft: 10,
  },
  activeTrack: {
    backgroundColor: '#333333',
  },
});

export default Playlist;
