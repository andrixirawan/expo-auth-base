import Feather from '@expo/vector-icons/Feather';
import { Button } from 'heroui-native/button';
import { Card } from 'heroui-native/card';
import { useThemeColor } from 'heroui-native/hooks';
import { Switch } from 'heroui-native/switch';
import { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';
import { useThemeMode } from '@/hooks/use-theme-mode';

export default function SettingsScreen() {
  const { setThemeMode, themeMode } = useThemeMode();
  const { refreshSession } = useAuth();
  const [accentColor, mutedColor] = useThemeColor(['accent', 'muted']);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isDark = themeMode === 'dark';

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      await refreshSession({ silent: true });
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-4 px-5 py-5"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}>
      <Card>
        <Card.Body className="gap-2">
          <Card.Title>Settings</Card.Title>
          <Card.Description>
            Pilih tema aplikasi. Default awal aplikasi adalah light mode.
          </Card.Description>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="gap-3">
          <Text className="text-sm font-bold uppercase tracking-[1.1px] text-muted-soft">Theme</Text>

          <View className="flex-row items-center justify-between rounded-2xl border border-border-secondary px-4 py-3">
            <View className="flex-row items-center gap-3">
              <Feather name={isDark ? 'moon' : 'sun'} size={18} color={isDark ? accentColor : mutedColor} />
              <Text className="text-base font-semibold text-foreground">
                {isDark ? 'Dark mode' : 'Light mode'}
              </Text>
            </View>
            <Switch isSelected={isDark} onSelectedChange={(next) => setThemeMode(next ? 'dark' : 'light')}>
              <Switch.Thumb />
            </Switch>
          </View>

          <Button className="mt-2" variant={isDark ? 'secondary' : 'primary'} onPress={() => setThemeMode(isDark ? 'light' : 'dark')}>
            Switch to {isDark ? 'light' : 'dark'}
          </Button>
        </Card.Body>
      </Card>
    </ScrollView>
  );
}
