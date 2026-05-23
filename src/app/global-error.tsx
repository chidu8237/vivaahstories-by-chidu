"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <h1 className="font-serif text-3xl">Critical Error</h1>
        <p className="mt-4 max-w-md text-neutral-400">
          Something went seriously wrong. Please refresh the page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-white px-6 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
