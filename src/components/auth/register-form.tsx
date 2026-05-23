"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, resendVerificationEmail } from "@/services/auth-service";
import { cn } from "@/lib/utils";

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[0-9]/, "Include a number");

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email required"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= score ? "bg-gold" : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="font-sans text-xs text-muted-foreground">
        {score < 2 ? "Weak" : score < 4 ? "Good" : "Strong"} password
      </p>
    </div>
  );
}

export function RegisterForm() {
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await registerUser(data);
    if (!result.success) {
      toast.error("Registration failed", { description: result.error });
      return;
    }

    if (result.needsEmailVerification) {
      setPendingEmail(data.email);
      toast.success("Check your email", {
        description:
          "We sent a verification link. Check spam/junk. Use Resend below if needed.",
      });
      return;
    }

    toast.success("Account created", { description: "Welcome to VivaahStories." });
    window.location.href = "/";
  };

  const handleResend = async () => {
    if (!pendingEmail) return;
    setResending(true);
    const result = await resendVerificationEmail(pendingEmail);
    setResending(false);
    if (!result.success) {
      toast.error("Could not resend", { description: result.error });
      return;
    }
    toast.success("Verification email resent", {
      description: "Check your inbox and spam folder.",
    });
  };

  if (pendingEmail) {
    return (
      <div className="text-center">
        <Mail className="mx-auto h-12 w-12 text-gold" />
        <h2 className="mt-4 font-display text-2xl">Verify your email</h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          We sent a confirmation link to <strong>{pendingEmail}</strong>. Click the link to
          activate your account.
        </p>
        <p className="mt-4 font-body text-xs text-muted-foreground">
          Not received? Check spam, or configure custom SMTP in Supabase for production
          delivery.
        </p>
        <Button
          variant="luxury"
          className="mt-6 w-full"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? (
            <>
              <Loader2 className="animate-spin" />
              Sending...
            </>
          ) : (
            "Resend verification email"
          )}
        </Button>
        <p className="mt-6 font-sans text-sm">
          <Link href="/login" className="link-luxury">
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Create Account</h2>
      <p className="mt-2 font-body text-sm text-muted-foreground">
        Register to access your admin dashboard and manage your studio.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" autoComplete="name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
          {password && <PasswordStrength password={password} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" variant="luxury" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="link-luxury text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  );
}
