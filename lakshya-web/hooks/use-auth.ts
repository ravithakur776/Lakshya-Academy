"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { createClient } from "@/lib/supabase/client";

/**
 * Hook to access the current auth state and subscribe to changes.
 *
 * Must be used within a Client Component.
 * Syncs Supabase auth events with the Zustand store.
 *
 * @example
 * const { user, isAuthenticated, isLoading } = useAuth();
 */
export function useAuth() {
  const { user, session, isLoading, isAuthenticated, setUser, setSession, setLoading, signOut } =
    useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        signOut();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, setLoading, signOut]);

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    signOut,
  };
}
