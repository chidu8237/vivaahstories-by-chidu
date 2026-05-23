"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SmoothScroll>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </SmoothScroll>
    </ThemeProvider>
  );
}
