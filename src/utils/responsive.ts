/**
 * Breakpoint values aligned with Tailwind defaults.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function isAbove(breakpoint: Breakpoint, width: number): boolean {
  return width >= breakpoints[breakpoint];
}

export function isBelow(breakpoint: Breakpoint, width: number): boolean {
  return width < breakpoints[breakpoint];
}

/** Container max-widths for editorial layouts */
export const containerWidths = {
  narrow: "48rem",
  content: "72rem",
  wide: "90rem",
  full: "100%",
} as const;
