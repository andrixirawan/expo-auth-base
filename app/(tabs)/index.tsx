import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';

export default function TabOneScreen() {
  const { lastSyncError, refreshSession, session, signOut } = useAuth();

  const expiresLabel = session?.session.expiresAt
    ? new Date(session.session.expiresAt).toLocaleString()
    : '-';

  return (
    <ScrollView
      className="flex-1 bg-canvas"
      contentContainerClassName="gap-[18px] px-5 py-5">
      <View className="rounded-[28px] bg-brand-cool p-[22px]">
        <Text className="text-[13px] font-bold uppercase tracking-[1.2px] text-info">
          Authenticated
        </Text>
        <Text className="mt-3 text-[30px] font-extrabold text-brand-contrast">
          Halo, {session?.user.name ?? 'user'}.
        </Text>
        <Text className="mt-2.5 text-[15px] leading-6 text-info-contrast">
          Session native sudah hidup. Token disimpan aman, lalu state user selalu dibaca ulang dari
          `/api/auth/get-session`.
        </Text>
      </View>

      <View className="rounded-[28px] bg-surface p-[22px]">
        <Text className="text-2xl font-extrabold text-ink">Current session</Text>

        <Text className="mt-4 text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Email
        </Text>
        <Text className="mt-1.5 text-base leading-6 text-copy">{session?.user.email ?? '-'}</Text>

        <Text className="mt-4 text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Role
        </Text>
        <Text className="mt-1.5 text-base leading-6 text-copy">{session?.user.role ?? 'User'}</Text>

        <Text className="mt-4 text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Client type
        </Text>
        <Text className="mt-1.5 text-base leading-6 text-copy">
          {session?.session.clientType ?? 'native'}
        </Text>

        <Text className="mt-4 text-xs font-bold uppercase tracking-[1.1px] text-muted-soft">
          Expires at
        </Text>
        <Text className="mt-1.5 text-base leading-6 text-copy">{expiresLabel}</Text>

        {lastSyncError ? (
          <View className="mt-[18px] rounded-2xl bg-warning-bg p-3.5">
            <Text className="text-sm leading-5 text-warning-fg">{lastSyncError}</Text>
          </View>
        ) : null}

        <Pressable
          className="mt-[22px] min-h-[52px] items-center justify-center rounded-[18px] bg-brand active:opacity-70"
          onPress={() => void refreshSession()}>
          <Text className="text-base font-extrabold text-brand-contrast">Refresh session</Text>
        </Pressable>

        <Pressable
          className="mt-3 min-h-[52px] items-center justify-center rounded-[18px] bg-secondary active:opacity-70"
          onPress={() => router.push('/two')}>
          <Text className="text-base font-bold text-copy">View raw session</Text>
        </Pressable>

        <Pressable
          className="mt-3 min-h-[52px] items-center justify-center rounded-[18px] border border-border-soft active:opacity-70"
          onPress={() => void signOut()}>
          <Text className="text-[15px] font-bold text-warning-fg">Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
