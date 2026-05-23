# VivaahStories.ByChidu

> **Every Picture, A Story**

Premium cinematic wedding photography platform built with Next.js 15, TypeScript, Tailwind CSS, and a luxury black & white editorial aesthetic.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion, GSAP, Lenis |
| Carousel | Swiper |
| Backend | Supabase |
| Media | Cloudinary |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Theme | next-themes (dark/light) |
| Deploy | Vercel |

---

## Prerequisites

- **Node.js 20+** ([nodejs.org](https://nodejs.org)) — includes npm
- Git (optional)
- Supabase & Cloudinary accounts (when connecting backend/media)

---

## Installation

```bash
# 1. Navigate to project
cd "c:\Users\chidu_edits\OneDrive\Documents\Vivaahstories.by_chidu"

# 2. Install dependencies
npm install

# 3. Copy environment variables
copy .env.example .env.local   # Windows
# cp .env.example .env.local   # macOS/Linux

# 4. Edit .env.local with your keys
```

---

## Run Locally

```bash
# Development (Turbopack)
npm run dev

# Production build
npm run build
npm run start

# Lint & format
npm run lint
npm run format
npm run typecheck
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

See `.env.example` for all required keys:

- `NEXT_PUBLIC_SITE_URL` — Production URL (SEO, sitemap)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_*`

---

## Deploy to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables from `.env.example`
5. Deploy

```bash
# Or via Vercel CLI
npm i -g vercel
vercel
```

`vercel.json` is preconfigured. Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain or custom domain.

---

## Project Structure

```
src/
├── app/                 # Next.js App Router — pages, layouts, metadata, robots, sitemap
├── components/
│   ├── ui/              # shadcn/ui primitives (Button, Input, Sheet, etc.)
│   ├── layout/          # Navbar, Footer, Providers, SmoothScroll, ErrorBoundary
│   ├── sections/        # Page sections (Hero, FeaturedPortfolio, CTA)
│   ├── animations/      # Framer Motion wrappers (FadeIn, StaggerChildren)
│   └── shared/          # Reusable UI (Logo, ThemeToggle, PageHeader, Carousel)
├── features/            # Feature-specific modules (contact-form, booking-form)
├── lib/                 # Core libraries (utils, metadata, supabase, cloudinary)
├── services/            # Data access layer (portfolio.service — swap for Supabase)
├── hooks/               # Custom React hooks (useMediaQuery, useMounted)
├── styles/              # Global CSS & design tokens
├── store/               # Client state (Zustand/Jotai — reserved for future)
├── types/               # Shared TypeScript interfaces
├── config/              # Site config, fonts, env validation
├── constants/           # Navigation, animation presets
└── utils/               # Animation, responsive, transition helpers
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, featured portfolio, CTA |
| `/portfolio` | Full portfolio grid |
| `/about` | About the photographer |
| `/contact` | Contact form |
| `/booking` | Booking inquiry form |

---

## Design System

- **Fonts:** Playfair Display (headings), Poppins (UI), Inter (body)
- **Theme:** Black & white luxury, dark mode default
- **Utilities:** `.glass`, `.container-editorial`, `.link-luxury`, `.section-padding`
- **Animations:** Framer presets in `constants/animations.ts`, GSAP helpers in `utils/animations.ts`

---

## Adding shadcn Components

```bash
npx shadcn@latest add [component-name]
```

`components.json` is preconfigured with `@/` aliases.

---

## Next Steps

1. Add real images to `public/images/` or Cloudinary
2. Replace `og-image.jpg` in `public/` (1200×630)
3. Connect Supabase tables for portfolio & bookings
4. Create API routes for form submissions
5. Add `icon-192.png` and `icon-512.png` for PWA manifest

---

## License

Private — © VivaahStories.ByChidu
