import { Redirect } from 'expo-router';

import { useAuth } from '@/hooks/use-auth';

export default function IndexScreen() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) {
    return null;
  }

  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/sign-in'} />;
}
