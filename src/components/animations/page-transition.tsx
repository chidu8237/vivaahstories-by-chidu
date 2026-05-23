"use client";

import { motion } from "framer-motion";
import { transitions } from "@/constants/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitions.luxury}
    >
      {children}
    </motion.div>
  );
}
