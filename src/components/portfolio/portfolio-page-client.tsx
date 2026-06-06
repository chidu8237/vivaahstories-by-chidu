"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { PortfolioHero } from "@/components/portfolio/portfolio-hero";

import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";

import { GalleryGrid } from "@/components/portfolio/gallery-grid";

import { FeaturedProject } from "@/components/portfolio/featured-project";

import { CinematicStorySection } from "@/components/portfolio/cinematic-story";

import { VideoShowcase } from "@/components/portfolio/video-showcase";

import { SectionWrapper } from "@/components/shared/section-wrapper";

import {
  CINEMATIC_STORIES,
  FEATURED_PROJECTS,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  VIDEO_PROJECTS,
} from "@/data/portfolio-data";

import type {
  PortfolioCategory,
  PortfolioCategorySlug,
  PortfolioProject,
} from "@/types/portfolio";

import { transitions } from "@/constants/animations";

interface PortfolioPageClientProps {
  dynamicProjects?: PortfolioProject[];

  dynamicCategories?: PortfolioCategory[];
}

function filterProjects(
  projects: PortfolioProject[],
  category: PortfolioCategorySlug,
): PortfolioProject[] {
  if (category === "all")
    return projects;

  return projects.filter(
    (p) =>
      p.category === category,
  );
}

export function PortfolioPageClient({
  dynamicProjects,

  dynamicCategories,
}: PortfolioPageClientProps) {
  const projects =
    dynamicProjects?.length
      ? dynamicProjects
      : PORTFOLIO_PROJECTS;

  const categories =
    dynamicCategories?.length
      ? dynamicCategories
      : PORTFOLIO_CATEGORIES;

  const useLiveGallery =
    Boolean(
      dynamicProjects?.length,
    );

  const [filter, setFilter] =
    useState<PortfolioCategorySlug>(
      "all",
    );

  const filteredProjects =
    useMemo(
      () =>
        filterProjects(
          projects,
          filter,
        ),

      [projects, filter],
    );

  const featured =
    projects.find(
      (p) => p.featured,
    ) ??
    projects[0] ??
    FEATURED_PROJECTS[0];

  return (
    <>
      {/* HERO */}
      <PortfolioHero />

      {/* GALLERY */}
      <SectionWrapper
        id="gallery"
        ariaLabel="Portfolio gallery"
      >
        <div className="mb-12">
          <PortfolioFilter
            categories={
              categories
            }
            active={filter}
            onChange={setFilter}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={
              transitions.luxury
            }
          >
            <GalleryGrid
              projects={
                filteredProjects
              }
            />
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length ===
          0 && (
          <p className="py-20 text-center font-body text-muted-foreground">
            No images in this
            category yet.
            Check back soon.
          </p>
        )}
      </SectionWrapper>

      {/* FEATURED */}
      {!useLiveGallery &&
        featured && (
          <FeaturedProject
            project={featured}
          />
        )}

      {/* STORIES */}
      {!useLiveGallery && (
        <CinematicStorySection
          stories={
            CINEMATIC_STORIES
          }
        />
      )}

      {/* VIDEOS */}
      {!useLiveGallery && (
        <VideoShowcase
          videos={
            VIDEO_PROJECTS
          }
        />
      )}
    </>
  );
}