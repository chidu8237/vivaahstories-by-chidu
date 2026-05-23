"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Cloud,
  FileImage,
  Loader2,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeInUp } from "@/constants/animations";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types/gallery";

export function UploadManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [galleryRes, catRes] = await Promise.all([
        fetch("/api/gallery?admin=true"),
        fetch("/api/gallery/categories"),
      ]);
      if (galleryRes.ok) setItems(await galleryRes.json());
      if (catRes.ok) {
        const cats = (await catRes.json()) as GalleryCategory[];
        setCategories(cats);
        if (!categoryId && cats[0]) setCategoryId(cats[0].id);
      }
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!categoryId && categories[0]) setCategoryId(categories[0].id);
  }, [categories, categoryId]);

  const uploadFiles = async (fileList: FileList | File[]) => {
    if (!categoryId) {
      toast.error("Select a category first");
      return;
    }

    setUploading(true);
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim() || file.name.replace(/\.[^.]+$/, ""));
      formData.append("category_id", categoryId);

      const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        toast.error(`Upload failed: ${file.name}`, { description: err.error });
      } else {
        toast.success(`${file.name} uploaded`);
      }
    }

    setTitle("");
    setUploading(false);
    await loadData();
  };

  const updateItem = async (id: string, updates: Record<string, unknown>) => {
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error ?? "Update failed");
      return;
    }
    toast.success("Updated");
    await loadData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this image permanently?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Deleted");
    await loadData();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "glass-card relative rounded-sm border-2 border-dashed p-8 md:p-12 text-center transition-all",
          dragging ? "border-gold bg-gold/5" : "border-border",
        )}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 font-display text-xl">Upload to Gallery</h3>
        <p className="mx-auto mt-2 max-w-md font-body text-sm text-muted-foreground">
          Images upload to Supabase Storage. Publish to show on the live portfolio instantly.
        </p>

        <div className="mx-auto mt-6 grid max-w-md gap-4 text-left">
          <div className="space-y-2">
            <Label htmlFor="upload-title">Title (optional)</Label>
            <Input
              id="upload-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upload-cat">Category</Label>
            <select
              id="upload-cat"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex h-11 w-full rounded-sm border border-input bg-transparent px-4 text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative mt-6 inline-block">
          <Button variant="luxury" type="button" disabled={uploading} className="pointer-events-none">
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileImage className="mr-2 h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Browse Files"}
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Cloud className="h-4 w-4" />
          Supabase Storage · Max 10MB per image
        </div>
      </motion.div>

      <div>
        <h4 className="mb-4 font-display text-lg">
          Media Library ({items.length})
        </h4>
        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No uploads yet. Drag images above to get started.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-sm border border-border transition-all hover:border-gold/30"
              >
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={item.image_url}
                    alt={item.alt_text ?? item.title}
                    fill
                    sizes="280px"
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                  <span
                    className={cn(
                      "absolute left-2 top-2 rounded-sm px-2 py-0.5 font-sans text-[10px] uppercase",
                      item.published
                        ? "bg-green-900/80 text-green-100"
                        : "bg-black/70 text-gold",
                    )}
                  >
                    {item.published ? "Live" : "Draft"}
                  </span>
                </div>
                <div className="p-3">
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <Button
                        size="sm"
                        variant="luxury"
                        className="h-8 shrink-0"
                        onClick={() => {
                          updateItem(item.id, { title: editTitle });
                          setEditingId(null);
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <p className="truncate font-display text-sm">{item.title}</p>
                  )}
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {item.category_name ?? "Uncategorized"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {!item.published && (
                      <Button
                        size="sm"
                        variant="luxury"
                        className="h-7 gap-1 text-[10px]"
                        onClick={() => updateItem(item.id, { published: true })}
                      >
                        Publish
                      </Button>
                    )}
                    {item.published && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-[10px]"
                        onClick={() => updateItem(item.id, { published: false })}
                      >
                        Unpublish
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 gap-1 text-[10px]"
                      onClick={() => {
                        setEditingId(item.id);
                        setEditTitle(item.title);
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <select
                      className="h-7 max-w-[90px] rounded-sm border border-border bg-transparent px-1 text-[10px]"
                      value={item.category_id ?? ""}
                      onChange={(e) =>
                        updateItem(item.id, { category_id: e.target.value })
                      }
                      title="Move to category"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 gap-1 text-[10px] text-destructive"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
