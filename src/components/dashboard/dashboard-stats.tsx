"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Image,
  Star,
  Upload,
  Users,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import type { BookingStats } from "@/types/booking";
import { cn } from "@/lib/utils";

export interface ExtendedStats extends BookingStats {
  portfolioCount?: number;
  featuredCount?: number;
}

interface DashboardStatsProps {
  stats: ExtendedStats;
  variant?: "overview" | "full";
}

const statConfig = (stats: ExtendedStats) => [
  {
    key: "total",
    label: "Total Bookings",
    value: stats.total,
    icon: Calendar,
    accent: "text-foreground",
  },
  {
    key: "pending",
    label: "Pending Requests",
    value: stats.pending,
    icon: Clock,
    accent: "text-gold",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    value: stats.confirmed,
    icon: Users,
    accent: "text-emerald-600",
  },
  {
    key: "portfolio",
    label: "Portfolio Projects",
    value: stats.portfolioCount ?? 0,
    icon: Image,
    accent: "text-foreground",
  },
  {
    key: "featured",
    label: "Featured",
    value: stats.featuredCount ?? 0,
    icon: Star,
    accent: "text-gold",
  },
  {
    key: "uploads",
    label: "Media Uploads",
    value: stats.portfolioUploads,
    icon: Upload,
    accent: "text-foreground",
  },
];

export function DashboardStats({ stats, variant = "full" }: DashboardStatsProps) {
  const items = variant === "overview" ? statConfig(stats).slice(0, 4) : statConfig(stats);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={cn(
        "grid gap-4",
        variant === "overview"
          ? "sm:grid-cols-2 xl:grid-cols-4"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      )}
    >
      {items.map(({ key, label, value, icon: Icon, accent }) => (
        <motion.div
          key={key}
          variants={fadeInUp}
          className="glass-card group rounded-sm border border-border p-5 transition-all duration-500 hover:border-gold/20 hover:shadow-luxury-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className={cn("mt-2 font-display text-3xl tabular-nums", accent)}>{value}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/15 bg-gold/5 transition-colors group-hover:bg-gold/10">
              <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
