import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import type { UpdateGalleryInput } from "@/types/gallery";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as UpdateGalleryInput;

  const { data, error } = await session.supabase
    .from("galleries")
    .update(body)
    .eq("id", id)
    .select(`*, gallery_categories ( slug, name )`)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const { data: row } = await session.supabase
    .from("galleries")
    .select("storage_path")
    .eq("id", id)
    .single();

  const { error } = await session.supabase.from("galleries").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (row?.storage_path) {
    await session.supabase.storage.from("gallery").remove([row.storage_path as string]);
  }

  return NextResponse.json({ success: true });
}
