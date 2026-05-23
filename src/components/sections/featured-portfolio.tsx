import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { getFeaturedPortfolio } from "@/services/portfolio.service";

export async function FeaturedPortfolio() {
  const items = await getFeaturedPortfolio();

  return (
    <section className="section-padding">
      <div className="container-editorial">
        <FadeIn className="mb-16 text-center">
          <p className="eyebrow mb-4">Selected Works</p>
          <h2 className="section-title">Stories in Frames</h2>
          <p className="section-subtitle mx-auto">
            A curated glimpse into timeless celebrations captured with cinematic precision.
          </p>
        </FadeIn>

        <PortfolioGrid items={items} />

        <FadeIn className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="link-luxury font-sans text-sm uppercase tracking-widest"
          >
            View Full Portfolio
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
