import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Track } from '../types/index';

type FavoritesContextType = {
  favorites: Track[];
  addFavorite: (track: Track) => void;
  removeFavorite: (trackId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const addFavorite = (track: Track) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, track];
      return updatedFavorites;
    });
  };

  const removeFavorite = (trackId: string) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((track) => track.id !== trackId);
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
