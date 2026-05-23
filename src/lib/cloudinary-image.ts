import { isCloudinaryConfigured } from "@/config/env";

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: "auto" | "webp" | "avif" | "jpg";
  crop?: "fill" | "fit" | "scale" | "thumb";
  gravity?: "auto" | "face" | "center";
  effect?: string;
  blur?: number;
}

const DEFAULT_TRANSFORMS: CloudinaryTransformOptions = {
  quality: "auto",
  format: "auto",
  crop: "fill",
  gravity: "auto",
};

function buildTransformString(options: CloudinaryTransformOptions): string {
  const opts = { ...DEFAULT_TRANSFORMS, ...options };
  const parts: string[] = [];

  if (opts.quality) parts.push(`q_${opts.quality}`);
  if (opts.format) parts.push(`f_${opts.format}`);
  if (opts.width) parts.push(`w_${opts.width}`);
  if (opts.height) parts.push(`h_${opts.height}`);
  if (opts.crop) parts.push(`c_${opts.crop}`);
  if (opts.gravity) parts.push(`g_${opts.gravity}`);
  if (opts.effect) parts.push(`e_${opts.effect}`);
  if (opts.blur) parts.push(`e_blur:${opts.blur}`);

  return parts.join(",");
}

/** Build optimized delivery URL — safe for client components */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: CloudinaryTransformOptions,
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return publicId;

  const transforms = buildTransformString(options ?? {});
  const path = transforms ? `${transforms}/` : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}${publicId}`;
}

export function buildCloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number; quality?: string },
) {
  return getCloudinaryImageUrl(publicId, options);
}

export function getCloudinarySrcSet(
  publicId: string,
  widths: number[] = [640, 768, 1024, 1280, 1920],
): string {
  return widths
    .map((w) => `${getCloudinaryImageUrl(publicId, { width: w })} ${w}w`)
    .join(", ");
}

export function getCloudinaryPlaceholder(publicId: string): string {
  return getCloudinaryImageUrl(publicId, {
    width: 40,
    quality: 30,
    blur: 200,
    format: "auto",
  });
}

export function resolveImageSrc(src: string, cloudinaryId?: string): string {
  if (cloudinaryId && isCloudinaryConfigured()) {
    return getCloudinaryImageUrl(cloudinaryId, { width: 1200, quality: "auto" });
  }
  return src;
}

export function getCloudinaryVideoThumbnail(
  videoPublicId: string,
  options?: { width?: number; height?: number },
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return videoPublicId;

  const { width = 1280, height = 720 } = options ?? {};
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,w_${width},h_${height},c_fill,q_auto/${videoPublicId}.jpg`;
}
