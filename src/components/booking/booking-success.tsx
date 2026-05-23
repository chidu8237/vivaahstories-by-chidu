"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { transitions } from "@/constants/animations";
import type { Booking } from "@/types/booking";
import { format, parseISO } from "date-fns";

interface BookingSuccessProps {
  booking: Booking;
  onReset: () => void;
}

export function BookingSuccess({ booking, onReset }: BookingSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transitions.cinematic}
      className="mx-auto max-w-lg rounded-sm border border-border glass-card p-10 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
        <Check className="h-8 w-8 text-gold" />
      </div>
      <h2 className="mt-6 font-display text-2xl">Inquiry Received</h2>
      <p className="mt-3 font-body text-muted-foreground">
        Thank you, {booking.full_name}. We&apos;ll confirm availability for your{" "}
        {booking.event_type.toLowerCase()} on{" "}
        {format(parseISO(booking.event_date), "MMMM d, yyyy")}.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <LuxuryButton href="/portfolio">View Portfolio</LuxuryButton>
        <button
          type="button"
          onClick={onReset}
          className="font-sans text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Submit another inquiry
        </button>
      </div>
    </motion.div>
  );
}
