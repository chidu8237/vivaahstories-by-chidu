import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps extends ButtonProps {
  href?: string;
  showArrow?: boolean;
  external?: boolean;
}

/**
 * Premium CTA with shine hover — wraps shadcn Button.
 */
export function LuxuryButton({
  href,
  showArrow = false,
  external,
  children,
  className,
  variant = "luxury",
  ...props
}: LuxuryButtonProps) {
  const classes = cn("btn-luxury-shine uppercase tracking-[0.15em]", className);

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    const isExternal = external ?? href.startsWith("http");
    if (isExternal) {
      return (
        <Button variant={variant} className={cn("group", classes)} asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    }
    return (
      <Button variant={variant} className={cn("group", classes)} asChild>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={cn("group", classes)} {...props}>
      {content}
    </Button>
  );
}
