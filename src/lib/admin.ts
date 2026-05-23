import { createServerClient } from "@/lib/supabase/server";

export async function getAdminSession() {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isProfileAdmin = profile?.role === "admin";

  if (!isProfileAdmin) {
    const { data: adminRow } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminRow) return null;
  }

  return { supabase, user };
}
