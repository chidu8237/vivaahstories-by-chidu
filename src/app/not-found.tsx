import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-display-md">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button variant="luxury" className="mt-8" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
