import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full items-center justify-center px-5"
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
        <View className="items-center">
          <Text className="text-center text-[22px] font-extrabold text-ink">
            This screen doesn&apos;t exist.
          </Text>
          <Link asChild href="/">
            <Pressable className="mt-4 active:opacity-70">
              <Text className="text-sm font-bold text-brand">Go to home screen!</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}
