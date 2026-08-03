/**
 * Supabase auto-generated database types placeholder.
 *
 * To generate the actual types from your Supabase project, run:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
 *
 * Or using the Supabase CLI:
 *   supabase gen types typescript --local > types/database.types.ts
 *
 * This file will be replaced by the generated output.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Tables will be generated from Supabase CLI
      // Run: npx supabase gen types typescript --project-id <id> --schema public > types/database.types.ts
      [tableName: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: {
      [viewName: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [functionName: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [enumName: string]: string;
    };
  };
}
