/**
 * CSS transition presets for non-Framer animations.
 */
export const cssTransitions = {
  cinematic: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
  luxury: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  fast: "all 0.2s ease",
  colors: "color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
  transform: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  opacity: "opacity 0.4s ease",
} as const;

export type CssTransition = keyof typeof cssTransitions;
