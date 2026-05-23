import type { LucideIcon } from "lucide-react";
import { Camera, Clapperboard, Gem, Heart } from "lucide-react";

export const HOME_SEO_KEYWORDS = [
  "wedding photographer",
  "cinematic wedding photography",
  "luxury wedding films",
  "pre wedding photography",
  "wedding cinematography",
  "VivaahStories",
  "ByChidu",
] as const;

export const BRAND_STATS = [
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Weddings Covered", value: 250, suffix: "+" },
  { label: "Happy Clients", value: 500, suffix: "+" },
] as const;

export interface PortfolioCategory {
  id: string;
  title: string;
  slug: string;
  image: string;
  span: "tall" | "wide" | "default";
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "wedding",
    title: "Wedding",
    slug: "wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    span: "tall",
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding",
    slug: "pre-wedding",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6fc486?w=800&q=80",
    span: "default",
  },
  {
    id: "engagement",
    title: "Engagement",
    slug: "engagement",
    image: "https://images.unsplash.com/photo-1529636798458-92174e2e6cb6?w=800&q=80",
    span: "wide",
  },
  {
    id: "maternity",
    title: "Maternity",
    slug: "maternity",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92a65df7?w=800&q=80",
    span: "default",
  },
  {
    id: "baby-shower",
    title: "Baby Shower",
    slug: "baby-shower",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e17ddd4f?w=800&q=80",
    span: "tall",
  },
  {
    id: "baby-shoot",
    title: "Baby Shoot",
    slug: "baby-shoot",
    image: "https://images.unsplash.com/photo-1519689372905-d894fe9f324b?w=800&q=80",
    span: "default",
  },
];

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    id: "storytelling",
    title: "Storytelling Approach",
    description:
      "Every celebration is a narrative. We compose frames that unfold emotion chapter by chapter.",
    icon: Heart,
  },
  {
    id: "editing",
    title: "Cinematic Editing",
    description:
      "Film-grade color grading and rhythm — your gallery feels like a timeless motion picture.",
    icon: Clapperboard,
  },
  {
    id: "luxury",
    title: "Luxury Experience",
    description:
      "White-glove service from first call to final delivery. Discreet, refined, unforgettable.",
    icon: Gem,
  },
  {
    id: "memories",
    title: "Timeless Memories",
    description:
      "Archival-quality deliverables designed to be treasured for generations.",
    icon: Camera,
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  event: string;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Chidu didn't just photograph our wedding — he immortalized every glance, every tear, every laugh. Pure cinema.",
    name: "Priya & Arjun",
    event: "Destination Wedding",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "2",
    quote:
      "The black and white edits are breathtaking. Our families still get emotional looking through the album.",
    name: "Ananya & Vikram",
    event: "Traditional Wedding",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "3",
    quote:
      "From pre-wedding to reception, the storytelling was seamless. Luxury service, artistic vision.",
    name: "Meera & Rohan",
    event: "Pre-Wedding & Wedding",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export const SOCIAL_GALLERY = [
  {
    id: "s1",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2a72?w=600&q=80",
    alt: "Wedding moment",
  },
  {
    id: "s2",
    image: "https://images.unsplash.com/photo-1465495976277-798e20252483?w=600&q=80",
    alt: "Couple portrait",
  },
  {
    id: "s3",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    alt: "Ceremony detail",
  },
  {
    id: "s4",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    alt: "Reception dance",
  },
  {
    id: "s5",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    alt: "Bridal portrait",
  },
  {
    id: "s6",
    image: "https://images.unsplash.com/photo-1469371670807-b0c929fefffb?w=600&q=80",
    alt: "Ring ceremony",
  },
] as const;

/** Tiny blur placeholder for Next/Image */
export const IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYhEjFBUWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ALdu5d3qN3p0kFu6W6tY4Y1jWOwUcDFFd0v/Z";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606800052052-a08af834be62?w=1920&q=85";
