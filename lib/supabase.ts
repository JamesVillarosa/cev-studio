import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key.
 *
 * The service key bypasses Row Level Security, so it must never reach the
 * browser. Inserts (contact form) and reads (admin) both go through here,
 * which lets us lock the table down completely at the RLS layer — no public
 * access of any kind.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  topic: string | null;
  message: string;
  status: "new" | "read" | "archived";
};
