import {
  FEATURED_PROJECTS,
  PORTFOLIO_PROJECTS,
  getProjectsByCategory,
} from "@/data/portfolio-data";
import type { PortfolioItem } from "@/types";

/** Maps portfolio projects to legacy PortfolioItem shape for homepage */
function toPortfolioItem(
  project: (typeof PORTFOLIO_PROJECTS)[0],
): PortfolioItem {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: project.categoryLabel,
    coverImage: project.coverImage,
    description: project.description,
    featured: project.featured,
  };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  return PORTFOLIO_PROJECTS.map(toPortfolioItem);
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  return FEATURED_PROJECTS.map(toPortfolioItem);
}

export { getProjectsByCategory, PORTFOLIO_PROJECTS, FEATURED_PROJECTS };
