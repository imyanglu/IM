import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AppCommon } from '@/components';

import { MeContext, MeProvider } from '@/Contexts/MeContext';
import { getMe } from '@/api';
import RootView from '@/components/RootView';
import { Provider } from 'jotai';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider>
      <MeProvider>
        <RootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ headerShown: false }} />
          </Stack>
          <AppCommon />
        </RootView>
      </MeProvider>
    </Provider>
  );
}
