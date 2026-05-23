import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { fetchBookings } from "@/services/booking-service.server";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await fetchBookings();
  return NextResponse.json(bookings);
}
