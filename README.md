# SS Unicom Service: marketing website

Sample marketing website for SS Unicom Service, an India-based BPO, lead generation and business support company.
Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4. The only runtime dependencies are Next.js and React: icons, illustrations and the scroll animation are hand-written SVG, CSS and React.

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
| `/` | Home, including the "Journey of a Lead" scroll animation |
| `/about` | About Us |
| `/services` | Services (each service has an anchor, e.g. `/services#india-edtech`) |
| `/how-we-work` | Five-stage workflow and operating details |
| `/industries` | Industries & Markets |
| `/contact` | Contact details and inquiry form |
| `/privacy-policy`, `/terms` | Legal drafts (flagged for review) |
| `/api/contact` | Server endpoint for the form |

`sitemap.xml`, `robots.txt`, the favicon (`src/app/icon.svg`) and the default social image (`src/app/opengraph-image.tsx`) are generated automatically.

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
- Includes a hidden honeypot field for basic spam protection. Add rate limiting or a CAPTCHA if spam becomes a problem.

## Where to change things

| What | Where |
| --- | --- |
| Company name, phone, email, address, hours, navigation, form service options | `src/lib/site.ts` |
| Service descriptions, workflow steps, animation stage copy, "why choose us" commitments | `src/lib/content.ts` |
| Page-specific copy | `src/app/<route>/page.tsx` |
| Colours, fonts, radii (design tokens) | `@theme` block in `src/app/globals.css`; fonts in `src/app/layout.tsx` |
| Logo (temporary wordmark) | `src/components/Logo.tsx` and `src/app/icon.svg` |
| Shared buttons, headings, containers, placeholders | `src/components/ui.tsx` |
| Page hero, service cards, process steps, CTA band | `src/components/sections.tsx` |
| Header / footer | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Analytics | `src/components/Analytics.tsx` |

## The lead-journey animation

`src/components/LeadJourney.tsx` is the only scroll-driven animation on the site.

- A tall track (`TRACK_VH`) holds a `position: sticky` panel, so normal page scrolling drives it. No scroll hijacking.
- Scroll progress is read once per animation frame and written directly to the SVG (path stroke offset, token position). React only re-renders when the active stage changes.
- `STAGE_SHARE` sets how much of the scroll the four stages use; the remainder completes the path and reveals the CTA.
- Path and node geometry are the `PATH` and `NODES` constants. Stage visuals are in `StageVisual` at the bottom of the file. Stage text comes from `journeyStages` in `src/lib/content.ts`.
- With `prefers-reduced-motion`, without JavaScript, and on first server render, a static version shows the completed workflow with all four stages explained.

Elsewhere, motion is limited to a subtle reveal-on-scroll (`.reveal` class plus `src/components/RevealObserver.tsx`) and the hero illustration's flowing connectors. Both switch off under reduced motion.

## Placeholders to resolve before launch

Search the code for `PLACEHOLDER` and `<Placeholder` to find each one.

1. **Address and business hours.** `site.contact.address` and `site.contact.hours` in `src/lib/site.ts` are `null` and hidden until filled in.
2. **Form delivery.** Configure Resend or a webhook and decide which inbox receives inquiries.
3. **Privacy Policy and Terms.** Structured drafts only. Data practices, providers, retention, rights, liability, governing law and jurisdiction need company input and legal review. Remove the draft notice in `src/components/LegalPage.tsx` once approved.
4. **Mission statement** on `/about` is draft wording pending approval.
5. **Team photo** placeholder on `/about`. Replace with an approved image using `next/image` and descriptive alt text.
6. **Operating details** on `/how-we-work`: QA method, reporting frequency, tools and feedback process.
7. **Logo.** The wordmark and icon are temporary.
8. **Service scope.** Confirm the activity lists in `src/lib/content.ts` match what the company actually offers, especially for the US and Canadian services.
9. **Analytics.** If enabled, update the privacy policy and consider whether a consent banner is needed.

## Content principles

The copy deliberately avoids invented facts: no client names, testimonials, ratings, metrics, certifications, founding dates or headcounts. "10+ years" is presented as company-provided industry experience. Service copy states that the company provides process support only, not legal, financial, lending or immigration advice. Keep to these rules when editing.
