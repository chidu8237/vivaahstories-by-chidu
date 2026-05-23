import { FadeIn } from "@/components/animations/fade-in";
import { PageHeader } from "@/components/shared/page-header";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Meet Chidu — the artist behind VivaahStories premium cinematic wedding photography.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The Artist Behind the Lens"
        description="Crafting timeless wedding narratives through cinematic black & white storytelling."
      />
      <section className="section-padding pt-0">
        <div className="container-editorial max-w-narrow">
          <FadeIn>
            <div className="aspect-editorial mb-12 rounded-sm bg-muted" aria-hidden />
            <div className="max-w-none space-y-6 font-body text-muted-foreground">
              <p className="text-lg leading-relaxed text-foreground">
                VivaahStories.ByChidu was born from a passion for preserving the raw emotion,
                grandeur, and intimacy of Indian weddings through a cinematic lens.
              </p>
              <p>
                Every frame is composed with editorial precision — balancing light, shadow, and
                movement to create photographs that feel like stills from a timeless film.
              </p>
              <p>
                From intimate ceremonies to grand celebrations, we document your story with
                artistry, discretion, and an unwavering commitment to excellence.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
