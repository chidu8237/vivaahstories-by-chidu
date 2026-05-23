import "server-only";
import { createServerClient } from "@/lib/supabase/server";
import type { GalleryCategory, GalleryItem } from "@/types/gallery";
import type { PortfolioCategorySlug, PortfolioProject } from "@/types/portfolio";

function mapGalleryRow(row: Record<string, unknown>): GalleryItem {
  const cat = row.gallery_categories as Record<string, unknown> | null;
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) ?? null,
    alt_text: (row.alt_text as string) ?? null,
    image_url: row.image_url as string,
    storage_path: (row.storage_path as string) ?? null,
    category_id: (row.category_id as string) ?? null,
    category_slug: cat?.slug as string | undefined,
    category_name: cat?.name as string | undefined,
    published: row.published as boolean,
    featured: row.featured as boolean,
    sort_order: row.sort_order as number,
    span: (row.span as GalleryItem["span"]) ?? "default",
    uploaded_by: (row.uploaded_by as string) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

const GALLERY_SELECT = `
  *,
  gallery_categories ( slug, name )
`;

export async function fetchPublishedGalleries(): Promise<GalleryItem[]> {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("galleries")
    .select(GALLERY_SELECT)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => mapGalleryRow(row as Record<string, unknown>));
}

export async function fetchAllGalleriesAdmin(): Promise<GalleryItem[]> {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("galleries")
    .select(GALLERY_SELECT)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => mapGalleryRow(row as Record<string, unknown>));
}

export async function fetchGalleryCategories(): Promise<GalleryCategory[]> {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("gallery_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as GalleryCategory[];
}

/** Convert DB galleries to portfolio projects for the public gallery UI */
export function galleriesToPortfolioProjects(items: GalleryItem[]): PortfolioProject[] {
  const byCategory = new Map<string, GalleryItem[]>();

  for (const item of items) {
    const slug = item.category_slug ?? "wedding";
    const list = byCategory.get(slug) ?? [];
    list.push(item);
    byCategory.set(slug, list);
  }

  const projects: PortfolioProject[] = [];

  for (const [slug, galleryItems] of byCategory) {
    galleryItems.forEach((item, index) => {
      const catSlug = slug as PortfolioCategorySlug;
      projects.push({
        id: item.id,
        slug: item.id,
        title: item.title,
        category: catSlug === "all" ? "wedding" : catSlug,
        categoryLabel: item.category_name ?? slug,
        location: "VivaahStories",
        year: new Date(item.created_at).getFullYear().toString(),
        coverImage: item.image_url,
        description: item.description ?? "",
        featured: item.featured,
        span: item.span,
        images: [
          {
            id: `${item.id}-0`,
            src: item.image_url,
            alt: item.alt_text ?? item.title,
          },
        ],
      });
      void index;
    });
  }

  return projects;
}

export async function getGalleryStats() {
  const supabase = await createServerClient();
  if (!supabase) {
    return { total: 0, published: 0, draft: 0 };
  }

  const { count: total } = await supabase
    .from("galleries")
    .select("*", { count: "exact", head: true });

  const { count: published } = await supabase
    .from("galleries")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  return {
    total: total ?? 0,
    published: published ?? 0,
    draft: (total ?? 0) - (published ?? 0),
  };
}
