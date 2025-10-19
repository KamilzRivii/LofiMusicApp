import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';


export default function AppBackground({ children }: { children: React.ReactNode }) {

  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  return <View style={[styles.container, dynamicStyles.container]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // Ustawienie koloru tła
  },
});
