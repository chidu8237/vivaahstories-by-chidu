"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { Reveal } from "@/components/animations/reveal";

import { CinematicImage } from "@/components/shared/cinematic-image";

import { SectionHeading } from "@/components/shared/typography";

import { SectionWrapper } from "@/components/shared/section-wrapper";

import {
  staggerContainer,
  fadeInUp,
} from "@/constants/animations";

import { PORTFOLIO_CATEGORIES } from "@/constants/home";

import { cn } from "@/lib/utils";

const spanClasses: Record<
  string,
  string
> = {
  tall: "md:row-span-2",

  wide: "md:col-span-2",

  default: "",
};

type DashboardGallery = {
  id: number;

  title: string;

  category: string;

  image: string;

  published: boolean;
};

export function PortfolioPreviewSection() {
  // =========================================
  // DASHBOARD DATA
  // =========================================

  const [
    dashboardCategories,
    setDashboardCategories,
  ] = useState(
    PORTFOLIO_CATEGORIES,
  );

  useEffect(() => {
    const savedGallery =
      localStorage.getItem(
        "galleryImages",
      );

    if (!savedGallery) return;

    const parsed: DashboardGallery[] =
      JSON.parse(savedGallery);

    // ONLY PUBLISHED
    const publishedImages =
      parsed.filter(
        (img) =>
          img.published === true,
      );

    // CONVERT TO EXISTING UI FORMAT
    const formatted =
      publishedImages.map(
        (
          img,
          index,
        ) => ({
          id: String(img.id),

          title: img.title,

          slug: img.category
            .toLowerCase()
            .replace(
              /\s+/g,
              "-",
            ),

          image: img.image,

          span:
            index % 3 === 0
              ? "tall"
              : "default",
        }),
      );

    // USE DASHBOARD DATA
    if (formatted.length > 0) {
      setDashboardCategories(
        formatted,
      );
    }
  }, []);

  return (
    <SectionWrapper
      id="portfolio-preview"
      bordered
      ariaLabel="Featured portfolio"
    >
      <Reveal>
        <SectionHeading
          title="Stories Worth Framing"
          subtitle="Explore our collections — hover to reveal the full spectrum of emotion in color."
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-60px",
        }}
        variants={
          staggerContainer
        }
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {dashboardCategories.map(
          (item, index) => (
            <motion.div
              key={item.id}
              variants={
                fadeInUp
              }
              className={cn(
                "group",
                spanClasses[
                  item.span
                ],
              )}
            >
              <Link
                href={`/portfolio?category=${item.slug}`}
                className="relative block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div
                  className={cn(
                    "relative overflow-hidden",

                    item.span ===
                      "tall"
                      ? "aspect-[3/5] md:min-h-[480px]"
                      : "aspect-editorial",
                  )}
                >
                  <CinematicImage
                    src={item.image}
                    alt={`${item.title} photography`}
                    withGrain
                    bwHover
                    sizes="(max-width: 768px) 100vw, 33vw"
                    containerClassName="absolute inset-0"
                  />

                  <div className="overlay-cinematic z-[3] opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute inset-0 z-[4] flex flex-col justify-end p-6 md:p-8">
                    <span className="eyebrow mb-2 text-white/60 transition-colors group-hover:text-gold">
                      0
                      {index + 1}
                    </span>

                    <h3 className="font-display text-2xl text-white md:text-3xl">
                      {item.title}
                    </h3>

                    <span className="mt-3 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-white/0 transition-all duration-500 group-hover:text-white/90">
                      View
                      Collection

                      <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-8" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ),
        )}
      </motion.div>

      <Reveal className="mt-14 text-center">
        <Link
          href="/portfolio"
          className="link-luxury font-sans text-sm uppercase tracking-[0.2em]"
        >
          View Full Portfolio
        </Link>
      </Reveal>
    </SectionWrapper>
  );
}