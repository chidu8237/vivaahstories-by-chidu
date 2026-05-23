import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types/auth";

export async function getSession() {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function requireAuth(redirectTo = "/login") {
  const user = await getSession();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireAdmin(redirectTo = "/login") {
  const user = await requireAuth(redirectTo);
  const profile = await getProfile(user.id);

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return { user, profile };
}

export { isSupabaseConfigured as isSupabaseAuthConfigured } from "@/lib/supabase/env";
