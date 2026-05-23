"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { fadeInUp, revealViewport } from "@/constants/animations";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

/** Scroll-triggered reveal — single source for section entrances */
export function Reveal({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
