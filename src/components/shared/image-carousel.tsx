"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

interface CarouselImage {
  id: string;
  alt: string;
  src?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

/**
 * Swiper-based cinematic carousel — use for hero galleries or portfolio previews.
 */
export function ImageCarousel({ images, className }: ImageCarouselProps) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className={cn("aspect-cinematic w-full rounded-sm", className)}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <div className="relative h-full w-full bg-muted">
            {image.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center">
                <span className="font-display text-muted-foreground">{image.alt}</span>
              </div>
            )}
            <div className="overlay-cinematic" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
