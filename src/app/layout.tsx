import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { LayoutShell } from "@/components/layout/layout-shell";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...createPageMetadata(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} min-h-screen antialiased`}>
        <Providers>
          <LayoutShell
            navbar={<Navbar />}
            footer={<Footer />}
          >
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
