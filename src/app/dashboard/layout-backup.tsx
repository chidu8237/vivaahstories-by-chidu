import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { getDashboardUser } from "@/lib/dashboard-auth";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userName } = await getDashboardUser();

  return <DashboardLayout userName={userName}>{children}</DashboardLayout>;
}
