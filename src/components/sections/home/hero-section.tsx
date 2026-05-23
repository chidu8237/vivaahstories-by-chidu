"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { DisplayText, Eyebrow } from "@/components/shared/typography";
import { transitions } from "@/constants/animations";
import { HERO_IMAGE, IMAGE_BLUR } from "@/constants/home";
import { siteConfig } from "@/config/site";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(24);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (!imageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.4, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          ref={imageRef}
          className="relative h-[120%] w-full will-change-transform"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Cinematic wedding photography by VivaahStories"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
            className="object-cover animate-slow-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        <GrainOverlay intensity="medium" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container-editorial relative z-10 flex flex-col items-center pt-24 text-center md:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.luxury, delay: 0.3 }}
        >
          <Eyebrow gold className="mb-6 text-white/80">
            {siteConfig.shortName}.ByChidu
          </Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.5 }}
        >
          <DisplayText
            as="h1"
            size="xl"
            className="max-w-5xl text-balance text-white drop-shadow-lg"
          >
            {siteConfig.tagline}
          </DisplayText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.75 }}
          className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg"
        >
          Cinematic wedding storytelling crafted with emotion, elegance, and timeless
          artistry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.95 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <LuxuryButton href="/portfolio" size="lg" showArrow>
            Explore Stories
          </LuxuryButton>
          <LuxuryButton
            href="/booking"
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-black"
          >
            Book Session
          </LuxuryButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#portfolio-preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
        aria-label="Scroll to portfolio"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-14 w-px overflow-hidden bg-white/20">
          <div className="h-full w-full origin-top animate-scroll-line bg-white/80" />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>

      {/* Video play hint — placeholder for future reel */}
      <div
        className={cn(
          "absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:flex",
          "rounded-sm border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md",
        )}
        aria-hidden
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
        <span className="font-sans text-[10px] uppercase tracking-widest text-white/70">
          Cinematic Reel
        </span>
      </div>
    </section>
  );
}
