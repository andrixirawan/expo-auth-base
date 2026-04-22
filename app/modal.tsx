import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native';

export default function ModalScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="min-h-full items-center justify-center px-6"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
      <View className="w-full max-w-md rounded-[28px] bg-surface p-6">
        <Text className="text-2xl font-extrabold text-ink">Modal</Text>
        <Text className="mt-3 text-[15px] leading-6 text-muted">
          This modal now uses the same Uniwind token set as the rest of the app, so the demo
          routes stay visually consistent.
        </Text>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}
