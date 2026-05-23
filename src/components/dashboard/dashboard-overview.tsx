"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";

interface DashboardOverviewProps {
  userName?: string;
}

export function DashboardOverview({ userName }: DashboardOverviewProps) {
  const { data, loading, refresh } = useDashboardData();

  if (loading || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const firstName = userName?.split(" ")[0];

  return (
    <div className="space-y-10">
      <DashboardHeader
        title={`Welcome${firstName ? `, ${firstName}` : ""}`}
        description="Your studio command center — bookings, portfolio, and media at a glance."
      />

      <DashboardStats
        stats={{
          ...data.stats,
          portfolioCount: data.portfolioCount,
          featuredCount: data.featuredCount,
        }}
        variant="overview"
      />

      <section>
        <h2 className="mb-4 font-display text-xl">Quick Actions</h2>
        <QuickActions />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent Bookings</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/bookings">View All</Link>
          </Button>
        </div>
        <BookingsTable bookings={data.bookings} onUpdate={refresh} limit={5} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-border p-6">
          <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
            Gallery Live
          </p>
          <p className="mt-2 font-display text-3xl text-gold">{data.galleryPublished}</p>
        </div>
        <div className="rounded-sm border border-border p-6">
          <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
            Draft Uploads
          </p>
          <p className="mt-2 font-display text-3xl">{data.galleryDraft}</p>
        </div>
        <div className="rounded-sm border border-border p-6">
          <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
            New Contacts
          </p>
          <p className="mt-2 font-display text-3xl">{data.contactsNew}</p>
        </div>
      </section>
    </div>
  );
}
