import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/hooks/use-auth";
import { AuthApiError } from "@/lib/auth/api";

export default function SignUpScreen() {
  const { configError, errorMessage, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !password) {
      setSubmitError("Nama, email, dan password wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setSubmitError("Password minimal 8 karakter sesuai kontrak backend.");
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
      router.replace("/(tabs)");
    } catch (error) {
      setSubmitError(
        error instanceof AuthApiError
          ? error.message
          : "Tidak bisa register sekarang. Coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.pressSurface} onPress={Keyboard.dismiss}>
          <View style={styles.card}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            autoCapitalize="words"
            placeholder="Jane Doe"
            placeholderTextColor="#8c8174"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

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
          <View style={styles.passwordWrapper}>
            <TextInput
              autoCapitalize="none"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              placeholderTextColor="#8c8174"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowPassword((prev) => !prev)}
              style={({ pressed }) => [styles.passwordToggle, pressed && styles.primaryButtonPressed]}
            >
              <Text style={styles.passwordToggleText}>{showPassword ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>

          {(configError || submitError || errorMessage) && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {configError ?? submitError ?? errorMessage}
              </Text>
            </View>
          )}

          <Pressable
            disabled={Boolean(configError) || isSubmitting}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || isSubmitting || configError) &&
                styles.primaryButtonPressed,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fffdf8" />
            ) : (
              <Text style={styles.primaryButtonText}>Create account</Text>
            )}
          </Pressable>

          <Link href="/(auth)/sign-in" style={styles.secondaryLink}>
            <Text style={styles.secondaryLinkText}>
              Sudah punya akun? Balik ke login.
            </Text>
          </Link>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: "#f5efe2",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 18,
    justifyContent: "center",
  },
  pressSurface: {
    flex: 1,
  },
  hero: {
    borderRadius: 28,
    backgroundColor: "#cb5f3c",
    paddingHorizontal: 22,
    paddingVertical: 26,
  },
  eyebrow: {
    color: "#ffe7d9",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 10,
    color: "#fffaf5",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 12,
    color: "#fff0e8",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 28,
    backgroundColor: "#fffdf8",
    padding: 22,
  },
  label: {
    marginBottom: 8,
    color: "#3b3127",
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddcfbb",
    backgroundColor: "#fcf7ef",
    color: "#1c1712",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  passwordWrapper: {
    marginBottom: 16,
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddcfbb",
    backgroundColor: "#fcf7ef",
    color: "#1c1712",
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 76,
    paddingVertical: 14,
  },
  passwordToggle: {
    position: "absolute",
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#efe4d4",
  },
  passwordToggleText: {
    color: "#1f4d3e",
    fontSize: 13,
    fontWeight: "700",
  },
  errorBox: {
    borderRadius: 16,
    backgroundColor: "#fff1ea",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: "#8a391d",
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 4,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#1f4d3e",
  },
  primaryButtonPressed: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#fffdf8",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryLink: {
    marginTop: 18,
    alignSelf: "center",
  },
  secondaryLinkText: {
    color: "#1f4d3e",
    fontSize: 15,
    fontWeight: "700",
  },
});
