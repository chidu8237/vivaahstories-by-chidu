"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { transitions } from "@/constants/animations";
import { siteConfig } from "@/config/site";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-cinematic-black p-12 lg:flex">
        <Logo className="text-white [&_span]:text-white/50" showTagline />
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.cinematic}
            className="font-display text-4xl text-white xl:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.cinematic, delay: 0.15 }}
            className="mt-6 max-w-md font-body text-lg text-white/60"
          >
            {subtitle}
          </motion.p>
          <div className="accent-gold-line mt-10" />
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
          {siteConfig.tagline}
        </p>
      </div>

      <div className="relative flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background lg:hidden" />
        <GrainOverlay intensity="light" className="lg:hidden" />

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <Logo showTagline />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.cinematic}
          >
            {children}
          </motion.div>
          <p className="mt-8 text-center font-sans text-sm text-muted-foreground">
            <Link href="/" className="link-luxury">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
