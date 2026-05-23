import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Supabase client for Route Handlers — cookies must be written to the redirect response.
 * Required for exchangeCodeForSession to persist the session (Next.js 15 / App Router).
 */
export function createRouteHandlerClient(
  request: NextRequest,
  response: NextResponse,
) {
  const env = getSupabaseEnv();
  if (!env) return null;

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options ?? {});
        });
      },
    },
  });
}
