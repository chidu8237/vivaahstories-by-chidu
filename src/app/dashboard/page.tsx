"use client";

import { useEffect, useState } from "react";

type GalleryImage = {
  id: number;
  title: string;
  category: string;
  images: string[];
  published: boolean;
};

export default function DashboardPage() {
  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>([]);

  const [websiteTitle, setWebsiteTitle] =
    useState("VivaahStories.ByChidu");

  const [tagline, setTagline] =
    useState("Every Picture, A Story");

  const [phone, setPhone] =
    useState("8805942369");

  const [email, setEmail] =
    useState(
      "vivaahstoriesbychidu@gmail.com",
    );

  const [instagram, setInstagram] =
    useState(
      "@vivaahstories.by_chidu",
    );

  // LOAD DATA
  useEffect(() => {
    const savedGallery =
      localStorage.getItem(
        "galleryImages",
      );

    const savedSettings =
      localStorage.getItem(
        "websiteSettings",
      );

    if (savedGallery) {
      const parsed =
        JSON.parse(savedGallery);

      const fixedData =
        parsed.map((img: any) => ({
          ...img,

          images:
            img.images?.length > 0
              ? img.images
              : img.image
              ? [img.image]
              : [],
        }));

      setGalleryImages(fixedData);
    } else {
      setGalleryImages([
        {
          id: 1,
          title: "Wedding Shoot",
          category: "Wedding",
          images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552",
          ],
          published: true,
        },

        {
          id: 2,
          title: "Pre Wedding",
          category: "Pre Wedding",
          images: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
          ],
          published: true,
        },

        {
          id: 3,
          title: "Engagement",
          category: "Engagement",
          images: [
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
          ],
          published: false,
        },
      ]);
    }

    if (savedSettings) {
      const settings =
        JSON.parse(savedSettings);

      setWebsiteTitle(
        settings.websiteTitle,
      );

      setTagline(
        settings.tagline,
      );

      setPhone(settings.phone);

      setEmail(settings.email);

      setInstagram(
        settings.instagram,
      );
    }
  }, []);

  // SAVE
  function saveChanges() {
    localStorage.setItem(
      "galleryImages",
      JSON.stringify(galleryImages),
    );

    localStorage.setItem(
      "websiteSettings",
      JSON.stringify({
        websiteTitle,
        tagline,
        phone,
        email,
        instagram,
      }),
    );

    alert(
      "Changes Saved Successfully!",
    );
  }

  // FIXED IMAGE UPLOAD
  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = e.target.files;

    if (!files) return;

    const newProjects =
      Array.from(files).map(
        (file) => ({
          id:
            Date.now() +
            Math.random(),

          title: file.name,

          category:
            "Wedding",

          images: [
            URL.createObjectURL(
              file,
            ),
          ],

          published: false,
        }),
      );

    setGalleryImages((prev) => [
      ...prev,
      ...newProjects,
    ]);
  }

  // DELETE
  function deleteImage(id: number) {
    setGalleryImages((prev) =>
      prev.filter(
        (img) => img.id !== id,
      ),
    );
  }

  // UPDATE TITLE
  function updateTitle(
    id: number,
    value: string,
  ) {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              title: value,
            }
          : img,
      ),
    );
  }

  // UPDATE CATEGORY
  function updateCategory(
    id: number,
    value: string,
  ) {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              category: value,
            }
          : img,
      ),
    );
  }

  // REPLACE IMAGE
  function replaceImage(
    id: number,
    file: File,
  ) {
    const imageUrl =
      URL.createObjectURL(file);

    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              images: [
                imageUrl,
                ...img.images.slice(
                  1,
                ),
              ],
            }
          : img,
      ),
    );
  }

  // ADD MORE PHOTOS
  function addMorePhotos(
    id: number,
    files: FileList,
  ) {
    const newImages =
      Array.from(files).map(
        (file) =>
          URL.createObjectURL(
            file,
          ),
      );

    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              images: [
                ...img.images,
                ...newImages,
              ],
            }
          : img,
      ),
    );
  }

  // PUBLISH
  function publishImage(id: number) {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              published: true,
            }
          : img,
      ),
    );

    alert(
      "Project Published Successfully!",
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HEADER */}
      <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold break-words">
              {websiteTitle}
            </h1>

            <p className="text-zinc-400 mt-2 text-sm md:text-base">
              Full Website Dashboard
            </p>
          </div>

          <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-80 transition w-full md:w-auto">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-10">
        {/* SETTINGS */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Website Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <input
              type="text"
              value={websiteTitle}
              onChange={(e) =>
                setWebsiteTitle(
                  e.target.value,
                )
              }
              placeholder="Website Title"
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              value={tagline}
              onChange={(e) =>
                setTagline(
                  e.target.value,
                )
              }
              placeholder="Tagline"
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value,
                )
              }
              placeholder="Phone"
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              placeholder="Email"
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              value={instagram}
              onChange={(e) =>
                setInstagram(
                  e.target.value,
                )
              }
              placeholder="Instagram"
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3 md:col-span-2"
            />
          </div>

          <button
            onClick={saveChanges}
            className="mt-6 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:opacity-80 transition w-full md:w-auto"
          >
            Save Website Settings
          </button>
        </section>

        {/* UPLOAD */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Upload New Projects
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={
              handleImageUpload
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4"
          />
        </section>

        {/* GALLERY */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Gallery Management
            </h2>

            <button
              onClick={saveChanges}
              className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-80 transition"
            >
              Save All Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                >
                  <img
                    src={
                      item.images?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />

                  <div className="p-5 md:p-6 space-y-5">
                    <div>
                      {item.published ? (
                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                          Published
                        </span>
                      ) : (
                        <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm">
                          Draft
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateTitle(
                          item.id,
                          e.target
                            .value,
                        )
                      }
                      className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                    />

                    <select
                      value={
                        item.category
                      }
                      onChange={(e) =>
                        updateCategory(
                          item.id,
                          e.target
                            .value,
                        )
                      }
                      className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                    >
                      <option>
                        Wedding
                      </option>

                      <option>
                        Pre Wedding
                      </option>

                      <option>
                        Engagement
                      </option>

                      <option>
                        Maternity
                      </option>

                      <option>
                        Baby Shower
                      </option>

                      <option>
                        Baby Shoot
                      </option>
                    </select>

                    {/* REPLACE */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file =
                          e.target
                            .files?.[0];

                        if (file) {
                          replaceImage(
                            item.id,
                            file,
                          );
                        }
                      }}
                      className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                    />

                    {/* ADD MORE */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files =
                          e.target
                            .files;

                        if (files) {
                          addMorePhotos(
                            item.id,
                            files,
                          );
                        }
                      }}
                      className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                    />

                    <div className="text-sm text-zinc-400">
                      Total Photos:{" "}
                      {
                        item.images
                          .length
                      }
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {!item.published && (
                        <button
                          onClick={() =>
                            publishImage(
                              item.id,
                            )
                          }
                          className="bg-white text-black px-4 py-3 rounded-xl text-sm font-semibold"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={
                          saveChanges
                        }
                        className="border border-zinc-700 px-4 py-3 rounded-xl text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          deleteImage(
                            item.id,
                          )
                        }
                        className="border border-red-700 text-red-400 px-4 py-3 rounded-xl text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}