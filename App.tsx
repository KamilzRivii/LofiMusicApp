import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'src/screens/ThemeContext';
import BottomTabNavigator from 'src/navigation/BottomTabNavigator'; // Import your BottomNav here
import { FavoritesProvider } from 'src/screens/FavoritesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <FavoritesProvider> 
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </FavoritesProvider> 
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
