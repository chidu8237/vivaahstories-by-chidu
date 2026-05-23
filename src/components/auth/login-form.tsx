"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth-service";
import { getSafeRedirectPath } from "@/lib/auth-redirect";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const ERROR_MESSAGES: Record<string, string> = {
  exchange_failed: "Email verification failed. Please try signing in or register again.",
  missing_code: "Invalid verification link. Request a new confirmation email.",
  config: "Authentication is not configured correctly.",
  access_denied: "Sign-in was cancelled.",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = getSafeRedirectPath(searchParams.get("redirect"), "/dashboard");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    if (error) {
      toast.error("Authentication error", {
        description: message ?? ERROR_MESSAGES[error] ?? "Please try again.",
      });
    }
    if (searchParams.get("verified") === "true") {
      toast.success("Email verified", {
        description: "Your account is confirmed. You can sign in now.",
      });
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormValues) => {
    const result = await loginUser(data);
    if (!result.success) {
      toast.error("Login failed", { description: result.error });
      return;
    }
    toast.success("Welcome back");
    window.location.href = redirect;
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Sign In</h2>
      <p className="mt-2 font-body text-sm text-muted-foreground">
        Access your admin dashboard
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/contact"
              className="font-sans text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <label className="flex items-center gap-2 font-sans text-sm">
          <input
            type="checkbox"
            className="rounded border-border"
            {...register("rememberMe")}
          />
          Remember me
        </label>

        <Button type="submit" variant="luxury" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/register" className="link-luxury text-foreground">
          Register
        </Link>
      </p>
    </div>
  );
}
