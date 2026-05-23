import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AuthVerifiedToast } from "@/components/auth/auth-verified-toast";
import { HeroSection } from "@/components/sections/home/hero-section";
import { PortfolioPreviewSection } from "@/components/sections/home/portfolio-preview-section";
import { AboutBrandSection } from "@/components/sections/home/about-brand-section";
import { BookingCtaSection } from "@/components/sections/home/booking-cta-section";
import { HOME_SEO_KEYWORDS } from "@/constants/home";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";

const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/home/experience-section").then((m) => ({
      default: m.ExperienceSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/home/testimonials-section").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <SectionSkeleton dark /> },
);

const SocialShowcaseSection = dynamic(
  () =>
    import("@/components/sections/home/social-showcase-section").then((m) => ({
      default: m.SocialShowcaseSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

function SectionSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`section-padding ${dark ? "bg-cinematic-black" : ""}`} aria-hidden>
      <div className="container-editorial space-y-6">
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto h-4 w-96 max-w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Premium Cinematic Wedding Photography",
    description:
      "VivaahStories.ByChidu — luxury cinematic wedding photography & films. Every Picture, A Story. Wedding, pre-wedding, engagement & more.",
    path: "/",
  }),
  keywords: [...HOME_SEO_KEYWORDS, ...siteConfig.keywords],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            image: `${siteConfig.url}${siteConfig.ogImage}`,
            slogan: siteConfig.tagline,
            areaServed: "IN",
            serviceType: [
              "Wedding Photography",
              "Pre-Wedding Photography",
              "Cinematic Wedding Films",
            ],
          }),
        }}
      />
      <Suspense fallback={null}>
        <AuthVerifiedToast />
      </Suspense>
      <HeroSection />
      <PortfolioPreviewSection />
      <AboutBrandSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BookingCtaSection />
      <SocialShowcaseSection />
    </>
  );
}
