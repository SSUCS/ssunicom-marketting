# SEO setup and keyword plan

## What is automatic

- **Metadata:** every page, service, industry, article, case study and job has an SEO tab. Empty fields fall back to Site settings → SEO defaults. Titles use the template `%s | SS Unicom`.
- **Canonical URLs** always point at `https://ssunicomservice.com` (from `NEXT_PUBLIC_SERVER_URL`), never at preview domains.
- **Structured data (JSON-LD):** ProfessionalService organisation with address, phone and area served; WebSite; BreadcrumbList on inner pages; Service on service pages; FAQPage wherever FAQs are shown; ItemList on directories; BlogPosting on articles; JobPosting on job pages (eligible for Google Jobs).
- **Sitemap** at `/sitemap.xml`, rebuilt hourly and on every publish, excluding noindex pages.
- **robots.txt** blocks `/admin` and `/api`. Preview deployments block everything and send `noindex`.
- **llms.txt** at `/llms.txt` lists services and key pages for AI assistants.
- **RSS** at `/insights/feed.xml`.
- **Open Graph images** are generated for pages without a chosen social image.

## The keyword map (SEO → Keyword map)

The CMS has a SEMrush-style keyword map with 115 starter keywords. Each row has:

| Field | Use |
| --- | --- |
| Keyword, cluster | The search term and its topic group (one cluster per service group, plus Industries, Core pages, Brand, Local) |
| Intent | Commercial, transactional, informational or navigational |
| Market | Middle East, India, USA, UK, Canada, Australia or global |
| Priority | P1 now, P2 next, P3 later |
| Status | Idea → mapped → content live → ranking |
| Volume, KD %, CPC, current position | Paste from SEMrush (or Ahrefs / Keyword Planner) |
| Target page | The one page that should rank for it |
| Source, last checked, notes | Where the numbers came from |

Volume, difficulty and CPC are empty because they must come from a real SEMrush export. Rule of thumb: **one primary keyword per page, one page per keyword.** If two rows point at different pages for near-identical terms, merge them to avoid the pages competing.

### Monthly routine with SEMrush

1. In SEMrush **Keyword Overview**, paste the keywords from one cluster (export from the admin list view as CSV) and set the database for each market in turn: UAE and Saudi Arabia, India, United States, United Kingdom, Canada and Australia.
2. Copy volume, KD % and CPC into the matching rows. Set **Source** to SEMrush and **Last checked** to today.
3. In **Position Tracking**, create a project for `ssunicomservice.com` with the P1 keywords. Each month, copy the current position into the map and update **Status**.
4. Use **Keyword Magic Tool** on each service's focus keyword to find question keywords. Add good ones as FAQ entries on that service page, or as Insights articles (status: Idea).
5. Run **Site Audit** monthly and fix anything flagged as an error.

### Focus keyword check

The focus keyword field on every SEO tab shows a live check: whether the keyword appears in the meta title, meta description and URL slug, and the title and description lengths. Aim for green on all.

## Starter keyword strategy

- **Money pages:** each of the 20 services targets a commercial "<service> outsourcing / services" keyword, with 2–3 secondary variants (often "India" variants, which signal offshore buyers).
- **Group pages** target the broader category (for example "customer experience outsourcing").
- **Industry pages** target "<industry> BPO / outsourcing services".
- **Local:** "BPO company in Kanpur", "call center in Kanpur" and "BPO jobs in Kanpur" for the About and Careers pages, supported by a Google Business Profile.
- **Markets:** eight starter keywords, at least one per market (for example "BPO services for UAE businesses" and "call center outsourcing Canada"), all pointing at the home page for now. Once one market brings real enquiries, give it its own landing page.
- **Brand:** "SS Unicom", "SS Unicom Service", "SS Universal Communication Services".
- **Content:** Insights articles target informational questions buyers ask before choosing a vendor, and link to the matching service.

## Launch checklist

1. Set `NEXT_PUBLIC_SERVER_URL` to the live domain and redeploy.
2. Verify the domain in Google Search Console and Bing Webmaster Tools (paste the verification codes in Site settings → SEO defaults) and submit `/sitemap.xml`.
3. Create or claim the Google Business Profile for the Kanpur office, with the same name, address and phone as the website, and add the Maps link in Site settings.
4. Add the GTM container ID (or GA4 ID) in Site settings → Analytics. Mark `generate_lead` as a key event in GA4.
5. Add redirects for any old URLs that had traffic (SEO → Redirects).
6. Replace the placeholder details listed in `content-to-confirm.md`.
