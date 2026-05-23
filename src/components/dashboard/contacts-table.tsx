"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateContactStatus } from "@/services/contact-service";
import type { ContactInquiry, ContactStatus } from "@/types/contact";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: ContactStatus[] = ["new", "read", "replied", "archived"];

export function ContactsTable() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/contacts");
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id: string, status: ContactStatus) => {
    const result = await updateContactStatus(id, status);
    if (!result.success) {
      toast.error(result.error ?? "Update failed");
      return;
    }
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    toast.success("Status updated");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No contact inquiries yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full min-w-[640px] text-left font-sans text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-xs uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider">Message</th>
            <th className="px-4 py-3 text-xs uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b border-border/50">
              <td className="px-4 py-3 text-muted-foreground">
                {format(new Date(c.created_at), "dd MMM yyyy")}
              </td>
              <td className="px-4 py-3 font-medium">{c.full_name}</td>
              <td className="px-4 py-3">
                <a href={`mailto:${c.email}`} className="link-luxury">
                  {c.email}
                </a>
              </td>
              <td className="max-w-xs truncate px-4 py-3" title={c.message}>
                {c.subject ? `${c.subject}: ` : ""}
                {c.message}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {STATUS_OPTIONS.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={c.status === s ? "luxury" : "ghost"}
                      className={cn("h-7 text-[10px] capitalize")}
                      onClick={() => handleStatus(c.id, s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
