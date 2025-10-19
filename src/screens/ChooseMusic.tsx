import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSpotifyToken } from '../services/spotify';
import { Track, ChooseMusicNavigationProp, SpotifyResponse } from '../types/index';
import StarRating from './StarRating';
import SearchInput from './SearchInput';
import FilterModal from './FilterModal';
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const ChooseMusic = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ChooseMusicNavigationProp>();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [duration, setDuration] = useState(120000); // ustaw początkową wartość na 2 minuty
  const [popularity, setPopularity] = useState(50);

  const fetchLofiTracks = async () => {
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

      if (!response.ok) throw new Error('Failed to fetch tracks.');

      const data: SpotifyResponse = await response.json();

      console.log('Spotify Token Response:', data);

      const newTracks = data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        url: track.preview_url || `https://path-to-your-music-file${track.id}.mp3`,
        artists: track.artists,
        preview_url: track.preview_url,
        duration_ms: track.duration_ms,
        popularity: track.popularity,
      }));

      setTracks(newTracks);
      setFilteredTracks(newTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilteredTracks(tracks); // Resetuje filtr do pełnej tablicy utworów
    setDuration(120000); // Resetuje filtr czasu trwania
    setPopularity(50);   // Resetuje filtr popularności
  };

  useEffect(() => {
    fetchLofiTracks();
  }, []);

  const handleTrackPress = (track: Track) => {
    console.log("Navigating to MusicPlayer with params:", {
      trackId: track.id,
      trackName: track.name,
      previewUrl: track.preview_url || "",
      duration_ms: track.duration_ms
    });
    navigation.navigate('MusicPlayer', {
      trackId: track.id,
      trackName: track.name,
      previewUrl: track.preview_url || "",
      duration: track.duration_ms
    });
  };

  const handleSearch = React.useCallback((text: string) => {
    setSearchQuery(text);
    
    if (text === '') {
      setFilteredTracks(tracks); // Reset filter if the search query is empty
      return;
    }

    const filtered = tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(text.toLowerCase()) ||
        track.artists.some((artist) => artist.name.toLowerCase().includes(text.toLowerCase()))
    );

    setFilteredTracks(filtered);
  }, [tracks]);

  const handleApplyFilter = (duration: number, popularity: number, sortBy: string) => {
    let filtered = tracks.filter((track) => {
      const trackDurationInMinutes = track.duration_ms;
      const trackPopularityInStars = Math.round(track.popularity / 20);
  
      return (
        trackDurationInMinutes <= duration && // Filtruj utwory na podstawie maksymalnego czasu trwania w milisekundach
        trackPopularityInStars <= popularity // Filtruj utwory na podstawie popularności w gwiazdkach
      );
    });
  
    // Sortowanie na podstawie wybranej opcji
    if (sortBy === 'duration') {
      filtered = filtered.sort((a, b) => b.duration_ms - a.duration_ms); // od najdłuższego do najkrótszego
    } else if (sortBy === 'popularity') {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity); // od najwyżej ocenianego do najniżej
    }
  
    setFilteredTracks(filtered.length > 0 ? filtered : []);
    setFilterModalVisible(false); // Zamknij modal po zastosowaniu filtrów
  };
  
  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;
  
  const renderHeader = () => (
    <>
      <Image
        source={require('../../assets/images/geralt_lofi.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.exploreContainer}>
        <Text style={styles.exploreText}>Playlist</Text>
      </View>
      <View style={styles.searchFilterContainer}>
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderEmpty = () => (
    <View style={[styles.emptyContainer]}>
      <Text style={styles.emptyText}>Brak wyników</Text>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <FlatList
        data={filteredTracks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={loading ? null : renderEmpty()}// Pokazuje "Brak wyników" tylko, gdy nie ma utworów i nie trwa ładowanie
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTrackPress(item)} style={styles.trackContainer}>
            <View style={styles.trackInfo}>
              <Text style={styles.trackName}>{item.name}</Text>
              <Text style={styles.trackArtist}>{item.artists[0]?.name || 'Unknown Artist'}</Text>
            </View>
            <View style={styles.trackDetails}>
              <Text style={styles.trackDuration}>{formatDuration(item.duration_ms)}</Text>
              <StarRating rating={item.popularity} />
            </View>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
        style={styles.flatList}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#DF5202" />
        </View>
      )}
<FilterModal
  visible={isFilterModalVisible}
  onClose={() => setFilterModalVisible(false)}
  onApplyFilter={handleApplyFilter}
  onResetFilters={handleResetFilters}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 28,
    backgroundColor: '#000000',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  exploreContainer: {
    backgroundColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DF5202',
  },
  exploreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    width: 80,
    height: 40,
    backgroundColor: '#DF5202',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  trackContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#222222',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackDetails: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  trackName: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  trackArtist: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  trackDuration: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#000000',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150
  },
  flatList: {
    backgroundColor: '#000000',
  },
});

export default ChooseMusic;
