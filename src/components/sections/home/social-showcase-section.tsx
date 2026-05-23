"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/shared/typography";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { SOCIAL_GALLERY, IMAGE_BLUR } from "@/constants/home";
import { siteConfig } from "@/config/site";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { cn } from "@/lib/utils";

const floatOffsets = [
  "rotate-[-2deg] translate-y-0",
  "rotate-[1deg] translate-y-4",
  "rotate-[-1deg] -translate-y-2",
  "rotate-[2deg] translate-y-6",
  "rotate-[-3deg] translate-y-2",
  "rotate-[1deg] -translate-y-4",
];

export function SocialShowcaseSection() {
  return (
    <SectionWrapper bordered ariaLabel="Social media showcase">
      <Reveal>
        <SectionHeading
          title="Follow the Journey"
          subtitle="Behind-the-scenes moments, new stories, and cinematic highlights."
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6"
      >
        {SOCIAL_GALLERY.map((item, i) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-sm",
              "transition-transform duration-500 hover:z-10 hover:scale-105",
              floatOffsets[i % floatOffsets.length],
            )}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, 16vw"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <LuxuryButton href={siteConfig.links.instagram} external showArrow className="gap-2">
          <Instagram className="h-4 w-4" />
          Instagram
        </LuxuryButton>
        <LuxuryButton href={siteConfig.links.youtube} external variant="outline" className="gap-2">
          <Youtube className="h-4 w-4" />
          YouTube
        </LuxuryButton>
      </Reveal>

      <p className="mt-8 text-center font-sans text-xs text-muted-foreground">
        <Link href={siteConfig.links.instagram} className="link-luxury">
          @{siteConfig.shortName.toLowerCase()}.bychidu
        </Link>
      </p>
    </SectionWrapper>
  );
}
