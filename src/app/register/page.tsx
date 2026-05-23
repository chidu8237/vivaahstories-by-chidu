import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Register",
  description: "Create your VivaahStories dashboard account",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Join the Studio"
      subtitle="Create an account to access the admin dashboard and manage your photography business."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
