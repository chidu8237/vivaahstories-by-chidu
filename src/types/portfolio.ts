export type PortfolioCategorySlug =
  | "all"
  | "wedding"
  | "pre-wedding"
  | "engagement"
  | "maternity"
  | "baby-shower"
  | "baby-shoot"
  | "birthday"
  | "traditional"
  | "cinematic";

export interface PortfolioCategory {
  id: string;
  label: string;
  slug: PortfolioCategorySlug;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  cloudinaryId?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategorySlug;
  categoryLabel: string;
  location: string;
  year: string;
  coverImage: string;
  images: PortfolioImage[];
  description: string;
  featured?: boolean;
  span?: "tall" | "wide" | "default";
}

export interface VideoProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  description: string;
}

export interface CinematicStory {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imagePosition: "left" | "right";
}

export type PortfolioFilter = PortfolioCategorySlug;
