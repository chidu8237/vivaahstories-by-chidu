import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Image,
  LayoutDashboard,
  Mail,
  Settings,
  Upload,
} from "lucide-react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Analytics & quick actions",
  },
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: Calendar,
    description: "Client inquiries & events",
  },
  {
    href: "/dashboard/portfolio",
    label: "Categories",
    icon: Image,
    description: "Gallery categories",
  },
  {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: Mail,
    description: "Inquiries & messages",
  },
  {
    href: "/dashboard/uploads",
    label: "Uploads",
    icon: Upload,
    description: "Media library",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    description: "Business & SEO",
  },
];
