"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/shared/typography";
import { slideInLeft, slideInRight } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";
import { resolveImageSrc } from "@/lib/cloudinary-image";
import type { CinematicStory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface CinematicStorySectionProps {
  stories: CinematicStory[];
}

export function CinematicStorySection({ stories }: CinematicStorySectionProps) {
  return (
    <section className="section-padding border-t border-border bg-muted/20" aria-label="Cinematic stories">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            title="The Art of Storytelling"
            subtitle="Philosophy, aesthetic, and promise — the pillars behind every frame we create."
          />
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {stories.map((story, index) => {
            const imageFirst = story.imagePosition === "left";
            return (
              <div
                key={story.id}
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-20",
                  !imageFirst && "lg:[&>div:first-child]:order-2",
                )}
              >
                <Reveal variants={imageFirst ? slideInLeft : slideInRight}>
                  <div className="relative aspect-editorial overflow-hidden rounded-sm">
                    <Image
                      src={resolveImageSrc(story.image)}
                      alt={story.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR}
                      className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                    />
                  </div>
                </Reveal>

                <Reveal variants={imageFirst ? slideInRight : slideInLeft}>
                  <span className="eyebrow text-gold">{story.subtitle}</span>
                  <h3 className="mt-4 font-display text-display-md">{story.title}</h3>
                  <p className="mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                    {story.body}
                  </p>
                  <span className="mt-8 inline-block font-sans text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                  </span>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
