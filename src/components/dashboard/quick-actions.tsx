"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Image, Settings, Upload } from "lucide-react";
import { fadeInUp } from "@/constants/animations";
import { cn } from "@/lib/utils";

const actions = [
  { href: "/dashboard/bookings", label: "View Bookings", icon: Calendar },
  { href: "/dashboard/portfolio", label: "Manage Portfolio", icon: Image },
  { href: "/dashboard/uploads", label: "Upload Media", icon: Upload },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function QuickActions() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {actions.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "group flex items-center gap-3 rounded-sm border border-border p-4",
            "transition-all duration-500 hover:border-gold/30 hover:bg-muted/30 hover:shadow-luxury-sm",
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/20 bg-gold/5 transition-colors group-hover:bg-gold/10">
            <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </span>
          <span className="font-sans text-sm uppercase tracking-wider">{label}</span>
        </Link>
      ))}
    </motion.div>
  );
}
