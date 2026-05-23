export type GallerySpan = "default" | "tall" | "wide";

export interface GalleryCategory {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  alt_text: string | null;
  image_url: string;
  storage_path: string | null;
  category_id: string | null;
  category_slug?: string;
  category_name?: string;
  published: boolean;
  featured: boolean;
  sort_order: number;
  span: GallerySpan;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateGalleryInput {
  title: string;
  category_id: string;
  description?: string;
  alt_text?: string;
  featured?: boolean;
  span?: GallerySpan;
}

export interface UpdateGalleryInput {
  title?: string;
  description?: string | null;
  alt_text?: string | null;
  category_id?: string;
  published?: boolean;
  featured?: boolean;
  sort_order?: number;
  span?: GallerySpan;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  sort_order?: number;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  sort_order?: number;
}
