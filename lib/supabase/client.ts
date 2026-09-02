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
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://itpenrvnsqttdqfflluv.supabase.co";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0cGVucnZuc3F0dGRxZmZsbHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NDA5OTIsImV4cCI6MjEwMTMxNjk5Mn0.FD19WvmoAMCY0jW1Hx7yeCDy112BldUIWSDVUejEMKk";

  return createBrowserClient<any>(url, anonKey);
}
