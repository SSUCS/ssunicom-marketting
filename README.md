# SS Unicom Service: marketing website (bento-grid variation)

This branch is a second design variation: a dark, modular bento-grid layout with the October 2026 content doc. The original design stays on `main`.

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
| `/` | Home, including the "From first click to qualified call" scroll scene |
| `/about` | About Us |
| `/services` | Services (anchors: `#us-lead-generation`, `#web-apps-digital-marketing`, `#india-edtech`, `#custom-solutions`) |
| `/how-we-work` | Five steps, quality, reporting, tools, compliance |
| `/industries` | Industries & Markets |
| `/infrastructure` | Operations centre (linked from the footer) |
| `/careers` | Careers |
| `/contact` | Contact details, enquiry form and map |
| `/privacy-policy`, `/terms` | Legal outlines for the company's legal adviser |
| `/placeholders` | Internal checklist of every sample value (not indexed) |
| `/api/contact` | Server endpoint for the form |

## Placeholders (sample content)

Every unconfirmed fact (the bracketed items in the content doc, plus sample client names, leaders, projects and benefits) lives in **`src/lib/placeholders.ts`**. On the site, sample values have a dashed amber outline, and a banner at the top links to `/placeholders`, which lists them all.

To replace one, change its `value` (or list items) and set `confirmed: true`. When everything is confirmed, set `SHOW_SAMPLE_MARKERS = false` to remove the banner. Do not launch with sample values.

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
| Sample / unconfirmed facts | `src/lib/placeholders.ts` |
| Company name, phone, email, navigation, form options | `src/lib/site.ts` |
| Services, journey stages, workflow steps, values, compliance points | `src/lib/content.ts` |
| Page-specific copy | `src/app/<route>/page.tsx` |
| Colours, fonts, radii, tile styles | `src/app/globals.css`; fonts in `src/app/layout.tsx` |
| Buttons, labels, tiles, headings | `src/components/ui.tsx` |
| Page hero, CTA strip, marquee, photo slots | `src/components/blocks.tsx` |
| Scroll scene | `src/components/LeadJourney.tsx` |

## Motion

- The scroll scene uses a sticky panel inside a tall track (`TRACK_VH`), so normal scrolling drives it. Reduced-motion and no-JS visitors get a static version with every stage.
- Tiles reveal on scroll and show a soft spotlight under the pointer (`src/components/Spotlight.tsx`). The client strip scrolls as a marquee. All motion switches off under `prefers-reduced-motion`.

## Content principles

No invented testimonials, ratings, awards or guaranteed results. Client names, figures and dates on this branch are clearly marked samples, kept in one file, and must be replaced or removed before launch. Service copy states the company does not provide legal or financial advice, approve loans or represent any government agency. Keep to these rules when editing.
