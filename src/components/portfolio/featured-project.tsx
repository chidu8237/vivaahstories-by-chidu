"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { SectionHeading } from "@/components/shared/typography";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { IMAGE_BLUR } from "@/constants/home";
import { resolveImageSrc } from "@/lib/cloudinary-image";
import type { PortfolioProject } from "@/types/portfolio";

interface FeaturedProjectProps {
  project: PortfolioProject;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const src = resolveImageSrc(project.coverImage);

  return (
    <section className="section-padding border-t border-border" aria-label="Featured project">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            title="Featured Story"
            subtitle="An editorial spotlight on a celebration crafted with cinematic intention."
          />
        </Reveal>

        <div ref={ref} className="relative overflow-hidden rounded-sm">
          <motion.div style={{ y: imageY }} className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={src}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <GrainOverlay intensity="light" />
          </motion.div>

          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="w-full p-8 md:max-w-xl md:p-14 lg:p-20">
              <Reveal>
                <span className="eyebrow text-gold">{project.categoryLabel}</span>
                <h3 className="mt-4 font-display text-display-md text-white">{project.title}</h3>
                <p className="mt-2 font-sans text-sm text-white/60">
                  {project.location} · {project.year}
                </p>
                <p className="mt-6 font-body leading-relaxed text-white/80">
                  {project.description}
                </p>
                <div className="mt-8">
                  <LuxuryButton
                    href="/booking"
                    className="border-white/40 text-white hover:bg-white hover:text-black"
                  >
                    Book Similar Session
                  </LuxuryButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
