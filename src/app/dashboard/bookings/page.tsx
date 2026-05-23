"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

export default function DashboardBookingsPage() {
  const { data, loading, refresh } = useDashboardData();

  if (loading || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Bookings"
        description="Manage client inquiries, confirm dates, and track event details."
        action={
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            Refresh
          </Button>
        }
      />

      <div className="flex flex-wrap gap-4 font-sans text-sm">
        <span className="rounded-sm border border-gold/30 bg-gold/10 px-3 py-1 text-gold">
          {data.stats.pending} pending
        </span>
        <span className="rounded-sm border border-border px-3 py-1 text-muted-foreground">
          {data.stats.confirmed} confirmed
        </span>
        <span className="rounded-sm border border-border px-3 py-1 text-muted-foreground">
          {data.stats.total} total
        </span>
      </div>

      <BookingsTable bookings={data.bookings} onUpdate={refresh} />

      <p className="font-body text-sm text-muted-foreground">
        Public booking form at{" "}
        <Link href="/booking" className="link-luxury text-foreground">
          /booking
        </Link>
      </p>
    </div>
  );
}
