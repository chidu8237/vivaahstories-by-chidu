"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-editorial flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">Something went wrong</p>
      <h1 className="font-display text-display-md">We&apos;ll be right back</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or contact us if the issue persists.
      </p>
      <Button variant="luxury" className="mt-8" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
