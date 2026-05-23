"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/" || pathname === "/portfolio";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent
          ? "border-transparent bg-transparent"
          : "border-b border-border/50 glass-dark",
      )}
    >
      <nav
        className="container-editorial flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        <Logo
          showTagline={false}
          className={cn(transparent && "text-white [&_span]:text-white/60")}
        />

        <ul className="hidden items-center gap-8 md:flex">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "link-luxury font-sans text-sm uppercase tracking-widest",
                  transparent && "text-white/90 after:bg-white hover:text-white",
                  pathname === item.href && "after:w-full",
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="luxury"
            size="sm"
            className={cn(
              "hidden md:inline-flex",
              transparent && "border-white/40 text-white hover:bg-white hover:text-black",
            )}
            asChild
          >
            <Link href="/booking">Book Now</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn(transparent && "text-white hover:bg-white/10")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-12 flex flex-col gap-6">
                {mainNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-display text-2xl transition-opacity hover:opacity-70",
                        pathname === item.href && "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button variant="luxury" className="mt-10 w-full" asChild>
                <Link href="/booking" onClick={() => setOpen(false)}>
                  Book Your Story
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
