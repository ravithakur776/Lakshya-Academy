import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Supabase Server Client
 *
 * Use this in Server Components, Route Handlers, and Server Actions.
 * Reads auth cookies from the request to maintain session context.
 *
 * @example
 * // In a Server Component:
 * const supabase = await createClient();
 * const { data: { user } } = await supabase.auth.getUser();
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll() can be called from a Server Component.
            // This is safe to ignore — the middleware will refresh the session.
          }
        },
      },
    }
  );
}

/**
 * Supabase Admin Client
 *
 * Use this in trusted server-side code only (API routes, cron jobs).
 * Bypasses Row Level Security — NEVER expose to client.
 */
export async function createAdminClient() {
  const { createClient: createSupabaseAdmin } = await import(
    "@supabase/supabase-js"
  );

  return createSupabaseAdmin<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
