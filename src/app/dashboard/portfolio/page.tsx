import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CategoryManager } from "@/components/dashboard/category-manager";

export default function DashboardPortfolioPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Gallery Categories"
        description="Add, edit, delete, and reorder portfolio categories."
      />
      <CategoryManager />
    </div>
  );
}
