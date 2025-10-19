import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';
import { getSpotifyToken } from '../services/spotify';
import { Artist, SpotifyResponse } from '../types/index';
import { useTranslation } from 'react-i18next';

const TopArtist = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  const fetchTopArtists = async () => {
    try {
      setLoading(true);
      const token = await getSpotifyToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=lofi&type=track&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch artists.');

      const data: SpotifyResponse = await response.json();

      // Wydobądź unikalnych artystów
      const uniqueArtists = Array.from(
        new Map(
          data.tracks.items
            .flatMap((track) => track.artists)
            .map((artist) => [artist.id, artist]) // Tworzenie mapy [id_artysty, obiekt_artysty]
        ).values()
      );

      setArtists(uniqueArtists);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopArtists();
  }, []);

  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  const renderArtist = ({ item }: { item: Artist }) => (
    <TouchableOpacity style={[styles.artistContainer, dynamicStyles.container]}>
      <Text style={[styles.artistName, dynamicStyles.text]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.header, dynamicStyles.text]}>{t('topArtist')}</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#DF5202" />
        </View>
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id}
          renderItem={renderArtist}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t('noArtistFound')}</Text>
            </View>
          }
          style={[styles.flatList, dynamicStyles.container]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 28,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  artistContainer: {
    padding: 16,
    backgroundColor: '#222222',
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DF5202',
  },
  artistName: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  flatList: {
    backgroundColor: '#000000',
  },
});

export default TopArtist;
