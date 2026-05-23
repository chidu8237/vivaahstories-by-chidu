"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { BookingSuccess } from "@/components/booking/booking-success";
import {
  createBooking,
  getUnavailableDates,
} from "@/services/booking-service";
import type { Booking } from "@/types/booking";

const EVENT_TYPES = [
  "Wedding",
  "Pre-Wedding",
  "Engagement",
  "Reception",
  "Maternity",
  "Baby Shower",
  "Baby Shoot",
] as const;

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  eventType: z.string().min(1, "Select event type"),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  useEffect(() => {
    getUnavailableDates().then(setUnavailableDates);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { eventType: "Wedding" },
  });

  const onSubmit = async (data: BookingFormValues) => {
    const result = await createBooking({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      eventDate: data.eventDate,
      location: data.location,
      message: data.message,
    });

    if (!result.success) {
      toast.error("Submission failed", { description: result.error });
      return;
    }

    if (result.booking) {
      setSubmitted(result.booking);
      toast.success("Booking inquiry received!");
    }
    reset();
  };

  if (submitted) {
    return <BookingSuccess booking={submitted} onReset={() => setSubmitted(null)} />;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <BookingCalendar
              value={field.value}
              onChange={field.onChange}
              unavailableDates={unavailableDates}
            />
          )}
        />
        {errors.eventDate && (
          <p className="mt-2 text-sm text-destructive">{errors.eventDate.message}</p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="Bride & Groom names" />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventType">Event Type</Label>
          <select
            id="eventType"
            className="flex h-11 w-full rounded-sm border border-input bg-transparent px-4 font-body text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("eventType")}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-sm text-destructive">{errors.eventType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} placeholder="City, Venue" />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Share your vision, guest count, timeline..."
            className="min-h-[120px]"
          />
        </div>

        <Button type="submit" variant="luxury" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Booking Inquiry"
          )}
        </Button>
      </form>
    </div>
  );
}
