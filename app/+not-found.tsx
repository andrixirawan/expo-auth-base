import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-canvas px-5">
        <Text className="text-center text-[22px] font-extrabold text-ink">
          This screen doesn&apos;t exist.
        </Text>
        <Link asChild href="/">
          <Pressable className="mt-4 active:opacity-70">
            <Text className="text-sm font-bold text-brand">Go to home screen!</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
