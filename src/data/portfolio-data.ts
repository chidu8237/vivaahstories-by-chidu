import type {
  CinematicStory,
  PortfolioCategory,
  PortfolioProject,
  VideoProject,
} from "@/types/portfolio";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: "all", label: "All Stories", slug: "all" },
  { id: "wedding", label: "Wedding", slug: "wedding" },
  { id: "pre-wedding", label: "Pre-Wedding", slug: "pre-wedding" },
  { id: "engagement", label: "Engagement", slug: "engagement" },
  { id: "maternity", label: "Maternity", slug: "maternity" },
  { id: "baby-shower", label: "Baby Shower", slug: "baby-shower" },
  { id: "baby-shoot", label: "Baby Shoot", slug: "baby-shoot" },
];

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85`;

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "royal-udaipur",
    slug: "royal-udaipur-wedding",
    title: "Royal Udaipur Wedding",
    category: "wedding",
    categoryLabel: "Wedding",
    location: "Udaipur, Rajasthan",
    year: "2025",
    coverImage: img("1519741497674-611481863552", 1200),
    description:
      "A palace celebration where tradition met cinematic grandeur — every frame composed like a period film.",
    featured: true,
    span: "tall",
    images: [
      { id: "r1", src: img("1519741497674-611481863552"), alt: "Baraat procession" },
      { id: "r2", src: img("1606216794074-735e91aa2a72"), alt: "Royal mandap" },
      { id: "r3", src: img("1469371670807-b0c929fefffb"), alt: "Ring ceremony" },
    ],
  },
  {
    id: "goa-sunset",
    slug: "goa-sunset-vows",
    title: "Goa Sunset Vows",
    category: "wedding",
    categoryLabel: "Wedding",
    location: "Goa",
    year: "2024",
    coverImage: img("1465495976277-798e20252483", 1200),
    description: "Intimate beachside vows bathed in golden hour light and ocean breeze.",
    span: "wide",
    images: [
      { id: "g1", src: img("1465495976277-798e20252483"), alt: "Beach ceremony" },
      { id: "g2", src: img("1522673607200-164d1b6fc486"), alt: "Couple portrait" },
    ],
  },
  {
    id: "jaipur-pre",
    slug: "jaipur-pre-wedding",
    title: "Jaipur Heritage Pre-Wedding",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding",
    location: "Jaipur, Rajasthan",
    year: "2025",
    coverImage: img("1522673607200-164d1b6fc486", 1200),
    description: "Heritage havelis and desert light — a love story written in sandstone and shadow.",
    featured: true,
    span: "default",
    images: [
      { id: "j1", src: img("1522673607200-164d1b6fc486"), alt: "Heritage portrait" },
      { id: "j2", src: img("1511285560929-80b4566080d5"), alt: "Desert shoot" },
    ],
  },
  {
    id: "mumbai-engagement",
    slug: "mumbai-engagement",
    title: "Mumbai Rooftop Engagement",
    category: "engagement",
    categoryLabel: "Engagement",
    location: "Mumbai",
    year: "2024",
    coverImage: img("1529636798458-92174e2e6cb6", 1200),
    description: "City lights, champagne, and a promise — captured with editorial precision.",
    span: "default",
    images: [
      { id: "m1", src: img("1529636798458-92174e2e6cb6"), alt: "Engagement ring" },
      { id: "m2", src: img("1520854221256-17451cc331bf"), alt: "Couple embrace" },
    ],
  },
  {
    id: "bloom-maternity",
    slug: "bloom-maternity",
    title: "Bloom Maternity",
    category: "maternity",
    categoryLabel: "Maternity",
    location: "Bengaluru",
    year: "2025",
    coverImage: img("1555252333-9f8e92a65df7", 1200),
    description: "Soft light, tender anticipation — motherhood framed with poetic elegance.",
    span: "tall",
    images: [
      { id: "b1", src: img("1555252333-9f8e92a65df7"), alt: "Maternity portrait" },
    ],
  },
  {
    id: "celebration-shower",
    slug: "celebration-baby-shower",
    title: "Celebration Baby Shower",
    category: "baby-shower",
    categoryLabel: "Baby Shower",
    location: "Hyderabad",
    year: "2024",
    coverImage: img("1515488042361-ee00e17ddd4f", 1200),
    description: "Joyful details and warm gatherings — the prelude to a new chapter.",
    span: "default",
    images: [
      { id: "s1", src: img("1515488042361-ee00e17ddd4f"), alt: "Baby shower decor" },
    ],
  },
  {
    id: "little-star",
    slug: "little-star-newborn",
    title: "Little Star Newborn",
    category: "baby-shoot",
    categoryLabel: "Baby Shoot",
    location: "Chennai",
    year: "2025",
    coverImage: img("1519689372905-d894fe9f324b", 1200),
    description: "Delicate newborn moments preserved with timeless softness and care.",
    span: "default",
    images: [
      { id: "n1", src: img("1519689372905-d894fe9f324b"), alt: "Newborn portrait" },
    ],
  },
  {
    id: "delhi-reception",
    slug: "delhi-grand-reception",
    title: "Delhi Grand Reception",
    category: "wedding",
    categoryLabel: "Wedding",
    location: "New Delhi",
    year: "2024",
    coverImage: img("1519225421980-715cb0215aed", 1200),
    description: "Grand ballroom energy, dance floor drama, and celebrations until dawn.",
    span: "wide",
    images: [
      { id: "d1", src: img("1519225421980-715cb0215aed"), alt: "Reception dance" },
      { id: "d2", src: img("1583939003579-730e3918a45a"), alt: "Couple entrance" },
    ],
  },
  {
    id: "kerala-backwaters",
    slug: "kerala-backwaters-pre-wedding",
    title: "Kerala Backwaters Pre-Wedding",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding",
    location: "Kerala",
    year: "2024",
    coverImage: img("1606800052052-a08af834be62", 1200),
    description: "Houseboats, monsoon mist, and romance drifting through backwater silence.",
    span: "tall",
    images: [
      { id: "k1", src: img("1606800052052-a08af834be62"), alt: "Backwaters couple" },
    ],
  },
];

export const FEATURED_PROJECTS = PORTFOLIO_PROJECTS.filter((p) => p.featured);

export const CINEMATIC_STORIES: CinematicStory[] = [
  {
    id: "story-1",
    title: "Where Emotion Becomes Art",
    subtitle: "The Philosophy",
    body: "We don't chase poses — we chase truth. Every glance, every tear, every laugh is a beat in your film. Our approach blends documentary instinct with cinematic composition, so your album feels like memory, not a checklist.",
    image: img("1606216794074-735e91aa2a72", 1000),
    imagePosition: "left",
  },
  {
    id: "story-2",
    title: "Light Written in Silver",
    subtitle: "The Aesthetic",
    body: "Black and white is our foundation — it strips distraction and elevates emotion. Color arrives when the moment demands it. This duality defines VivaahStories: timeless monochrome meets living, breathing color.",
    image: img("1520854221256-17451cc331bf", 1000),
    imagePosition: "right",
  },
  {
    id: "story-3",
    title: "Your Story, Forever",
    subtitle: "The Promise",
    body: "From the first consultation to the heirloom gallery, we treat your celebration as a once-in-a-lifetime production. Discreet on the day, extraordinary in delivery.",
    image: img("1469371670807-b0c929fefffb", 1000),
    imagePosition: "left",
  },
];

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "film-1",
    slug: "royal-udaipur-film",
    title: "Royal Udaipur — Cinematic Film",
    category: "Wedding Film",
    thumbnail: img("1519741497674-611481863552", 900),
    duration: "4:32",
    description: "A palace wedding rendered in film grain and orchestral pacing.",
  },
  {
    id: "film-2",
    slug: "goa-vows-film",
    title: "Goa Sunset Vows — Highlight",
    category: "Wedding Highlight",
    thumbnail: img("1465495976277-798e20252483", 900),
    duration: "3:18",
    description: "Beachside intimacy with golden hour cinematography.",
  },
  {
    id: "film-3",
    slug: "jaipur-pre-film",
    title: "Jaipur Heritage — Pre-Wedding Film",
    category: "Pre-Wedding Film",
    thumbnail: img("1522673607200-164d1b6fc486", 900),
    duration: "2:45",
    description: "Heritage architecture meets modern romance.",
  },
  {
    id: "film-4",
    slug: "delhi-reception-film",
    title: "Delhi Grand Reception — Recap",
    category: "Reception Film",
    thumbnail: img("1519225421980-715cb0215aed", 900),
    duration: "5:01",
    description: "Energy, dance, and celebration until the last frame.",
  },
];

export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (category === "all") return PORTFOLIO_PROJECTS;
  return PORTFOLIO_PROJECTS.filter((p) => p.category === category);
}

export function getAllGalleryImages(
  projects: PortfolioProject[],
): { project: PortfolioProject; image: PortfolioProject["images"][0]; index: number }[] {
  const items: { project: PortfolioProject; image: PortfolioProject["images"][0]; index: number }[] =
    [];
  projects.forEach((project) => {
    project.images.forEach((image, index) => {
      items.push({ project, image, index });
    });
    if (project.images.length === 0) {
      items.push({
        project,
        image: { id: project.id, src: project.coverImage, alt: project.title },
        index: 0,
      });
    }
  });
  return items;
}
