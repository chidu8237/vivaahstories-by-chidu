"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { fadeInUp } from "@/constants/animations";

const settingsSchema = z.object({
  businessName: z.string().min(2),
  tagline: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string().min(2),
  instagram: z.union([z.string().url(), z.literal("")]).optional(),
  youtube: z.union([z.string().url(), z.literal("")]).optional(),
  whatsapp: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

export function SettingsPanel() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      businessName: siteConfig.name,
      tagline: siteConfig.tagline,
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      location: siteConfig.contact.location,
      instagram: siteConfig.links.instagram,
      youtube: siteConfig.links.youtube,
      whatsapp: siteConfig.links.whatsapp,
      metaTitle: siteConfig.name,
      metaDescription: siteConfig.description,
    },
  });

  const onSubmit = async (_data: SettingsValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved", {
      description: "Connect Supabase site_settings table to persist changes.",
    });
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-10"
    >
      <section className="space-y-4 rounded-sm border border-border p-6">
        <h3 className="font-display text-lg">Business Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" {...register("businessName")} />
            {errors.businessName && (
              <p className="text-sm text-destructive">{errors.businessName.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" {...register("tagline")} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border p-6">
        <h3 className="font-display text-lg">Contact Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border p-6">
        <h3 className="font-display text-lg">Social Media</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input id="instagram" {...register("instagram")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input id="youtube" {...register("youtube")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="whatsapp">WhatsApp Link</Label>
            <Input id="whatsapp" {...register("whatsapp")} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-muted/20 p-6">
        <h3 className="font-display text-lg">SEO Settings</h3>
        <p className="text-sm text-muted-foreground">
          Placeholder — wire to site config or CMS when ready.
        </p>
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input id="metaTitle" {...register("metaTitle")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea id="metaDescription" rows={3} {...register("metaDescription")} />
        </div>
      </section>

      <Button type="submit" variant="luxury" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Saving...
          </>
        ) : (
          "Save Settings"
        )}
      </Button>
    </motion.form>
  );
}
