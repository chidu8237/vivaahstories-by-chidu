"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_BLUR } from "@/constants/home";

interface CinematicImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  withGrain?: boolean;
  bwHover?: boolean;
}

/**
 * Optimized image with blur placeholder, lazy load, and optional grain.
 */
export function CinematicImage({
  src,
  alt,
  fill = true,
  width,
  height,
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  withGrain = false,
  bwHover = false,
}: CinematicImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {!loaded && <Skeleton className="absolute inset-0 z-[1]" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        className={cn(
          "object-cover transition-opacity duration-500",
          !loaded && "opacity-0",
          loaded && "opacity-100",
          bwHover && "img-cinematic-bw",
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
      {withGrain && <GrainOverlay />}
    </div>
  );
}
