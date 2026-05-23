"use client";

import { motion } from "framer-motion";
import type { PortfolioCategory, PortfolioCategorySlug } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { transitions } from "@/constants/animations";

interface PortfolioFilterProps {
  categories: PortfolioCategory[];
  active: PortfolioCategorySlug;
  onChange: (slug: PortfolioCategorySlug) => void;
}

export function PortfolioFilter({ categories, active, onChange }: PortfolioFilterProps) {
  return (
    <div
      className="scrollbar-none -mx-[var(--container-px)] overflow-x-auto px-[var(--container-px)]"
      role="tablist"
      aria-label="Filter portfolio by category"
    >
      <div className="flex min-w-max gap-2 pb-2 md:flex-wrap md:justify-center md:gap-3">
        {categories.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.slug)}
              className={cn(
                "relative rounded-sm px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                isActive
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 rounded-sm bg-foreground"
                  transition={transitions.spring}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
