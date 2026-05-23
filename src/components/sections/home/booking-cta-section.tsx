"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { DisplayText, Eyebrow } from "@/components/shared/typography";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { transitions } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";

const CTA_BG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7) % 80}%`,
  top: `${15 + (i * 11) % 70}%`,
  delay: `${i * 0.5}s`,
  size: 4 + (i % 3) * 2,
}));

export function BookingCtaSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden" aria-label="Booking call to action">
      <div className="absolute inset-0">
        <Image
          src={CTA_BG}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <GrainOverlay intensity="light" />
      </div>

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
          aria-hidden
        />
      ))}

      <div className="container-editorial relative z-10 flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <Eyebrow gold className="mb-6 text-gold">
            Begin Your Journey
          </Eyebrow>
          <DisplayText as="h2" size="lg" className="max-w-3xl text-balance text-white">
            Let&apos;s Create Your Timeless Story
          </DisplayText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={transitions.luxury}
            className="mx-auto mt-6 max-w-xl font-body text-lg text-white/75"
          >
            Your celebration deserves to be remembered as a masterpiece. Reserve your date
            and let us craft cinema from every moment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitions.cinematic, delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <LuxuryButton href="/booking" size="lg" showArrow>
              Book Your Date
            </LuxuryButton>
            <LuxuryButton
              href="/portfolio"
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-black"
            >
              View Portfolio
            </LuxuryButton>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
