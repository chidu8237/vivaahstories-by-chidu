import { requireAdmin, getProfile } from "@/lib/auth";

export async function getDashboardUser() {
  const { user } = await requireAdmin();
  const profile = await getProfile(user.id);
  const meta = user.user_metadata as { full_name?: string } | undefined;
  const userName = profile?.full_name ?? meta?.full_name ?? user.email ?? undefined;
  return { user, profile, userName: userName as string | undefined };
}
