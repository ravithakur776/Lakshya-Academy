"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppUser, AuthSession } from "@/types/auth.types";

interface AuthStore {
  // State
  user: AppUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isHydrated: boolean;

  // Computed
  isAuthenticated: boolean;

  // Actions
  setUser: (user: AppUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  setHydrated: (isHydrated: boolean) => void;
  signOut: () => void;
}

/**
 * Auth state store (Zustand)
 *
 * Persists session to localStorage for instant rehydration.
 * The actual auth state is managed by Supabase — this is a cache layer.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      isLoading: true,
      isHydrated: false,

      // Computed
      get isAuthenticated() {
        return get().user !== null && get().session !== null;
      },

      // Actions
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      setHydrated: (isHydrated) => set({ isHydrated }),

      signOut: () =>
        set({
          user: null,
          session: null,
          isLoading: false,
        }),
    }),
    {
      name: "lakshya-auth",
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive fields
      partialize: (state) => ({
        user: state.user,
        // Do NOT persist session tokens
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
