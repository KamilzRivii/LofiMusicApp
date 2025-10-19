// src/components/navigation/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap; // Umożliwia tylko prawidłowe nazwy ikon
  color: string;
}

export function TabBarIcon({ name, color }: TabBarIconProps) {
  return (
    <View>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
}
