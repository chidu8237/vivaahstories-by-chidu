"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { GalleryGrid } from "@/components/portfolio/gallery-grid";
import {
  LightboxModal,
  type LightboxItem,
} from "@/components/portfolio/lightbox-modal";

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
  getAllGalleryImages,
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
  if (category === "all") return projects;

  return projects.filter(
    (p) => p.category === category,
  );
}

export function PortfolioPageClient({
  dynamicProjects,
  dynamicCategories,
}: PortfolioPageClientProps) {

  // =========================================
  // DASHBOARD CONNECT
  // =========================================

  const [dashboardProjects, setDashboardProjects] =
    useState<PortfolioProject[]>([]);

  const [dashboardCategories, setDashboardCategories] =
    useState<PortfolioCategory[]>([]);

  useEffect(() => {
    const savedGallery =
      localStorage.getItem("galleryImages");

    if (!savedGallery) return;

    const parsed = JSON.parse(savedGallery);

    // ONLY PUBLISHED IMAGES
    const publishedImages = parsed.filter(
      (img: any) => img.published === true,
    );

    // PROJECTS
    const formattedProjects: PortfolioProject[] =
      publishedImages.map((img: any) => ({
        id: String(img.id),

        title: img.title,

        slug: img.title
          .toLowerCase()
          .replace(/\s+/g, "-"),

        category: img.category
          .toLowerCase()
          .replace(/\s+/g, "-"),

        featured: false,

        coverImage:
          img.images?.[0] ||
          img.image ||
        "/placeholder.jpg",

        images:
          img.images?.length > 0
            ? img.images
            : [img.image],

        description: img.title,
      }));

    setDashboardProjects(formattedProjects);

    // CATEGORIES
    const uniqueCategories = [
      ...new Set(
        publishedImages.map(
          (img: any) => img.category,
        ),
      ),
    ];

    const formattedCategories: PortfolioCategory[] =
      [
        {
          id: "all",
          label: "All",
          slug: "all",
        },

        ...uniqueCategories.map((cat: any) => ({
          id: cat
            .toLowerCase()
            .replace(/\s+/g, "-"),

          label: cat,

          slug: cat
            .toLowerCase()
            .replace(
              /\s+/g,
              "-",
            ) as PortfolioCategorySlug,
        })),
      ];

    setDashboardCategories(
      formattedCategories,
    );
  }, []);

  // =========================================
  // USE DASHBOARD DATA FIRST
  // =========================================

  const projects =
    dashboardProjects.length > 0
      ? dashboardProjects
      : dynamicProjects?.length
      ? dynamicProjects
      : PORTFOLIO_PROJECTS;

  const categories =
    dashboardCategories.length > 0
      ? dashboardCategories
      : dynamicCategories?.length
      ? dynamicCategories
      : PORTFOLIO_CATEGORIES;

  const useLiveGallery =
    dashboardProjects.length > 0 ||
    Boolean(dynamicProjects?.length);

  // =========================================
  // EXISTING UI
  // =========================================

  const [filter, setFilter] =
    useState<PortfolioCategorySlug>(
      "all",
    );

  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const filteredProjects = useMemo(
    () =>
      filterProjects(
        projects,
        filter,
      ),
    [projects, filter],
  );

  const lightboxItems: LightboxItem[] =
    useMemo(() => {
      const filtered =
        filterProjects(
          projects,
          filter,
        );

      const flat =
        getAllGalleryImages(
          filtered,
        );

      return flat.map(
        ({ project, index }) => ({
          project,
          imageIndex: index,
        }),
      );
    }, [projects, filter]);

  const openProject = (
    projectId: string,
  ) => {
    const idx =
      lightboxItems.findIndex(
        (item) =>
          item.project.id ===
          projectId,
      );

    setLightboxIndex(
      idx >= 0 ? idx : 0,
    );
  };

  const featured =
    projects.find(
      (p) => p.featured,
    ) ??
    projects[0] ??
    FEATURED_PROJECTS[0];

  return (
    <>
      <PortfolioHero />

      <SectionWrapper
        id="gallery"
        ariaLabel="Portfolio gallery"
      >
        <div className="mb-12">
          <PortfolioFilter
            categories={categories}
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
              onOpenProject={
                openProject
              }
            />
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length ===
          0 && (
          <p className="py-20 text-center font-body text-muted-foreground">
            No images in this
            category yet. Check
            back soon.
          </p>
        )}
      </SectionWrapper>

      {!useLiveGallery &&
        featured && (
          <FeaturedProject
            project={featured}
          />
        )}

      {!useLiveGallery && (
        <CinematicStorySection
          stories={
            CINEMATIC_STORIES
          }
        />
      )}

      {!useLiveGallery && (
        <VideoShowcase
          videos={VIDEO_PROJECTS}
        />
      )}

      <LightboxModal
        items={lightboxItems}
        currentIndex={
          lightboxIndex
        }
        onClose={() =>
          setLightboxIndex(
            null,
          )
        }
        onNavigate={
          setLightboxIndex
        }
      />
    </>
  );
}