/**
 * Central site configuration — single source of truth for SEO, navigation, and branding.
 */
export const siteConfig = {
  name: "VivaahStories.ByChidu",
  shortName: "VivaahStories",
  tagline: "Every Picture, A Story",
  description:
    "Premium cinematic wedding photography by Chidu. Timeless black & white storytelling for your most cherished celebrations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivaahstories.by-chidu.com",
  ogImage: "/og-image.jpg",
  creator: "Chidu",
  keywords: [
    "wedding photographer",
    "cinematic wedding photography",
    "luxury wedding films",
    "pre wedding photography",
    "wedding cinematography",
    "wedding photography",
    "luxury wedding photographer",
    "Indian wedding photography",
    "VivaahStories",
    "ByChidu",
  ],
  contact: {
    phone: "+91 8805942369",
    whatsapp: "+918805942369",
    email: "vivaahstoriesbychidu@gmail.com",
    location: "India · Available Worldwide",
  },
  social: {
    instagramHandle: "@vivaahstories.by_chidu",
    youtubeHandle: "vivaahstoriesbychidu",
  },
  links: {
    instagram: "https://www.instagram.com/vivaahstories.by_chidu",
    youtube: "https://www.youtube.com/@vivaahstoriesbychidu",
    whatsapp: "https://wa.me/918805942369",
    email: "mailto:vivaahstoriesbychidu@gmail.com",
  },
  locale: "en_IN",
} as const;

export type SiteConfig = typeof siteConfig;

/** WhatsApp deep link with optional pre-filled message */
export function getWhatsAppUrl(message?: string): string {
  const base = siteConfig.links.whatsapp;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
