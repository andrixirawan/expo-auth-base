import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';

export default function TabOneScreen() {
  const { lastSyncError, refreshSession, session, signOut } = useAuth();

  const expiresLabel = session?.session.expiresAt
    ? new Date(session.session.expiresAt).toLocaleString()
    : '-';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Authenticated</Text>
        <Text style={styles.title}>Halo, {session?.user.name ?? 'user'}.</Text>
        <Text style={styles.copy}>
          Session native sudah hidup. Token disimpan aman, lalu state user selalu dibaca ulang dari
          `/api/auth/get-session`.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current session</Text>
        <Text style={styles.rowLabel}>Email</Text>
        <Text style={styles.rowValue}>{session?.user.email ?? '-'}</Text>
        <Text style={styles.rowLabel}>Role</Text>
        <Text style={styles.rowValue}>{session?.user.role ?? 'User'}</Text>
        <Text style={styles.rowLabel}>Client type</Text>
        <Text style={styles.rowValue}>{session?.session.clientType ?? 'native'}</Text>
        <Text style={styles.rowLabel}>Expires at</Text>
        <Text style={styles.rowValue}>{expiresLabel}</Text>

        {lastSyncError ? (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>{lastSyncError}</Text>
          </View>
        ) : null}

        <Pressable onPress={() => void refreshSession()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Refresh session</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/two')} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View raw session</Text>
        </Pressable>

        <Pressable onPress={() => void signOut()} style={styles.ghostButton}>
          <Text style={styles.ghostButtonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5efe2',
    padding: 20,
    gap: 18,
  },
  hero: {
    borderRadius: 28,
    backgroundColor: '#0f2d3f',
    padding: 22,
  },
  kicker: {
    color: '#91c9e7',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 12,
    color: '#f6fbff',
    fontSize: 30,
    fontWeight: '800',
  },
  copy: {
    marginTop: 10,
    color: '#d2e6f2',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 28,
    backgroundColor: '#fffdf8',
    padding: 22,
  },
  cardTitle: {
    color: '#1c1712',
    fontSize: 24,
    fontWeight: '800',
  },
  rowLabel: {
    marginTop: 16,
    color: '#8c8174',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  rowValue: {
    marginTop: 6,
    color: '#332a20',
    fontSize: 16,
    lineHeight: 22,
  },
  warningBox: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: '#fff1ea',
    padding: 14,
  },
  warningText: {
    color: '#8a391d',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 22,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#1f4d3e',
  },
  primaryButtonText: {
    color: '#fffdf8',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    marginTop: 12,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#efe4d4',
  },
  secondaryButtonText: {
    color: '#332a20',
    fontSize: 16,
    fontWeight: '700',
  },
  ghostButton: {
    marginTop: 12,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddcfbb',
  },
  ghostButtonText: {
    color: '#8a391d',
    fontSize: 15,
    fontWeight: '700',
  },
});
