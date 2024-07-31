import { Image, StyleSheet, Platform, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { MeContext } from '@/Contexts/MeContext';

export default function HomeScreen() {
  const [me] = useContext(MeContext);

  return <ScrollView contentContainerStyle={{ flex: 1 }}></ScrollView>;
}
