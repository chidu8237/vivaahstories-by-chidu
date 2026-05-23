import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/env";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Server Component / Route Handler Supabase client.
 * Uses getAll + setAll per @supabase/ssr requirements.
 */
export async function createServerClient() {
  const env = getSupabaseEnv();
  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createSupabaseServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options ?? {});
          });
        } catch {
          // setAll called from Server Component — middleware will refresh session
        }
      },
    },
  });
}

/** Alias for clearer imports in route handlers */
export const createClient = createServerClient;
