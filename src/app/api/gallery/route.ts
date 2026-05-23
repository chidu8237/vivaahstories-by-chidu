import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import {
  fetchAllGalleriesAdmin,
  fetchPublishedGalleries,
} from "@/services/gallery-service.server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";

  if (admin) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const items = await fetchAllGalleriesAdmin();
    return NextResponse.json(items);
  }

  const items = await fetchPublishedGalleries();
  return NextResponse.json(items);
}
