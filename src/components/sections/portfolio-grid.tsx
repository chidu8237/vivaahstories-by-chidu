"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerChildren } from "@/components/animations/stagger-children";
import { fadeInUp } from "@/constants/animations";
import type { PortfolioItem } from "@/types";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <motion.article
          key={item.id}
          variants={fadeInUp}
          className="group relative overflow-hidden rounded-sm"
        >
          <Link href={`/portfolio#${item.slug}`} className="block">
            <div className="aspect-editorial relative bg-muted">
              <div className="overlay-cinematic opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <p className="eyebrow text-white/70">{item.category}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </StaggerChildren>
  );
}
