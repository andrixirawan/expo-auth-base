import { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';

export default function TabTwoScreen() {
  const { lastSyncAt, refreshSession, session, status } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      contentContainerClassName="px-5 py-5"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}>
      <View className="rounded-[28px] bg-surface p-[22px]">
        <Text className="text-[26px] font-extrabold text-ink">Session inspector</Text>
        <Text className="mt-2.5 text-[15px] leading-6 text-muted">
          Screen ini sengaja dibuat sebagai debug surface supaya flow auth gampang diverifikasi saat
          integrasi backend.
        </Text>

        <Text className="mt-[18px] text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Status
        </Text>
        <Text className="mt-1.5 text-[15px] leading-6 text-copy">{status}</Text>

        <Text className="mt-[18px] text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Last sync
        </Text>
        <Text className="mt-1.5 text-[15px] leading-6 text-copy">
          {lastSyncAt ? new Date(lastSyncAt).toLocaleString() : 'Belum pernah sync'}
        </Text>

        <Text className="mt-[18px] text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Payload
        </Text>
        <View className="mt-2.5 rounded-[18px] bg-panel p-4">
          <Text className="font-mono text-xs leading-[18px] text-copy">
            {JSON.stringify(session, null, 2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
