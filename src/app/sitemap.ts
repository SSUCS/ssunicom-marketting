import type { MetadataRoute } from "next";
import { companyNav, legalNav, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...new Set([...nav, ...companyNav, ...legalNav].map((r) => r.href))].map((href) => ({ href }));
  return routes.map(({ href }) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : href.startsWith("/privacy") || href.startsWith("/terms") ? 0.3 : 0.7,
  }));
}
