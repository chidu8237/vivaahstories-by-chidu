import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { getSupabaseEnv } from "@/lib/supabase/env";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/register"];

type CookieToSet = { name: string; value: string; options?: CookieOptions };

function applyCookiesToResponse(
  request: NextRequest,
  cookiesToSet: CookieToSet[],
): NextResponse {
  const response = NextResponse.next({ request });

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options ?? {});
  });

  return response;
}

/**
 * Refreshes Supabase session and applies route protection.
 * Official @supabase/ssr pattern for Next.js 15 middleware.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const env = getSupabaseEnv();

  if (!env) {
    if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        supabaseResponse = applyCookiesToResponse(request, cookiesToSet);
      },
    },
  });

  // Required: refreshes session if expired — must run immediately after client creation
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    const destination = getSafeRedirectPath(
      request.nextUrl.searchParams.get("redirect"),
      "/",
    );
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return supabaseResponse;
}
