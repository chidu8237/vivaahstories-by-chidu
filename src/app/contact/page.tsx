import { FadeIn } from "@/components/animations/fade-in";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/features/contact/contact-form";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig, getWhatsAppUrl } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Get in touch with VivaahStories.ByChidu for wedding photography inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Connect"
        description="Share your vision — we'd love to hear about your celebration."
      />
      <section className="section-padding pt-0">
        <div className="container-editorial">
          <FadeIn>
            <div className="mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
              <p className="font-sans text-sm text-muted-foreground">
                <a href={siteConfig.links.email} className="link-luxury text-foreground">
                  {siteConfig.contact.email}
                </a>
                {" · "}
                {siteConfig.contact.phone}
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </Link>
              </Button>
            </div>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
