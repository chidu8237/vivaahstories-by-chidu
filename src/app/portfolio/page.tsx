import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { createPageMetadata } from "@/lib/metadata";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchGalleryCategories,
  fetchPublishedGalleries,
  galleriesToPortfolioProjects,
} from "@/services/gallery-service.server";
import type { PortfolioCategory, PortfolioCategorySlug } from "@/types/portfolio";

const PortfolioPageClient = dynamic(
  () =>
    import("@/components/portfolio/portfolio-page-client").then((m) => ({
      default: m.PortfolioPageClient,
    })),
  {
    loading: () => <PortfolioPageSkeleton />,
  },
);

function PortfolioPageSkeleton() {
  return (
    <div aria-hidden>
      <Skeleton className="min-h-[85vh] w-full rounded-none" />
      <div className="container-editorial section-padding space-y-6">
        <Skeleton className="mx-auto h-10 w-96 max-w-full" />
        <div className="columns-2 gap-4 lg:columns-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="mb-4 aspect-[4/5] w-full break-inside-avoid" />
          ))}
        </div>
      </div>
    </div>
  );
}

function buildPortfolioCategories(
  dbCategories: Awaited<ReturnType<typeof fetchGalleryCategories>>,
): PortfolioCategory[] {
  const items: PortfolioCategory[] = [
    { id: "all", label: "All", slug: "all" },
    ...dbCategories.map((c) => ({
      id: c.id,
      label: c.name,
      slug: c.slug as PortfolioCategorySlug,
    })),
  ];
  return items;
}

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Portfolio — Cinematic Wedding Stories",
    description:
      "Explore VivaahStories.ByChidu portfolio: wedding, pre-wedding, engagement, maternity, baby shower & more. Luxury cinematic black & white artistry.",
    path: "/portfolio",
  }),
  keywords: [
    "wedding photographer portfolio",
    "cinematic wedding photography",
    "luxury wedding films",
    "pre wedding photography",
    "wedding cinematography",
  ],
};

export default async function PortfolioPage() {
  const [galleries, dbCategories] = await Promise.all([
    fetchPublishedGalleries(),
    fetchGalleryCategories(),
  ]);

  const dynamicProjects =
    galleries.length > 0 ? galleriesToPortfolioProjects(galleries) : undefined;
  const dynamicCategories =
    dbCategories.length > 0 ? buildPortfolioCategories(dbCategories) : undefined;

  return (
    <PortfolioPageClient
      dynamicProjects={dynamicProjects}
      dynamicCategories={dynamicCategories}
    />
  );
}
