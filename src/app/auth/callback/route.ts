import { NextResponse, type NextRequest } from "next/server";
import { buildAuthErrorRedirect, getSafeRedirectPath, getSiteOrigin } from "@/lib/auth-redirect";
import { createRouteHandlerClient } from "@/lib/supabase/route-handler";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const origin = getSiteOrigin();
  const code = requestUrl.searchParams.get("code");
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"), "/");

  const authError = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (authError) {
    return NextResponse.redirect(
      new URL(buildAuthErrorRedirect(authError, errorDescription ?? undefined), origin),
    );
  }

  if (!getSupabaseEnv()) {
    return NextResponse.redirect(
      new URL(buildAuthErrorRedirect("config", "Supabase is not configured"), origin),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL(buildAuthErrorRedirect("missing_code", "No verification code received"), origin),
    );
  }

  const redirectUrl = new URL(next, origin);
  redirectUrl.searchParams.set("verified", "true");

  const response = NextResponse.redirect(redirectUrl);
  const supabase = createRouteHandlerClient(request, response);

  if (!supabase) {
    return NextResponse.redirect(
      new URL(buildAuthErrorRedirect("config", "Could not initialize Supabase"), origin),
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(buildAuthErrorRedirect("exchange_failed", error.message), origin),
    );
  }

  return response;
}
