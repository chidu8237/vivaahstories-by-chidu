import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { createPageMetadata } from "@/lib/metadata";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = createPageMetadata({
  title: "Sign In",
  description: "Sign in to VivaahStories admin dashboard",
  path: "/login",
  noIndex: true,
});

function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Every Picture, A Story"
      subtitle="Sign in to manage bookings, portfolio, and your cinematic wedding brand."
    >
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
