"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/shared/typography";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";
import { resolveImageSrc } from "@/lib/cloudinary-image";
import type { VideoProject } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface VideoShowcaseProps {
  videos: VideoProject[];
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  return (
    <section className="section-padding border-t border-border" aria-label="Video showcase">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            title="Cinematic Films"
            subtitle="Motion-picture wedding films — emotion, rhythm, and timeless pacing."
          />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {videos.map((video) => (
            <motion.article
              key={video.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-sm"
            >
              <button
                type="button"
                className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={`Play ${video.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={resolveImageSrc(video.thumbnail)}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR}
                    className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        "border border-white/40 bg-white/10 backdrop-blur-md",
                        "transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20",
                      )}
                    >
                      <Play className="h-5 w-5 fill-white text-white" />
                    </span>
                  </div>
                  <span className="absolute right-3 top-3 rounded-sm bg-black/60 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="eyebrow">{video.category}</span>
                  <h3 className="mt-2 font-display text-lg">{video.title}</h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
