// src/types/NavigationTypes.ts
export type RootStackParamList = {
  Home: undefined; // Parametry dla Home, brak
  ChooseMusic: undefined; // Parametry dla ChooseMusic, brak
  // Dodaj inne ekrany i ich parametry, jeśli są
  MusicPlayer: {
    trackId: string;
    trackName: string;
    previewUrl: string;
    duration: number;
  };
};

export type BottomTabParamList = {
  Home: undefined; // Parametry dla Home, brak
  Playlist: undefined;
  Articles: undefined;
  Profile: undefined;
};
