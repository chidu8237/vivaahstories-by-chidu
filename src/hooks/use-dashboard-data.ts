"use client";

import { useCallback, useEffect, useState } from "react";
import type { Booking, BookingStats } from "@/types/booking";

export interface DashboardData {
  bookings: Booking[];
  stats: BookingStats;
  portfolioCount: number;
  featuredCount: number;
  galleryPublished: number;
  galleryDraft: number;
  contactsNew: number;
}

const emptyStats: BookingStats = {
  total: 0,
  pending: 0,
  confirmed: 0,
  portfolioUploads: 0,
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsRes, galleryRes, contactsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/gallery?admin=true"),
        fetch("/api/contacts"),
      ]);

      const bookings: Booking[] = bookingsRes.ok ? await bookingsRes.json() : [];
      const gallery = galleryRes.ok ? await galleryRes.json() : [];
      const contacts = contactsRes.ok ? await contactsRes.json() : [];

      const published = gallery.filter((g: { published: boolean }) => g.published).length;

      setData({
        bookings,
        stats: {
          total: bookings.length,
          pending: bookings.filter((b) => b.status === "pending").length,
          confirmed: bookings.filter((b) => b.status === "confirmed").length,
          portfolioUploads: gallery.length,
        },
        portfolioCount: gallery.length,
        featuredCount: gallery.filter((g: { featured: boolean }) => g.featured).length,
        galleryPublished: published,
        galleryDraft: gallery.length - published,
        contactsNew: contacts.filter((c: { status: string }) => c.status === "new").length,
      });
    } catch {
      setError("Failed to load dashboard data");
      setData({
        bookings: [],
        stats: emptyStats,
        portfolioCount: 0,
        featuredCount: 0,
        galleryPublished: 0,
        galleryDraft: 0,
        contactsNew: 0,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
