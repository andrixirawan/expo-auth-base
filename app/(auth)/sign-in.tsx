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

export default function SignInScreen() {
  const { configError, errorMessage, refreshSession, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
        error instanceof AuthApiError ? error.message : 'Tidak bisa login sekarang. Coba lagi.',
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
        contentContainerClassName="min-h-full justify-center px-5 py-8"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
        showsVerticalScrollIndicator={false}>
        <Pressable className="flex-1 justify-center" onPress={Keyboard.dismiss}>
          <View className="rounded-[28px] bg-surface p-6 shadow-sm shadow-ink/10">
            <Text className="text-[28px] font-extrabold text-ink">Sign in</Text>
            <Text className="mt-2 text-[15px] leading-6 text-muted">
              Masuk ke akunmu untuk sinkronisasi session Better Auth langsung dari aplikasi native.
            </Text>

            <View className="mt-6 gap-4">
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
                    autoComplete="password"
                    className={`${inputClassName} pr-20`}
                    ref={passwordInputRef}
                    onSubmitEditing={() => void handleSubmit()}
                    placeholder="Your password"
                    placeholderTextColorClassName="accent-muted-soft"
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
                <Text className="text-base font-extrabold text-brand-contrast">Login</Text>
              )}
            </Pressable>

            <Link asChild href="/(auth)/sign-up">
              <Pressable className="mt-5 self-center active:opacity-70">
                <Text className="text-[15px] font-bold text-brand">
                  Belum punya akun? Register dulu.
                </Text>
              </Pressable>
            </Link>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
