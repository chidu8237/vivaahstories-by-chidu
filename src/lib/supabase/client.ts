import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

let browserClient: SupabaseClient | null = null;

/**
 * Browser Supabase client — singleton to avoid multiple GoTrue instances.
 */
export function createBrowserClient(): SupabaseClient | null {
  const env = getSupabaseEnv();
  if (!env) {
    return null;
  }

  if (!browserClient) {
    browserClient = createSupabaseBrowserClient(env.url, env.anonKey);
  }

  return browserClient;
}

/** Alias matching Supabase Next.js template naming */
export const createClient = createBrowserClient;
