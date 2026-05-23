"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from "@/data/portfolio-data";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { IMAGE_BLUR } from "@/constants/home";
import { cn } from "@/lib/utils";

const CATEGORIES = PORTFOLIO_CATEGORIES.filter((c) => c.slug !== "all");

export function PortfolioManager() {
  const [projects, setProjects] = useState(PORTFOLIO_PROJECTS);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]?.slug ?? "wedding");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const toggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
    toast.success("Featured status updated (local — sync to Supabase when connected)");
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project removed (local draft)");
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast.error("Enter a project title");
      return;
    }
    toast.success("Draft saved — connect Supabase to persist");
    setTitle("");
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-sm px-4 py-2 font-sans text-xs uppercase tracking-wider transition-colors",
            activeCategory === "all"
              ? "bg-foreground text-background"
              : "border border-border hover:bg-muted",
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActiveCategory(cat.slug)}
            className={cn(
              "rounded-sm px-4 py-2 font-sans text-xs uppercase tracking-wider transition-colors",
              activeCategory === cat.slug
                ? "bg-foreground text-background"
                : "border border-border hover:bg-muted",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-sm border border-border p-6 lg:col-span-1">
          <h3 className="font-display text-lg">New Project</h3>
          <div className="space-y-2">
            <Label htmlFor="ptitle">Title</Label>
            <Input
              id="ptitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pcat">Category</Label>
            <select
              id="pcat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-sm border border-input bg-transparent px-4 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <Button variant="luxury" className="w-full" onClick={handleSaveDraft}>
            Save Draft
          </Button>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-4 font-sans text-xs uppercase tracking-wider text-muted-foreground">
            {filtered.length} projects
          </p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2"
          >
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                variants={fadeInUp}
                className="group overflow-hidden rounded-sm border border-border transition-all duration-500 hover:border-gold/25 hover:shadow-luxury-sm"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR}
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                  {project.featured && (
                    <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-gold">
                      <Star className="h-3 w-3 fill-gold" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="eyebrow text-[10px]">{project.categoryLabel}</p>
                  <h4 className="mt-1 font-display text-lg">{project.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.location} · {project.year}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      onClick={() => toggleFeatured(project.id)}
                    >
                      <Star className="h-3 w-3" />
                      {project.featured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 gap-1 text-destructive"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
