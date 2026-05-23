import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { fetchContacts } from "@/services/contact-service.server";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contacts = await fetchContacts();
  return NextResponse.json(contacts);
}
