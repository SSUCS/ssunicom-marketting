# Editor guide

Sign in at `https://ssunicomservice.com/admin`.

## Edit a page

1. Go to **Content → Pages** and open the page.
2. The **Hero** tab holds the top banner. The **Content** tab holds the sections below it, as blocks you can reorder by dragging.
3. Use **Add block** to insert a section. Each block has a **Section settings** group for background colour, spacing and an anchor (so you can link to `/page#anchor`).
4. Click the eye icon for a live preview, then **Publish changes**. Changes appear on the site within seconds.

Every save is kept in **Versions**, so you can compare or restore an older version. To publish later, use the arrow next to Publish and choose **Schedule publish**.

## Section blocks

| Block | Use it for |
| --- | --- |
| Logo marquee | Scrolling strip of client or platform names |
| Split feature | Text on one side, framed image on the other |
| Metrics | Three big numbers, each linked to a case study |
| Media + content | Heading, text and bullet points beside an image |
| Feature cards | Three or four icon cards ("challenges", "benefits") |
| CTA banner | Full-width blue call-to-action |
| Stats grid | Up to eight numbers with an image |
| Industry grid | Picture cards for industries (automatic or hand-picked) |
| Service directory | Tabbed list of all services, or one group |
| FAQ accordion | Questions with optional expert attribution; adds FAQ schema |
| Rich content | Free text with headings, lists and links |
| Process steps | Numbered steps |
| Case study cards | Latest or chosen case studies |
| Posts feed | Latest insights |
| Testimonial | Quotes on a dark band |
| Jobs list | Open roles |
| Form | Any form from the form builder |
| Trust badges | Small icon badges for certifications and policies |
| Markets we serve | The markets list from Site settings, as cards |

## Services and groups

Each service has a **Summary** tab (title, number, group, icon, one-line description, four deliverables), a **Landing page** tab (hero, overview, benefits, process, stats, FAQs) and a **Relationships** tab (industries, related services, case studies). The services menu and directory update themselves.

## Markets we serve

The six markets (Middle East, India, USA, UK, Canada, Australia) are edited in one place: **Settings → Site settings → Company → Markets we serve**. Each row has a name, the countries it covers and one line on hours or focus. Drag rows to reorder them. The change updates the "Markets we serve" sections on Home and About, the "Serving:" line in the footer and the Google structured data.

To show the markets on another page, add the **Markets we serve** block to that page.

Market-specific wording in page text (for example, "Gulf, Indian, UK, North American or Australian time zones") lives in that page's or service's own fields.

## Menus, footer and company details

**Settings → Header** controls the top menu. Set a menu item to "Mega menu: all services" or "all industries" and it fills itself.
**Settings → Footer** controls footer columns, buttons and legal links.
**Settings → Site settings** holds phone, email, address, social links, default SEO text, analytics IDs and the announcement bar.

## Forms and leads

**Forms** lists the forms; **Form submissions** lists every enquiry with the page it came from and its UTM source. Notification emails go to the address set on the form (Forms → Emails tab) once `RESEND_API_KEY` is configured.

Linking to `/contact?service=<service-slug>` pre-selects that service in the contact form. Service pages already do this.

## Redirects

If you change a page's URL (slug), add a redirect in **SEO → Redirects** from the old path to the page, so links and Google rankings carry over.

## Images

Upload in **Media**. Alt text is required: describe the image for someone who cannot see it. Uploads are converted to WebP and resized automatically.
