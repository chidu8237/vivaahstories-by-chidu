import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "No file uploaded",
        },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;

    const {
      error,
    } = await supabase.storage
      .from("gallery")
      .upload(
        fileName,
        file,
        {
          cacheControl:
            "3600",
          upsert: false,
        }
      );

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message,
        },
        { status: 500 }
      );
    }

    const {
      data,
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(
        fileName
      );

    return NextResponse.json({
      url: data.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Upload failed",
      },
      { status: 500 }
    );
  }
}