import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { fetchGalleryCategories } from "@/services/gallery-service.server";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/types/gallery";

export async function GET() {
  const categories = await fetchGalleryCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateCategoryInput;
  const slug =
    body.slug ||
    body.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const { data, error } = await session.supabase
    .from("gallery_categories")
    .insert({
      name: body.name.trim(),
      slug,
      sort_order: body.sort_order ?? 99,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as UpdateCategoryInput & { id: string };
  if (!body.id) {
    return NextResponse.json({ error: "Category id required" }, { status: 400 });
  }

  const { id, ...updates } = body;
  const { data, error } = await session.supabase
    .from("gallery_categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Category id required" }, { status: 400 });
  }

  const { error } = await session.supabase.from("gallery_categories").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
