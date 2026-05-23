import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsPanel } from "@/components/dashboard/settings-panel";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Settings"
        description="Business profile, contact information, social links, and SEO placeholders."
      />
      <SettingsPanel />
    </div>
  );
}
