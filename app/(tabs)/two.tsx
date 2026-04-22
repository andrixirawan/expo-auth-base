import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';

export default function TabTwoScreen() {
  const { lastSyncAt, session, status } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Session inspector</Text>
        <Text style={styles.description}>
          Screen ini sengaja dibuat sebagai debug surface supaya flow auth gampang diverifikasi saat
          integrasi backend.
        </Text>

        <Text style={styles.metaLabel}>Status</Text>
        <Text style={styles.metaValue}>{status}</Text>

        <Text style={styles.metaLabel}>Last sync</Text>
        <Text style={styles.metaValue}>
          {lastSyncAt ? new Date(lastSyncAt).toLocaleString() : 'Belum pernah sync'}
        </Text>

        <Text style={styles.metaLabel}>Payload</Text>
        <View style={styles.payloadBox}>
          <Text style={styles.payloadText}>{JSON.stringify(session, null, 2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5efe2',
    padding: 20,
  },
  card: {
    borderRadius: 28,
    backgroundColor: '#fffdf8',
    padding: 22,
  },
  title: {
    color: '#1c1712',
    fontSize: 26,
    fontWeight: '800',
  },
  description: {
    marginTop: 10,
    color: '#6f6356',
    fontSize: 15,
    lineHeight: 22,
  },
  metaLabel: {
    marginTop: 18,
    color: '#8c8174',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  metaValue: {
    marginTop: 6,
    color: '#332a20',
    fontSize: 15,
    lineHeight: 22,
  },
  payloadBox: {
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: '#f6efe4',
    padding: 16,
  },
  payloadText: {
    color: '#2f2419',
    fontFamily: 'SpaceMono',
    fontSize: 12,
    lineHeight: 18,
  },
});
