import 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { HeroUINativeProvider } from 'heroui-native/provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Uniwind } from 'uniwind';
import '../global.css';

import { useAuth } from '@/hooks/use-auth';
import { useThemeMode } from '@/hooks/use-theme-mode';
import { AuthProvider } from '@/providers/auth-provider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  return (
    <AuthProvider>
      <RootLayoutContent fontsLoaded={loaded} fontError={error} />
    </AuthProvider>
  );
}

function RootLayoutContent({
  fontsLoaded,
  fontError,
}: {
  fontsLoaded: boolean;
  fontError: Error | null;
}) {
  const { hasHydrated: isThemeHydrated } = useThemeMode();
  const { isHydrated } = useAuth();

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded && isHydrated && isThemeHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isHydrated, isThemeHydrated]);

  if (!fontsLoaded || !isHydrated || !isThemeHydrated) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { themeMode } = useThemeMode();

  useEffect(() => {
    Uniwind.setTheme(themeMode);
  }, [themeMode]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <View className="flex-1 bg-background">
          <ThemeProvider value={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </ThemeProvider>
        </View>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
