import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { BookingForm } from "@/components/booking/booking-form";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Booking",
  description: "Reserve your wedding photography date with VivaahStories.ByChidu.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Reserve Your Date"
        description="Submit your inquiry and we'll confirm availability for your celebration."
      />
      <section className="section-padding pt-0">
        <div className="container-editorial">
          <FadeIn>
            <BookingForm />
          </FadeIn>
          <div className="mt-12 rounded-sm border border-border bg-muted/20 p-8 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Prefer WhatsApp? Message us directly for faster responses.
            </p>
            <Button variant="luxury" className="mt-4" asChild>
              <Link
                href={getWhatsAppUrl(
                  `Hi VivaahStories! I'd like to inquire about wedding photography.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp · {siteConfig.contact.phone}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
