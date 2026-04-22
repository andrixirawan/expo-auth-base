import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/hooks/use-auth';
import { useThemeMode } from '@/hooks/use-theme-mode';

export default function AuthLayout() {
  const { isAuthenticated, isHydrated } = useAuth();
  const { themeMode } = useThemeMode();

  if (!isHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: themeMode === 'dark' ? '#f5efe2' : '#1c1712',
      }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ title: 'Create account' }} />
    </Stack>
  );
}
