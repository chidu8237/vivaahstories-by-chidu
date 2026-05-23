"use client";

import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { Check, Mail, Phone, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/services/booking-service";
import { fadeInUp } from "@/constants/animations";
import type { Booking, BookingStatus } from "@/types/booking";
import { cn } from "@/lib/utils";

interface BookingsTableProps {
  bookings: Booking[];
  onUpdate: () => void;
  limit?: number;
}

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-gold/10 text-gold border-gold/30",
  confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  completed: "bg-muted text-muted-foreground border-border",
};

export function BookingsTable({ bookings, onUpdate, limit }: BookingsTableProps) {
  const display = limit ? bookings.slice(0, limit) : bookings;

  const handleStatus = async (id: string, status: BookingStatus) => {
    const result = await updateBookingStatus(id, status);
    if (!result.success) {
      toast.error(result.error ?? "Update failed");
      return;
    }
    toast.success(`Booking ${status}`);
    onUpdate();
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-border py-16 text-center">
        <p className="font-body text-muted-foreground">No booking inquiries yet.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="overflow-hidden rounded-sm border border-border"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Event</th>
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {display.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-border/50 transition-colors hover:bg-muted/25"
              >
                <td className="px-4 py-4">
                  <p className="font-medium">{booking.full_name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {booking.email}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {booking.phone}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-xs uppercase tracking-wider">
                    {booking.event_type}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {format(parseISO(booking.event_date), "MMM d, yyyy")}
                </td>
                <td className="max-w-[140px] truncate px-4 py-4" title={booking.location}>
                  {booking.location}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-sm border px-2.5 py-1 font-sans text-[10px] uppercase tracking-wider",
                      statusStyles[booking.status],
                    )}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {booking.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => handleStatus(booking.id, "confirmed")}
                      >
                        <Check className="h-3 w-3" />
                        Confirm
                      </Button>
                    )}
                    {booking.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => handleStatus(booking.id, "completed")}
                      >
                        Complete
                      </Button>
                    )}
                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 gap-1 text-destructive hover:text-destructive"
                        onClick={() => handleStatus(booking.id, "cancelled")}
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
