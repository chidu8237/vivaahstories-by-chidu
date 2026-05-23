import "server-only";
import { createServerClient } from "@/lib/supabase/server";
import { getAdminSession } from "@/lib/admin";
import type { Booking, BookingStatus } from "@/types/booking";

export async function fetchBookings(): Promise<Booking[]> {
  const session = await getAdminSession();
  if (!session) return [];

  const { data, error } = await session.supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return [];

  return data.map((row) => ({
    id: row.id as string,
    created_at: row.created_at as string,
    full_name: row.full_name as string,
    email: row.email as string,
    phone: row.phone as string,
    event_type: row.event_type as string,
    event_date: row.event_date as string,
    location: row.location as string,
    message: (row.message as string) ?? null,
    status: row.status as BookingStatus,
    user_id: (row.user_id as string) ?? null,
  }));
}

export async function getBookingStats() {
  const bookings = await fetchBookings();
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return {
    total: bookings.length,
    pending,
    confirmed,
    completed,
  };
}

export async function fetchBookedDates(): Promise<string[]> {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("get_unavailable_dates");

  if (error || !data) return [];
  return (data as string[]).map((d) =>
    typeof d === "string" ? d.split("T")[0]! : String(d),
  );
}
