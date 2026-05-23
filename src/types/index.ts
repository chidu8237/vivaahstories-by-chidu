export type { NavItem } from "./navigation";
export type {
  PortfolioCategory,
  PortfolioCategorySlug,
  PortfolioImage,
  PortfolioProject,
  VideoProject,
  CinematicStory,
  PortfolioFilter,
} from "./portfolio";

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  description?: string;
  featured?: boolean;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  location: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
