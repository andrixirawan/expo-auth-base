import { Link, router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/hooks/use-auth';
import { AuthApiError } from '@/lib/auth/api';

const inputClassName =
  'rounded-2xl border border-border-soft bg-input px-4 py-3.5 text-base text-ink';
const labelClassName = 'mb-2 text-sm font-bold text-label';

export default function SignUpScreen() {
  const { configError, errorMessage, refreshSession, signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  async function handleRefresh() {
    setIsRefreshing(true);
    Keyboard.dismiss();
    try {
      await refreshSession({ silent: true });
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !password) {
      setSubmitError('Nama, email, dan password wajib diisi.');
      return;
    }

    if (password.length < 8) {
      setSubmitError('Password minimal 8 karakter sesuai kontrak backend.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await signUp({
        name,
        email,
        password,
      });
      router.replace('/(tabs)');
    } catch (error) {
      setSubmitError(
        error instanceof AuthApiError
          ? error.message
          : 'Tidak bisa register sekarang. Coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full justify-center px-5 py-6"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
        showsVerticalScrollIndicator={false}>
        <Pressable className="flex-1 justify-center" onPress={Keyboard.dismiss}>
          <View className="rounded-[28px] bg-surface p-6 shadow-sm shadow-ink/10">
            <Text className="text-[28px] font-extrabold text-ink">Create account</Text>
            <Text className="mt-2 text-[15px] leading-6 text-muted">
              Bikin akun baru untuk langsung mendapatkan session native yang tersimpan aman di
              perangkat.
            </Text>

            <View className="mt-6 gap-4">
              <View>
                <Text className={labelClassName}>Full name</Text>
                <TextInput
                  autoCapitalize="words"
                  blurOnSubmit={false}
                  className={inputClassName}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  placeholder="Jane Doe"
                  placeholderTextColorClassName="accent-muted-soft"
                  returnKeyType="next"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text className={labelClassName}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  blurOnSubmit={false}
                  className={inputClassName}
                  keyboardType="email-address"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  placeholder="you@example.com"
                  placeholderTextColorClassName="accent-muted-soft"
                  ref={emailInputRef}
                  returnKeyType="next"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text className={labelClassName}>Password</Text>
                <View className="relative justify-center">
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="new-password"
                    className={`${inputClassName} pr-20`}
                    onSubmitEditing={() => void handleSubmit()}
                    placeholder="Minimum 8 characters"
                    placeholderTextColorClassName="accent-muted-soft"
                    ref={passwordInputRef}
                    returnKeyType="done"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Pressable
                    accessibilityRole="button"
                    className="absolute right-3 rounded-xl bg-secondary px-3 py-1.5 active:opacity-70"
                    onPress={() => setShowPassword((prev) => !prev)}>
                    <Text className="text-[13px] font-bold text-brand">
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {(configError || submitError || errorMessage) && (
              <View className="mt-4 rounded-2xl bg-warning-bg px-3.5 py-3">
                <Text className="text-sm leading-5 text-warning-fg">
                  {configError ?? submitError ?? errorMessage}
                </Text>
              </View>
            )}

            <Pressable
              className="mt-5 min-h-14 items-center justify-center rounded-[18px] bg-brand active:opacity-70 disabled:opacity-60"
              disabled={Boolean(configError) || isSubmitting}
              onPress={handleSubmit}>
              {isSubmitting ? (
                <ActivityIndicator colorClassName="accent-brand-contrast" />
              ) : (
                <Text className="text-base font-extrabold text-brand-contrast">
                  Create account
                </Text>
              )}
            </Pressable>

            <Link asChild href="/(auth)/sign-in">
              <Pressable className="mt-5 self-center active:opacity-70">
                <Text className="text-[15px] font-bold text-brand">
                  Sudah punya akun? Balik ke login.
                </Text>
              </Pressable>
            </Link>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
