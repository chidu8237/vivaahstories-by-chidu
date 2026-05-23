export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  location: string;
  message: string | null;
  status: BookingStatus;
  user_id: string | null;
}

export interface CreateBookingInput {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  message?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  portfolioUploads: number;
}
