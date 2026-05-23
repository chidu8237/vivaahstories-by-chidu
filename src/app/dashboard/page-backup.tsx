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
  // =========================================
  // STATES
  // =========================================

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

  // =========================================
  // LOAD SAVED DATA
  // =========================================

  useEffect(() => {
    const savedGallery =
      localStorage.getItem(
        "galleryImages",
      );

    const savedSettings =
      localStorage.getItem(
        "websiteSettings",
      );

    // LOAD GALLERY
    if (savedGallery) {
      const parsed =
        JSON.parse(savedGallery);

      // FIX OLD + NEW DATA
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
      // DEFAULT DATA
      setGalleryImages([
        {
          id: 1,

          title:
            "Wedding Shoot",

          category:
            "Wedding",

          images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552",
          ],

          published: true,
        },

        {
          id: 2,

          title:
            "Pre Wedding",

          category:
            "Pre Wedding",

          images: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
          ],

          published: true,
        },

        {
          id: 3,

          title:
            "Engagement",

          category:
            "Engagement",

          images: [
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
          ],

          published: false,
        },

        {
          id: 4,

          title:
            "Maternity",

          category:
            "Maternity",

          images: [
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
          ],

          published: false,
        },
      ]);
    }

    // LOAD SETTINGS
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

  // =========================================
  // SAVE DATA
  // =========================================

  async function saveChanges() {
    try {
      localStorage.setItem(
        "galleryImages",

        JSON.stringify(
          galleryImages.map(
            (img) => ({
              ...img,

              images:
                img.images
                  ?.length > 0
                  ? img.images
                  : [],
            }),
          ),
        ),
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
        "All Changes Saved Successfully!",
      );
    } catch (error) {
      console.error(error);

      alert("Save Failed");
    }
  }

  // =========================================
  // UPLOAD NEW PROJECTS
  // =========================================

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

  // =========================================
  // DELETE PROJECT
  // =========================================

  function deleteImage(id: number) {
    setGalleryImages((prev) =>
      prev.filter(
        (img) => img.id !== id,
      ),
    );
  }

  // =========================================
  // UPDATE TITLE
  // =========================================

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

  // =========================================
  // UPDATE CATEGORY
  // =========================================

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

  // =========================================
  // REPLACE COVER IMAGE
  // =========================================

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

  // =========================================
  // ADD MORE PHOTOS
  // =========================================

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

  // =========================================
  // PUBLISH
  // =========================================

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
      "Image Published Successfully!",
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {websiteTitle}
            </h1>

            <p className="text-zinc-400 mt-2">
              Full Website Dashboard
            </p>
          </div>

          <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* WEBSITE SETTINGS */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">
            Website Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              value={websiteTitle}
              onChange={(e) =>
                setWebsiteTitle(
                  e.target.value,
                )
              }
              placeholder="Website Title"
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
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
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
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
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
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
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
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
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            />
          </div>

          <button
            onClick={saveChanges}
            className="mt-6 bg-white text-black px-8 py-4 rounded-2xl font-semibold"
          >
            Save Website Settings
          </button>
        </section>

        {/* UPLOAD */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Upload New Projects
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={
              handleImageUpload
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400">
              Total Projects
            </h3>

            <p className="text-5xl font-bold mt-4">
              {
                galleryImages.length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400">
              Published
            </h3>

            <p className="text-5xl font-bold mt-4">
              {
                galleryImages.filter(
                  (img) =>
                    img.published,
                ).length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400">
              Drafts
            </h3>

            <p className="text-5xl font-bold mt-4">
              {
                galleryImages.filter(
                  (img) =>
                    !img.published,
                ).length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400">
              Categories
            </h3>

            <p className="text-5xl font-bold mt-4">
              6
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">
              Gallery Management
            </h2>

            <button
              onClick={saveChanges}
              className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
            >
              Save All Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {galleryImages.map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                >
                  {/* COVER IMAGE */}
                  <img
                    src={
                      item.images?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={item.title}
                    className="w-full h-80 object-cover"
                  />

                  <div className="p-6 space-y-5">
                    {/* STATUS */}
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

                    {/* TITLE */}
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Title
                      </label>

                      <input
                        type="text"
                        value={
                          item.title
                        }
                        onChange={(
                          e,
                        ) =>
                          updateTitle(
                            item.id,
                            e.target
                              .value,
                          )
                        }
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                      />
                    </div>

                    {/* CATEGORY */}
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Category
                      </label>

                      <select
                        value={
                          item.category
                        }
                        onChange={(
                          e,
                        ) =>
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
                    </div>

                    {/* REPLACE COVER */}
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Replace Cover
                        Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(
                          e,
                        ) => {
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
                    </div>

                    {/* ADD MORE */}
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Add More
                        Photos
                      </label>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(
                          e,
                        ) => {
                          const files =
                            e.target
                              .files;

                          if (
                            files
                          ) {
                            addMorePhotos(
                              item.id,
                              files,
                            );
                          }
                        }}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
                      />
                    </div>

                    {/* PHOTO COUNT */}
                    <div className="text-sm text-zinc-400">
                      Total Photos:{" "}
                      {
                        item.images
                          .length
                      }
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {!item.published && (
                        <button
                          onClick={() =>
                            publishImage(
                              item.id,
                            )
                          }
                          className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={
                          saveChanges
                        }
                        className="border border-zinc-700 px-4 py-2 rounded-xl text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          deleteImage(
                            item.id,
                          )
                        }
                        className="border border-red-700 text-red-400 px-4 py-2 rounded-xl text-sm"
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