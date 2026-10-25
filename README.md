# SS Universal Communication Services: marketing website (grid variation)

This branch is a design variation modelled on the layout and motion of labs.chaingpt.org: a light grey page on a fixed four-column grid, oversized display type, chamfered orange buttons, isometric illustrations and a glass "lead tube" that carries a lead down the home page. All artwork, fonts and copy are original or openly licensed; nothing is copied from the reference site. The original design stays on `main`.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4. Runtime dependencies: Next.js, React and [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling. Icons and other illustrations are hand-written SVG and CSS. [three.js](https://threejs.org) is a dev dependency, used only to render the hero funnel's picture.

## Quick start

Requires Node.js 18.18 or newer (20+ recommended).

```bash
npm install        # install dependencies
npm run dev        # development server at http://localhost:3000
npm run lint       # ESLint
npx tsc --noEmit   # type-check
npm run build      # production build
npm start          # serve the production build
```

Deploys as a standard Next.js app (Vercel, Netlify, or any Node host). Set the environment variables below in the host's dashboard.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero funnel, the lead tube, services, case studies, industries, testimonials, team, FAQ, hiring |
| `/services` | Four service lines (anchors: `#us-lead-generation`, `#web-apps-digital-marketing`, `#india-edtech`, `#custom-solutions`) |
| `/how-we-work` | Five steps, quality, reporting, compliance |
| `/industries` | Industries and markets, with live Kanpur and New York clocks |
| `/about` | Story, mission, values, training, team, founder's note, office photos |
| `/infrastructure` | Operations centre (linked from the footer) |
| `/careers` | Open roles, what you get, how to apply, no-fee notice |
| `/contact` | Enquiry form, contact details and map |
| `/privacy-policy`, `/terms` | Legal outlines for the company's legal adviser |
| `/placeholders` | Internal checklist of every sample value (not indexed) |
| `/api/contact` | Server endpoint for the form |

## Placeholders (sample content)

Every unconfirmed fact (address, hours, team size, client names, case studies, testimonials, team, benefits, photos and so on) lives in **`src/lib/placeholders.ts`**. On the site, sample values have a dotted orange underline, whole sample cards carry a small "Sample" tag, and a dismissible notice links to `/placeholders`, which lists every item and its status.

To replace one, change its `value` (or list items) and set `confirmed: true`. When everything is confirmed, set `SHOW_SAMPLE_MARKERS = false` to remove the notice. Do not launch with sample values.

## Environment variables

Copy `.env.example` to `.env.local` (local) or set these in your host. None are required to build.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical links, sitemap and Open Graph. Defaults to `https://ssunicomservice.com`. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery via [Resend](https://resend.com). The "from" address must be on a domain verified in Resend. |
| `CONTACT_WEBHOOK_URL` | Alternative delivery: the submission is POSTed as JSON to this URL (Formspree, Zapier, Make, Google Apps Script, etc.). |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics 4 ID. Nothing analytics-related loads when empty. |

Secrets are only read on the server (`src/app/api/contact/route.ts`); never prefix them with `NEXT_PUBLIC_`.

## Contact form

- Validation rules live in `src/lib/contact.ts` and run in the browser and on the server.
- Delivery is in `src/app/api/contact/route.ts`. Resend is used if configured, otherwise the webhook.
- **If neither is configured, the form does not pretend to send.** The visitor is told the message was not sent and is shown the email address and phone number instead.
- The footer's "Get a call back" field opens `/contact?email=…` with the email filled in; "Enquire" buttons pre-select a service with `?service=…`.
- Includes a hidden honeypot field for basic spam protection. Add rate limiting or a CAPTCHA if spam becomes a problem.

## Where to change things

| What | Where |
| --- | --- |
| Sample / unconfirmed facts | `src/lib/placeholders.ts` |
| Company name, phone, email, navigation, form options | `src/lib/site.ts` |
| Shared copy: services, capabilities, steps, industries, values, roles, FAQ | `src/lib/content.tsx` |
| Page-specific copy | `src/app/<route>/page.tsx` |
| Colours, fonts, grid, buttons, effects | `src/app/globals.css`; fonts in `src/app/layout.tsx` |
| Grid rows, buttons, headings, labels | `src/components/ui.tsx` |
| Page hero, section blocks (case studies, FAQ, team, CTA) | `src/components/sections.tsx` |
| Cards | `src/components/cards.tsx` |
| Illustrations (cubes, spheres, isometric icons, portraits, funnel, charts) | `src/components/visuals.tsx` |
| Lead tube on the home page | `src/components/LeadTube.tsx` |
| Hero funnel: shape and motion | `src/components/funnelMotion.ts` |
| Hero funnel: drawing (chips, shadows, glow) | `src/components/funnelCanvas.ts`; loaded by `src/components/HeroFunnel.tsx` |
| Hero funnel: the funnel picture | `src/components/hero-funnel.webp`, rendered from `scripts/funnel-stage.ts` by `node scripts/render-hero-funnel.mjs` (needs Playwright); re-run it after changing the funnel's shape or lighting |

## Grid and motion

- The page sits on four columns (two on tablets, one on phones). The fixed vertical lines come from `src/components/GridLines.tsx`; each page root is a size container (`@container`), so widths such as `25cqw` land exactly on the lines. Any cell whose text spans two columns gets `bg-bg` so the lines never run through words.
- Effects: preloader with a pixel cover (first visit per session), pixel page transitions (`src/app/template.tsx`), letter-by-letter headings, scramble text on hover, a marquee, scroll-snap sliders, Lenis smooth scrolling, the hero funnel (lead sources drop in, swirl down and pulse the orange band) and the lead tube whose card changes status as it passes each collar.
- The hero funnel is a picture rendered in 3D with the chips drawn over it on a 2D canvas, so it runs in every browser without WebGL. It only animates while it is on screen, shows a still with reduced motion, and falls back to the SVG funnel without JavaScript.
- Everything switches off or goes static under `prefers-reduced-motion`, and content stays readable without JavaScript (the preloader is skipped, reveals are disabled, the FAQ uses native `<details>`).

## Fonts and licences

- Turret Road (display) and Roboto Mono (text) load through `next/font/google`.
- The social image (`src/app/opengraph-image.tsx`) embeds Turret Road from `src/app/_og/`, under the SIL Open Font License (`src/app/_og/TurretRoad-OFL.txt`).

## Content principles

No invented testimonials, ratings, awards or guaranteed results. Client names, figures and dates on this branch are clearly marked samples, kept in one file, and must be replaced or removed before launch. Service copy states the company does not provide legal or financial advice, approve loans or represent any government agency. Keep to these rules when editing.
