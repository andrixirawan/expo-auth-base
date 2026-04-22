import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AuthApiError } from '@/lib/auth/api';
import { useAuth } from '@/hooks/use-auth';

export default function SignInScreen() {
  const { apiBaseUrl, configError, errorMessage, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setSubmitError('Email dan password wajib diisi.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await signIn({
        email,
        password,
        rememberMe: true,
      });
      router.replace('/(tabs)');
    } catch (error) {
      setSubmitError(
        error instanceof AuthApiError ? error.message : 'Tidak bisa login sekarang. Coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.glowLarge} />
          <View style={styles.glowSmall} />
          <Text style={styles.eyebrow}>Expo x Better Auth</Text>
          <Text style={styles.title}>Login flow native yang tahan banting.</Text>
          <Text style={styles.subtitle}>
            Session disimpan aman, direfresh lewat `get-session`, dan splash screen hanya ditutup
            saat bootstrap benar-benar selesai.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in</Text>
          <Text style={styles.cardText}>Masuk pakai email dan password dari backend Better Auth.</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor="#8c8174"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="Your password"
            placeholderTextColor="#8c8174"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {(configError || submitError || errorMessage) && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{configError ?? submitError ?? errorMessage}</Text>
            </View>
          )}

          <Pressable
            disabled={Boolean(configError) || isSubmitting}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || isSubmitting || configError) && styles.primaryButtonPressed,
            ]}>
            {isSubmitting ? (
              <ActivityIndicator color="#fffdf8" />
            ) : (
              <Text style={styles.primaryButtonText}>Login</Text>
            )}
          </Pressable>

          <Link href="/(auth)/sign-up" style={styles.secondaryLink}>
            <Text style={styles.secondaryLinkText}>Belum punya akun? Register dulu.</Text>
          </Link>

          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>API base URL</Text>
            <Text style={styles.metaValue}>{apiBaseUrl ?? 'Belum di-set'}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: '#f5efe2',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 20,
  },
  hero: {
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#1f4d3e',
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  glowLarge: {
    position: 'absolute',
    right: -30,
    top: -20,
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: '#f3b34d',
    opacity: 0.22,
  },
  glowSmall: {
    position: 'absolute',
    left: -20,
    bottom: -28,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#f9ead2',
    opacity: 0.18,
  },
  eyebrow: {
    color: '#f3d79c',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 10,
    color: '#fffdf8',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 12,
    color: '#dae5df',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 28,
    backgroundColor: '#fffdf8',
    padding: 22,
    shadowColor: '#493b2d',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  cardTitle: {
    color: '#1c1712',
    fontSize: 28,
    fontWeight: '800',
  },
  cardText: {
    marginTop: 8,
    color: '#6f6356',
    fontSize: 15,
    lineHeight: 22,
  },
  label: {
    marginTop: 18,
    marginBottom: 8,
    color: '#3b3127',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddcfbb',
    backgroundColor: '#fcf7ef',
    color: '#1c1712',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorBox: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#fff1ea',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: '#8a391d',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 20,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#1f4d3e',
  },
  primaryButtonPressed: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fffdf8',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryLink: {
    marginTop: 18,
    alignSelf: 'center',
  },
  secondaryLinkText: {
    color: '#1f4d3e',
    fontSize: 15,
    fontWeight: '700',
  },
  metaBlock: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#efe4d4',
    paddingTop: 16,
  },
  metaLabel: {
    color: '#8c8174',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  metaValue: {
    marginTop: 6,
    color: '#3b3127',
    fontSize: 14,
    lineHeight: 20,
  },
});
