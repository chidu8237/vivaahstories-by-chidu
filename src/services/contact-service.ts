import { createBrowserClient } from "@/lib/supabase/client";
import type { ContactInquiry, CreateContactInput, ContactStatus } from "@/types/contact";

export async function createContact(input: CreateContactInput): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = createBrowserClient();
  if (!supabase) {
    return { success: false, error: "Database not configured. Please try WhatsApp or email." };
  }

  const { error } = await supabase.from("contacts").insert({
    full_name: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() ?? null,
    subject: input.subject?.trim() ?? null,
    message: input.message.trim(),
    status: "new",
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createBrowserClient();
  if (!supabase) return { success: false, error: "Not configured" };

  const { error } = await supabase.from("contacts").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export type { ContactInquiry };
