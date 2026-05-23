"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { DisplayText, Eyebrow } from "@/components/shared/typography";
import { transitions } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";

const HERO_BG =
  "https://images.unsplash.com/photo-1606800052052-a08af834be62?w=1920&q=85";

export function PortfolioHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden md:min-h-[90vh]"
      aria-label="Portfolio hero"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <GrainOverlay intensity="medium" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-editorial relative z-10 pt-28 text-center md:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.luxury, delay: 0.2 }}
        >
          <Eyebrow gold className="mb-6 text-gold">
            Portfolio
          </Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.4 }}
        >
          <DisplayText as="h1" size="xl" className="text-balance text-white">
            Our Stories
          </DisplayText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg"
        >
          Every celebration holds timeless emotions captured through cinematic artistry.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...transitions.slow, delay: 0.9 }}
          className="mx-auto mt-10 h-px w-24 origin-center bg-gold"
        />
      </motion.div>
    </section>
  );
}
