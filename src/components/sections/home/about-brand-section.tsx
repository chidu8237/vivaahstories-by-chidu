"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { Eyebrow, DisplayText } from "@/components/shared/typography";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { slideInLeft, slideInRight } from "@/constants/animations";
import { BRAND_STATS } from "@/constants/home";
import { IMAGE_BLUR } from "@/constants/home";
import { GrainOverlay } from "@/components/shared/grain-overlay";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1554048612-b6a482b17f0e?w=900&q=80";

export function AboutBrandSection() {
  return (
    <SectionWrapper dark ariaLabel="About the brand">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal variants={slideInLeft}>
          <div className="relative aspect-editorial overflow-hidden rounded-sm">
            <Image
              src={ABOUT_IMAGE}
              alt="Wedding photographer at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
            />
            <GrainOverlay intensity="light" />
            <div className="absolute bottom-6 left-6 z-10">
              <Eyebrow gold>By Chidu</Eyebrow>
            </div>
          </div>
        </Reveal>

        <Reveal variants={slideInRight}>
          <Eyebrow gold className="mb-4 text-gold">
            The Artist
          </Eyebrow>
          <DisplayText as="h2" size="lg" className="text-cinematic-white">
            Emotion Beyond Photographs
          </DisplayText>
          <p className="mt-6 font-body text-lg leading-relaxed text-cinematic-gray">
            Capturing emotions beyond photographs. Every frame is crafted to preserve
            timeless memories with cinematic elegance.
          </p>
          <p className="mt-4 font-body leading-relaxed text-cinematic-gray/90">
            VivaahStories blends editorial composition with film-grade storytelling —
            honoring tradition while creating art that feels effortlessly modern.
          </p>

          <ul className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {BRAND_STATS.map((stat) => (
              <li key={stat.label}>
                <p className="font-display text-3xl text-cinematic-white md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-sans text-xs uppercase tracking-wider text-cinematic-gray">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <LuxuryButton href="/about" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black">
              Our Story
            </LuxuryButton>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
