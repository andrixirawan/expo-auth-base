import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-brand-cool px-6">
      <View className="w-full max-w-md rounded-[28px] bg-surface p-6">
        <Text className="text-2xl font-extrabold text-ink">Modal</Text>
        <Text className="mt-3 text-[15px] leading-6 text-muted">
          This modal now uses the same Uniwind token set as the rest of the app, so the demo
          routes stay visually consistent.
        </Text>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
