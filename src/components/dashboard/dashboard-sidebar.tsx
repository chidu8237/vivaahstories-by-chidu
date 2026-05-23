"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { logoutUser } from "@/services/auth-service";
import { DASHBOARD_NAV } from "@/constants/dashboard";
import { transitions } from "@/constants/animations";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  userName?: string;
}

export function DashboardSidebar({ userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Signed out");
    window.location.href = "/login";
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavLinks = () => (
    <nav className="mt-10 flex flex-col gap-1">
      {DASHBOARD_NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMobileOpen(false)}
          className={cn(
            "group flex items-center gap-3 rounded-sm px-4 py-3 font-sans text-sm transition-all duration-300",
            isActive(href)
              ? "bg-white/10 text-white shadow-glow"
              : "text-white/55 hover:bg-white/5 hover:text-white",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 transition-colors",
              isActive(href) ? "text-gold" : "text-white/40 group-hover:text-white/70",
            )}
            strokeWidth={1.5}
          />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background shadow-luxury-sm lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open dashboard menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-white/10 bg-cinematic-black lg:flex lg:min-h-screen">
        <div className="flex flex-1 flex-col p-6">
          <Logo className="text-white [&_span]:text-white/50" />
          {userName && (
            <p className="mt-6 truncate font-sans text-xs uppercase tracking-wider text-white/45">
              {userName}
            </p>
          )}
          <NavLinks />
          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 rounded-sm px-4 py-3 font-sans text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30">
            Admin Studio
          </p>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.luxury}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={transitions.cinematic}
              className="relative flex h-full w-[min(280px,85vw)] flex-col bg-cinematic-black p-6"
            >
              <button
                type="button"
                className="absolute right-4 top-4 text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-1 flex-col pt-8">
                <Logo className="text-white [&_span]:text-white/50" />
                {userName && (
                  <p className="mt-4 font-sans text-xs uppercase tracking-wider text-white/45">
                    {userName}
                  </p>
                )}
                <NavLinks />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-auto flex items-center gap-3 rounded-sm px-4 py-3 font-sans text-sm text-white/55"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
