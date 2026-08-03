import { createClient } from "@/lib/supabase/client";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth.types";

/**
 * Auth Service
 *
 * Wraps Supabase Auth methods for consistent error handling.
 */
export const authService = {
  /**
   * Signs in a user with email and password
   */
  async signIn({ email, password }: LoginCredentials) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Signs up a new user
   */
  async signUp({ email, password, firstName, lastName, phone }: RegisterCredentials) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Signs out the current user
   */
  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Sends a password reset email
   */
  async resetPassword(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });
    if (error) throw error;
  },

  /**
   * Updates user password (after reset)
   */
  async updatePassword(newPassword: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  /**
   * Gets the current user session
   */
  async getSession() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Signs in with Google OAuth
   */
  async signInWithGoogle() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    });
    if (error) throw error;
  },
};
