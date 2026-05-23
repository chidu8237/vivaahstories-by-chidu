"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
}

export function DashboardLayout({ children, userName }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userName={userName} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          <div className="px-4 py-6 pl-14 pr-4 sm:px-6 lg:pl-8 lg:pr-10 lg:py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
