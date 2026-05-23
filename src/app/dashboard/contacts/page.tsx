import type { Metadata } from "next";
import { ContactsTable } from "@/components/dashboard/contacts-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Contacts | Dashboard",
  robots: { index: false },
};

export default function DashboardContactsPage() {
  return (
    <>
      <DashboardHeader
        title="Contact Inquiries"
        description="Messages from the contact form"
      />
      <ContactsTable />
    </>
  );
}
