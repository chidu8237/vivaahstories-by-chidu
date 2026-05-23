import "server-only";
import { getAdminSession } from "@/lib/admin";
import type { ContactInquiry } from "@/types/contact";

export async function fetchContacts(): Promise<ContactInquiry[]> {
  const session = await getAdminSession();
  if (!session) return [];

  const { data, error } = await session.supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ContactInquiry[];
}
