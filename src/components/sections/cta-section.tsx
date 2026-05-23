import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-editorial text-center">
        <FadeIn>
          <p className="eyebrow mb-4">Your Story Awaits</p>
          <h2 className="section-title text-balance">Let&apos;s Create Something Timeless</h2>
          <p className="section-subtitle mx-auto">
            Reserve your date and experience wedding photography crafted with cinematic artistry.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="luxury" size="lg" asChild>
              <Link href="/booking">Start Booking</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
