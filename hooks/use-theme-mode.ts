import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

type ThemeModeState = {
  hasHydrated: boolean;
  themeMode: ThemeMode;
  setHasHydrated: (value: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
};

export const useThemeMode = create<ThemeModeState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      themeMode: 'light',
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setThemeMode: (mode) => set({ themeMode: mode }),
    }),
    {
      name: 'theme-mode',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ themeMode: state.themeMode }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
