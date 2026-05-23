import "server-only";

import { v2 as cloudinary } from "cloudinary";
import { isCloudinaryConfigured } from "@/config/env";

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    return null;
  }

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
}
