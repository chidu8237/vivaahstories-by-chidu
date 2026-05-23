"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventType: z.string().min(2, "Event type is required"),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (_data: BookingFormValues) => {
    // TODO: Persist to Supabase bookings table
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Booking inquiry received!", {
      description: "We'll confirm availability and reach out shortly.",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="Bride & Groom names" />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="eventDate">Event Date</Label>
          <Input id="eventDate" type="date" {...register("eventDate")} />
          {errors.eventDate && (
            <p className="text-sm text-destructive">{errors.eventDate.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventType">Event Type</Label>
          <Input id="eventType" {...register("eventType")} placeholder="Wedding, Reception..." />
          {errors.eventType && (
            <p className="text-sm text-destructive">{errors.eventType.message}</p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} placeholder="City, Venue" />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">Additional Details</Label>
          <Textarea id="message" {...register("message")} placeholder="Share your vision..." />
        </div>
      </div>
      <Button type="submit" variant="luxury" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Booking Inquiry"}
      </Button>
    </form>
  );
}
