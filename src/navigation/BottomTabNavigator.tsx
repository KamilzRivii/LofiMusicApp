import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Home from '@/screens/Home';
import Playlist from '@/screens/Playlist';
import Articles from '@/screens/Articles';
import Profile from '@/screens/Profile';
import ChooseMusic from '@/screens/ChooseMusic';
import MusicPlayer from '@/screens/MusicPlayer';
import TopArtist from '@/screens/TopArtist';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const [isHomeFocused, setIsHomeFocused] = useState(false); // Stan lokalny dla focusa

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0D0D0D' },
        tabBarActiveTintColor: '#DF5202',
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel: t('playlist'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "compass" : "compass-outline"} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarLabel: t('articles'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "newspaper" : "newspaper-outline"} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChooseMusic"
        component={ChooseMusic}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="MusicPlayer"
        component={MusicPlayer}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="TopArtist"
        component={TopArtist}
        options={{ tabBarButton: () => null }}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
