import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeJsonStorage } from "@/lib/storage";

export type ThemeName = "light" | "dark";

type ThemeState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "drift-theme",
      storage: safeJsonStorage,
    },
  ),
);
