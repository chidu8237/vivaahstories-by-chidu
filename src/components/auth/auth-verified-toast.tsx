"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

/** Shows success toast when user lands on homepage after email verification. */
export function AuthVerifiedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("verified") !== "true") return;

    toast.success("Email verified", {
      description: "Welcome to VivaahStories. You're signed in.",
    });

    const url = new URL(window.location.href);
    url.searchParams.delete("verified");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [searchParams, router]);

  return null;
}
