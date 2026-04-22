import { Button } from 'heroui-native/button';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

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

        <Button className="mt-[22px]" onPress={() => void refreshSession()}>
          Refresh session
        </Button>

        <Button className="mt-3" variant="secondary" onPress={() => router.push('/two')}>
          View raw session
        </Button>

        <Button className="mt-3" variant="danger-soft" onPress={() => void signOut()}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}
