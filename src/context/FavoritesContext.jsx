import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('accommodation-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('accommodation-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (accommodationId) => {
    setFavorites(prev => {
      if (!prev.includes(accommodationId)) {
        return [...prev, accommodationId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (accommodationId) => {
    setFavorites(prev => prev.filter(id => id !== accommodationId));
  };

  const toggleFavorite = (accommodationId) => {
    if (favorites.includes(accommodationId)) {
      removeFromFavorites(accommodationId);
      return false; // Removed from favorites
    } else {
      addToFavorites(accommodationId);
      return true; // Added to favorites
    }
  };

  const isFavorite = (accommodationId) => {
    return favorites.includes(accommodationId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
