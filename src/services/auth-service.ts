import { createBrowserClient } from "@/lib/supabase/client";
import { getAuthCallbackUrl } from "@/lib/auth-redirect";
import type { LoginInput, RegisterInput } from "@/types/auth";

export type AuthResult = { success: true } | { success: false; error: string };

export type RegisterResult =
  | { success: true; needsEmailVerification: boolean }
  | { success: false; error: string };

const CONFIG_ERROR =
  "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.";

function getClient():
  | { supabase: NonNullable<ReturnType<typeof createBrowserClient>> }
  | { error: string } {
  const supabase = createBrowserClient();
  if (!supabase) {
    return { error: CONFIG_ERROR };
  }
  return { supabase };
}

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const client = getClient();
  if ("error" in client) {
    return { success: false, error: client.error };
  }

  const { supabase } = client;

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
      },
      emailRedirectTo: getAuthCallbackUrl("/"),
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Session present = email confirmation disabled in Supabase
  const needsEmailVerification = !data.session;

  return { success: true, needsEmailVerification };
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const client = getClient();
  if ("error" in client) {
    return { success: false, error: client.error };
  }

  const { error } = await client.supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  await client.supabase.auth.getSession();

  return { success: true };
}

export async function logoutUser(): Promise<AuthResult> {
  const client = getClient();
  if ("error" in client) {
    return { success: false, error: client.error };
  }

  const { error } = await client.supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function resendVerificationEmail(email: string): Promise<AuthResult> {
  const client = getClient();
  if ("error" in client) {
    return { success: false, error: client.error };
  }

  const { error } = await client.supabase.auth.resend({
    type: "signup",
    email: email.trim(),
    options: {
      emailRedirectTo: getAuthCallbackUrl("/"),
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getCurrentUser() {
  const client = getClient();
  if ("error" in client) return null;

  const {
    data: { user },
  } = await client.supabase.auth.getUser();

  return user;
}
