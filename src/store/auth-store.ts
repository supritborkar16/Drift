import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeJsonStorage } from "@/lib/storage";

export type DriftUser = {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
};

type AuthState = {
  isAuthenticated: boolean;
  currentUser: DriftUser | null;
  isProfileMenuOpen: boolean;
  signIn: (email: string) => void;
  register: (email: string) => void;
  signOut: () => void;
  setProfileMenuOpen: (open: boolean) => void;
  toggleProfileMenu: () => void;
};

const mockUser = (email: string): DriftUser => ({
  id: "mock-user-arjun",
  name: "Arjun",
  email,
  avatarInitials: "A",
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true,
      currentUser: mockUser("arjun@drift.local"),
      isProfileMenuOpen: false,
      signIn: (email) =>
        set({
          isAuthenticated: true,
          currentUser: mockUser(email),
          isProfileMenuOpen: false,
        }),
      register: (email) =>
        set({
          isAuthenticated: true,
          currentUser: mockUser(email),
          isProfileMenuOpen: false,
        }),
      signOut: () =>
        set({
          isAuthenticated: false,
          currentUser: null,
          isProfileMenuOpen: false,
        }),
      setProfileMenuOpen: (isProfileMenuOpen) => set({ isProfileMenuOpen }),
      toggleProfileMenu: () =>
        set((state) => ({ isProfileMenuOpen: !state.isProfileMenuOpen })),
    }),
    {
      name: "drift-session",
      storage: safeJsonStorage,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
      }),
    },
  ),
);
