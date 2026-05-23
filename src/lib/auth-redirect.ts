import { siteConfig } from "@/config/site";

/** Allowed internal redirect paths after auth */
const ALLOWED_PREFIXES = [
  "/",
  "/dashboard",
  "/portfolio",
  "/booking",
  "/about",
  "/contact",
];

/**
 * Canonical site origin for auth redirects (no trailing slash).
 */
export function getSiteOrigin(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  try {
    return new URL(url).origin;
  } catch {
    return "http://localhost:3000";
  }
}

/**
 * Full URL Supabase must redirect to after email verification / OAuth.
 */
export function getAuthCallbackUrl(next = "/"): string {
  const safeNext = getSafeRedirectPath(next, "/");
  const origin = getSiteOrigin();
  return `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
}

/**
 * Prevents open redirects and invalid paths from Supabase `next` param.
 */
export function getSafeRedirectPath(next: string | null | undefined, fallback = "/"): string {
  if (!next || typeof next !== "string") return fallback;

  const path = next.trim();

  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  if (path.includes("..") || path.includes("\\")) return fallback;

  const pathname = path.split("?")[0] ?? fallback;

  const allowed = ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || (prefix !== "/" && pathname.startsWith(`${prefix}/`)),
  );

  if (!allowed && pathname !== "/") return fallback;

  return path;
}

export function buildAuthErrorRedirect(code: string, message?: string): string {
  const params = new URLSearchParams({ error: code });
  if (message) params.set("message", message);
  return `/login?${params.toString()}`;
}
