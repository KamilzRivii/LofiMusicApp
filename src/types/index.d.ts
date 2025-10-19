// src/navigation/types.ts

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definicja interfejsu dla artysty
export interface Artist {
  id: string;
  name: string;
}

// Definicja interfejsu dla utworu
export interface Track {
  id: string;
  name: string;
  url?: string;
  artists: Artist[];
  preview_url?: string;
  duration_ms: number;
  popularity: number;
  previewUrl?: string;
}


// Definicja odpowiedzi z API Spotify
export interface SpotifyResponse {
  tracks: {
    items: Track[];
  };
}

// Definicja parametrów stosu nawigacji
export type RootStackParamList = {
  ChooseMusic: undefined;
  MusicPlayer: { trackName: string; trackId: string; previewUrl: string, duration: number };
};

// Typy dla nawigacji i tras
export type MusicPlayerRouteProp = RouteProp<RootStackParamList, 'MusicPlayer'>;
export type ChooseMusicNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChooseMusic'>;
