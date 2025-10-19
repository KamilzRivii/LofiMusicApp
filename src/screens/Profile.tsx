import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'src/screens/ThemeContext';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from 'src/styles/themes';

const Profile: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isLanguagePolish, setIsLanguagePolish] = useState(i18n.language === 'pl');

  const handleRateUs = () => {
    Alert.alert(t('rateUs'), t('rateUsMessage'));
  };

  const handleNotificationsChange = (value: boolean) => {
    setIsNotificationsEnabled(value);
    Alert.alert(
      t('notifications'),
      value ? t('notificationsEnabled') : t('notificationsDisabled')
    );
  };

  const toggleLanguage = () => {
    const newLanguage = isLanguagePolish ? 'en' : 'pl';
    i18n.changeLanguage(newLanguage).then(() => {
      setIsLanguagePolish(!isLanguagePolish);
    });
  };
  
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.header, dynamicStyles.text]}>{t('settings')}</Text>

      {/* Przełącznik motywu */}
      <View style={styles.setting}>
      <Text style={[styles.label, dynamicStyles.text]}>{t('theme')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} thumbColor="#DF5202"/>
      </View>

      {/* Przełącznik powiadomień */}
      <View style={styles.setting}>
        <Text style={[styles.label, dynamicStyles.text]}>{t('notifications')}</Text>
        <Switch value={isNotificationsEnabled} onValueChange={handleNotificationsChange}  thumbColor="#DF5202"/>
      </View>

      {/* Przełącznik języka */}
      <View style={styles.setting}>
        <Text style={[styles.label, dynamicStyles.text]}>{t('language')}</Text>
        <Switch value={isLanguagePolish} onValueChange={toggleLanguage} thumbColor="#DF5202" />
      </View>

      {/* Informacja o wersji */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>{t('version')}</Text>
      </View>

      {/* Przycisk "Oceń nas" */}
      <TouchableOpacity style={styles.rateButton} onPress={handleRateUs}>
        <Text style={styles.rateButtonText}>{t('rateUs')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Czarny background
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginTop: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 18,
    color: '#fff',
  },
  versionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 16,
    color: '#888',
  },
  rateButton: {
    marginTop: 24,
    backgroundColor: '#DF5202',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
