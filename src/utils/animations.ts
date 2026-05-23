import { gsap } from "gsap";

/**
 * GSAP animation helpers for cinematic scroll reveals.
 * Use only in client components after mount.
 */
export function fadeInOnScroll(
  element: HTMLElement | string,
  options?: { y?: number; duration?: number; delay?: number },
) {
  const { y = 40, duration = 1, delay = 0 } = options ?? {};

  return gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: undefined,
  });
}

export function parallaxElement(element: HTMLElement, speed = 0.5) {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: undefined,
  });
}

export function killGsapContext(context: gsap.Context) {
  context.revert();
}
