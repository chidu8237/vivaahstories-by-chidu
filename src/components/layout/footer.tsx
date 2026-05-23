import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { footerNavItems } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { label: "YouTube", href: siteConfig.links.youtube, icon: Youtube },
  { label: "Email", href: siteConfig.links.email, icon: Mail },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-cinematic-black text-cinematic-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-editorial section-padding pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo showTagline className="text-cinematic-white [&_span]:text-cinematic-gray" />
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-cinematic-gray">
              {siteConfig.description}
            </p>
            <ul className="mt-8 space-y-3 font-body text-sm text-cinematic-gray">
              <li className="flex items-center gap-3 transition-colors hover:text-gold">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={siteConfig.links.email} className="link-luxury hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.contact.location}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-6 text-gold">Navigation</p>
            <ul className="flex flex-col gap-3">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-luxury font-sans text-sm text-cinematic-gray transition-colors hover:text-cinematic-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-6 text-gold">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-sm",
                    "border border-white/10 bg-white/5 transition-all duration-500",
                    "hover:border-gold/50 hover:bg-gold/10 hover:text-gold",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="mt-8 font-display text-2xl italic text-cinematic-white/90">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <Separator className="my-12 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-sans text-xs text-cinematic-gray">
            © {year} {siteConfig.name}. Crafted with cinematic precision.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-cinematic-gray">
            Luxury Wedding Photography
          </p>
        </div>
      </div>
    </footer>
  );
}
