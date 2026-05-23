"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { transitions } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";
import { resolveImageSrc } from "@/lib/cloudinary-image";
import type { PortfolioProject } from "@/types/portfolio";

export interface LightboxItem {
  project: PortfolioProject;
  imageIndex: number;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const isOpen = currentIndex !== null;
  const current = currentIndex !== null ? items[currentIndex] : null;

  const goNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!current) return null;

  const images =
    current.project.images.length > 0
      ? current.project.images
      : [{ id: current.project.id, src: current.project.coverImage, alt: current.project.title }];

  const image = images[current.imageIndex] ?? images[0];
  if (!image) return null;
  const src = resolveImageSrc(image.src, image.cloudinaryId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.luxury}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <GrainOverlay intensity="light" className="z-[1]" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-[110] flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:bg-white/10 md:right-8 md:top-8"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <motion.div
            key={`${currentIndex}-${image.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={transitions.cinematic}
            className="relative z-[105] mx-4 flex h-[70vh] w-full max-w-6xl flex-col md:h-[80vh]"
          >
            <div className="relative flex-1 overflow-hidden rounded-sm">
              <Image
                src={src}
                alt={image.alt}
                fill
                sizes="(max-width: 1280px) 90vw, 1200px"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR}
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-6 text-center">
              <p className="font-display text-xl text-white md:text-2xl">
                {current.project.title}
              </p>
              <p className="mt-2 font-sans text-sm text-white/60">
                {current.project.location} · {image.alt}
              </p>
              <p className="mt-1 font-sans text-xs text-gold">
                {(currentIndex ?? 0) + 1} / {items.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
