"use client";

import { useState } from "react";

import Image from "next/image";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import type { PortfolioProject } from "@/types/portfolio";

interface GalleryGridProps {
  projects: PortfolioProject[];
}

export function GalleryGrid({
  projects,
}: GalleryGridProps) {
  const [
    selectedProject,
    setSelectedProject,
  ] = useState<PortfolioProject | null>(
    null,
  );

  const [
    currentImage,
    setCurrentImage,
  ] = useState(0);

  // OPEN
  function openProject(
    project: PortfolioProject,
  ) {
    setSelectedProject(project);

    setCurrentImage(0);
  }

  // CLOSE
  function closeProject() {
    setSelectedProject(null);
  }

  // NEXT
  function nextImage() {
    if (!selectedProject) return;

    setCurrentImage((prev) =>
      prev ===
      selectedProject.images.length -
        1
        ? 0
        : prev + 1,
    );
  }

  // PREVIOUS
  function prevImage() {
    if (!selectedProject) return;

    setCurrentImage((prev) =>
      prev === 0
        ? selectedProject.images.length -
          1
        : prev - 1,
    );
  }

  return (
    <>
      {/* GRID */}
      <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            onClick={() =>
              openProject(project)
            }
            className="group break-inside-avoid cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-sm">
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={1400}
                  height={1800}
                  className="h-auto w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.category}
                </p>

                <h3 className="font-display text-3xl text-white">
                  {project.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
                  View Story

                  <span className="h-px w-10 bg-gold" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CINEMATIC MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* CLOSE */}
            <button
              onClick={closeProject}
              className="absolute right-6 top-6 z-50 text-5xl text-white/80 transition hover:text-white"
            >
              ×
            </button>

            {/* LEFT */}
            <button
              onClick={prevImage}
              className="absolute left-5 top-1/2 z-50 -translate-y-1/2 text-6xl text-white/50 transition hover:text-white"
            >
              ‹
            </button>

            {/* RIGHT */}
            <button
              onClick={nextImage}
              className="absolute right-5 top-1/2 z-50 -translate-y-1/2 text-6xl text-white/50 transition hover:text-white"
            >
              ›
            </button>

            {/* IMAGE */}
            <div className="relative flex h-full items-center justify-center p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="relative"
                >
                  <Image
                    src={
                      selectedProject.images[
                        currentImage
                      ]
                    }
                    alt={
                      selectedProject.title
                    }
                    width={1800}
                    height={2200}
                    className="max-h-[88vh] w-auto rounded-sm object-contain shadow-2xl"
                  />

                  {/* INFO */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-8">
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">
                      {
                        selectedProject.category
                      }
                    </p>

                    <h2 className="font-display text-4xl text-white">
                      {
                        selectedProject.title
                      }
                    </h2>

                    <p className="mt-4 text-sm text-white/50">
                      {currentImage + 1} /{" "}
                      {
                        selectedProject
                          .images.length
                      }
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}