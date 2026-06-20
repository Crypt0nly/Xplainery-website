# Xplainery — Website

A modern, premium marketing website for **Xplainery**, an AI education company
helping European professionals and businesses build practical AI skills.

Design language inspired by Apple, Notion and Stripe: clean, confident,
generous whitespace, subtle motion, and a focus on trust and conversion.

## ✨ Highlights

- **Multilingual** — English, German and Spanish with locale-prefixed routing
  (`/en`, `/de`, `/es`), automatic language detection and a language switcher.
- **Interactive tools** (lead generation):
  - **AI Readiness Assessment** — a 5-question quiz that scores a visitor's AI
    maturity and recommends a tailored next step.
  - **AI Training ROI Calculator** — estimates the annual hours and € value
    practical AI training could return to a team.
- **Dark mode** with no flash of unstyled content.
- **Premium motion** via Framer Motion (scroll reveals, hero animation,
  testimonial carousel, FAQ accordion) — all respect `prefers-reduced-motion`.
- **SEO-ready** — per-locale metadata, Open Graph, `hreflang` alternates,
  JSON-LD structured data (Organization, Service, FAQ), `sitemap.xml` and
  `robots.txt`.
- **Accessible** — semantic HTML, keyboard-friendly controls, skip link,
  visible focus states.

## 🧱 Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/) icons

No external CSS frameworks or UI kits — the design system lives in
`tailwind.config.ts` and `src/app/globals.css` (semantic colour tokens driven
by CSS variables, used for theming).

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build
npm run start    # serve the production build
```

## 📁 Project structure

```
src/
  app/
    [locale]/            # locale-scoped root layout + home page + not-found
    globals.css          # design tokens + base styles
    icon.svg             # favicon (Next file convention)
    robots.ts            # robots.txt
    sitemap.ts           # sitemap.xml
  components/
    layout/              # Header, Footer, NewsletterForm
    sections/            # Hero, Why, Services, Tools, Pricing, Founder,
                         # Testimonials, CTASection, FAQ, Contact, Logos
    interactive/         # AIReadinessAssessment, ROICalculator
    ui/                  # Logo, Icon, Reveal, SectionHeading,
                         # LanguageSwitcher, ThemeToggle
    StructuredData.tsx   # JSON-LD
  i18n/
    config.ts            # locales + metadata
    index.ts             # getDictionary()
    dictionaries/        # en.ts (source of truth), de.ts, es.ts
  lib/
    site.ts              # central config (booking URL, email, socials, founder)
    utils.ts             # helpers (cn, formatEUR, localePath, …)
  middleware.ts          # locale detection + redirect
```

## 🌍 Editing content & translations

All copy lives in `src/i18n/dictionaries/`. `en.ts` is the **source of truth**
and its exported type (`Dictionary`) is enforced on `de.ts` and `es.ts`, so the
three files always stay structurally in sync.

To add a language: add it to `locales` in `src/i18n/config.ts`, create a new
dictionary file typed as `Dictionary`, and register it in `src/i18n/index.ts`.

## ⚙️ Before launch — configure these

Edit `src/lib/site.ts`:

- `bookingUrl` — your real scheduling link (Cal.com / Calendly / HubSpot) for
  the **“Book a Free Discovery Call”** CTAs.
- `email`, `social.*`, `founder.*`, `url`/`domain`.

Wire up form submissions:

- The **contact form** (`src/components/sections/Contact.tsx`) and the
  **newsletter form** (`src/components/layout/NewsletterForm.tsx`) currently
  simulate success on the front end. Connect them to an API route, CRM or form
  provider before going live.

> **Note:** Testimonials in `dictionaries/*.ts` are realistic **placeholders**.
> Replace them with real, attributable client quotes before launch.

## 📦 Deployment

Optimised for [Vercel](https://vercel.com/) (zero config). Any platform that
supports Next.js 14 (Node 18+) works. Static-friendly, but middleware-based
locale redirects require a Node/edge runtime (Vercel, Netlify, a Node server).
