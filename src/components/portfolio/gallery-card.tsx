"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";
import { resolveImageSrc } from "@/lib/cloudinary-image";
import type { PortfolioProject } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  project: PortfolioProject;
  onClick: () => void;
  className?: string;
}

const spanClasses: Record<string, string> = {
  tall: "mb-4 break-inside-avoid md:mb-6",
  wide: "mb-4 break-inside-avoid md:mb-6",
  default: "mb-4 break-inside-avoid md:mb-6",
};

export function GalleryCard({ project, onClick, className }: GalleryCardProps) {
  const src = resolveImageSrc(project.coverImage, project.images[0]?.cloudinaryId);
  const aspect =
    project.span === "tall"
      ? "aspect-[3/4]"
      : project.span === "wide"
        ? "aspect-[16/10]"
        : "aspect-[4/5]";

  return (
    <motion.article
      variants={fadeInUp}
      className={cn("group cursor-pointer", spanClasses[project.span ?? "default"], className)}
    >
      <button
        type="button"
        onClick={onClick}
        className="relative block w-full overflow-hidden rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`View ${project.title}`}
      >
        <div className={cn("relative overflow-hidden", aspect)}>
          <Image
            src={src}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
            className="img-cinematic-bw object-cover"
          />
          <div className="overlay-cinematic z-[2] opacity-70 transition-opacity duration-500 group-hover:opacity-85" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

          <div className="absolute inset-x-0 bottom-0 z-[4] p-5 md:p-6">
            <span className="eyebrow text-white/60 transition-colors duration-500 group-hover:text-gold">
              {project.categoryLabel}
            </span>
            <h3 className="mt-2 font-display text-xl text-white transition-transform duration-500 group-hover:translate-y-[-2px] md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 font-sans text-xs text-white/50">
              {project.location} · {project.year}
            </p>
            <span className="mt-3 inline-block h-px w-0 bg-gold transition-all duration-500 group-hover:w-12" />
          </div>
        </div>
      </button>
    </motion.article>
  );
}
