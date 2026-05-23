import { createBrowserClient } from "@/lib/supabase/client";
import type { Booking, BookingStatus, CreateBookingInput } from "@/types/booking";

export async function createBooking(input: CreateBookingInput): Promise<{
  success: boolean;
  error?: string;
  booking?: Booking;
}> {
  const supabase = createBrowserClient();

  const payload = {
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    event_type: input.eventType,
    event_date: input.eventDate,
    location: input.location,
    message: input.message ?? null,
    status: "pending" as const,
  };

  if (!supabase) {
    return {
      success: false,
      error: "Booking system is not configured. Please contact us on WhatsApp.",
    };
  }

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...payload, user_id: userData.user?.id ?? null })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  return {
    success: true,
    booking: {
      id: data.id as string,
      created_at: data.created_at as string,
      full_name: data.full_name as string,
      email: data.email as string,
      phone: data.phone as string,
      event_type: data.event_type as string,
      event_date: data.event_date as string,
      location: data.location as string,
      message: (data.message as string) ?? null,
      status: data.status as BookingStatus,
      user_id: (data.user_id as string) ?? null,
    },
  };
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createBrowserClient();
  if (!supabase) return { success: true };

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getUnavailableDates(): Promise<string[]> {
  try {
    const res = await fetch("/api/bookings/dates", { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as string[];
  } catch {
    return [];
  }
}
