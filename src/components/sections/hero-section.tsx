"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transitions } from "@/constants/animations";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Cinematic background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_70%)]" aria-hidden />

      <div className="container-editorial relative z-10 pt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.luxury, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          Premium Cinematic Wedding Photography
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.35 }}
          className="font-display text-display-xl text-balance"
        >
          {siteConfig.shortName}
          <span className="block text-muted-foreground">.ByChidu</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.5 }}
          className="mx-auto mt-6 max-w-lg font-display text-xl italic text-muted-foreground md:text-2xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.cinematic, delay: 0.65 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="luxury" size="lg" asChild>
            <Link href="/portfolio">
              View Portfolio
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/booking">Book Your Date</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
}
