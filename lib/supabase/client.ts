import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

/**
 * Supabase Browser Client
 *
 * Use this in Client Components ("use client") for:
 * - Auth state management
 * - Real-time subscriptions
 * - Client-side queries
 *
 * @example
 * const supabase = createClient();
 * const { data, error } = await supabase.from("students").select("*");
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient<any>(url, anonKey);
}
