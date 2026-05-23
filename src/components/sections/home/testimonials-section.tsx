"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/shared/typography";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { TESTIMONIALS, IMAGE_BLUR } from "@/constants/home";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export function TestimonialsSection() {
  return (
    <SectionWrapper dark bordered ariaLabel="Client testimonials">
      <Reveal>
        <SectionHeading
          title="Words From the Heart"
          subtitle="Stories shared by couples who trusted us with their most precious day."
        />
      </Reveal>

      <Reveal delay={0.2}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={900}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="testimonial-swiper max-w-4xl mx-auto pb-14"
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.id}>
              <blockquote className="flex flex-col items-center text-center">
                <div className="relative mb-8 h-20 w-20 overflow-hidden rounded-full border-2 border-gold/40">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR}
                    className="object-cover"
                  />
                </div>
                <p className="font-display text-xl italic leading-relaxed text-cinematic-white md:text-2xl lg:text-3xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <cite className="not-italic">
                    <span className="font-sans text-sm font-medium uppercase tracking-widest text-cinematic-white">
                      {item.name}
                    </span>
                    <span className="mt-1 block font-body text-sm text-gold">{item.event}</span>
                  </cite>
                </footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </SectionWrapper>
  );
}
