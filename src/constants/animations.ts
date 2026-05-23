import type { Transition, Variants } from "framer-motion";

/** Shared Framer Motion transition presets */
export const transitions = {
  cinematic: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
  luxury: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 120, damping: 20 } satisfies Transition,
  slow: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
} as const;

/** Reusable animation variants */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.luxury,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.cinematic,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: transitions.cinematic },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: transitions.cinematic },
};

/** Default viewport config for scroll reveals */
export const revealViewport = { once: true, margin: "-80px" as const };

export const lineExpand: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { ...transitions.slow, delay: 0.3 } },
};
