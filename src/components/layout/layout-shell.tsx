"use client";

import { usePathname } from "next/navigation";

const MINIMAL_CHROME_ROUTES = ["/login", "/register", "/dashboard"];

interface LayoutShellProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

export function LayoutShell({ children, navbar, footer }: LayoutShellProps) {
  const pathname = usePathname();
  const hideChrome = MINIMAL_CHROME_ROUTES.some((route) => pathname.startsWith(route));

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
    </>
  );
}
