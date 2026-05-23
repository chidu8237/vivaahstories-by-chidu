import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link href="/" className={cn("group inline-flex flex-col", className)}>
      <span className="font-display text-lg font-medium tracking-tight transition-opacity group-hover:opacity-80 md:text-xl">
        {siteConfig.shortName}
        <span className="text-muted-foreground">.ByChidu</span>
      </span>
      {showTagline && (
        <span className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
