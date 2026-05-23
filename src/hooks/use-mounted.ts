"use client";

import { useEffect, useState } from "react";

/** Prevents hydration mismatches for client-only UI (theme toggle, animations). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
