"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { fadeInUp } from "@/constants/animations";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function DashboardHeader({ title, description, action }: DashboardHeaderProps) {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="eyebrow text-gold">{today}</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl font-body text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </motion.header>
  );
}
