import { NextResponse } from "next/server";
import { fetchBookedDates } from "@/services/booking-service.server";

export async function GET() {
  const dates = await fetchBookedDates();
  return NextResponse.json(dates);
}
