"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeInUp } from "@/constants/animations";
import type { GalleryCategory } from "@/types/gallery";

export function CategoryManager() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/gallery/categories");
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addCategory = async () => {
    if (!name.trim()) {
      toast.error("Enter category name");
      return;
    }
    const res = await fetch("/api/gallery/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        slug: slug.trim() || undefined,
        sort_order: categories.length + 1,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error ?? "Failed to add");
      return;
    }
    toast.success("Category added");
    setName("");
    setSlug("");
    await load();
  };

  const updateCategory = async (id: string, updates: Partial<GalleryCategory>) => {
    const res = await fetch("/api/gallery/categories", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    await load();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category? Images will be uncategorized.")) return;
    const res = await fetch(`/api/gallery/categories?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed — images may still use this category");
      return;
    }
    toast.success("Category deleted");
    await load();
  };

  const reorder = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= categories.length) return;

    const a = categories[index]!;
    const b = categories[target]!;

    await Promise.all([
      updateCategory(a.id, { sort_order: b.sort_order }),
      updateCategory(b.id, { sort_order: a.sort_order }),
    ]);
    toast.success("Order updated");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="rounded-sm border border-border p-6">
        <h3 className="font-display text-lg">Add Category</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Wedding"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-slug">Slug (optional)</Label>
            <Input
              id="cat-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="wedding"
            />
          </div>
          <div className="flex items-end">
            <Button variant="luxury" className="w-full gap-2" onClick={addCategory}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </motion.div>

      <div>
        <h3 className="mb-4 font-display text-lg">Categories ({categories.length})</h3>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li
              key={cat.id}
              className="flex items-center gap-3 rounded-sm border border-border px-4 py-3"
            >
              <span className="w-8 font-sans text-xs text-muted-foreground">{index + 1}</span>
              {editingId === cat.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-xs"
                />
              ) : (
                <div className="flex-1">
                  <p className="font-display">{cat.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{cat.slug}</p>
                </div>
              )}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => reorder(index, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => reorder(index, "down")}
                  disabled={index === categories.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                {editingId === cat.id ? (
                  <Button
                    size="sm"
                    variant="luxury"
                    onClick={() => {
                      updateCategory(cat.id, { name: editName });
                      setEditingId(null);
                      toast.success("Saved");
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1"
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditName(cat.name);
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-destructive"
                  onClick={() => deleteCategory(cat.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
