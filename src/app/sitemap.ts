import type { MetadataRoute } from "next";
import { legalNav, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...nav, ...legalNav].map(({ href }) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : href.startsWith("/privacy") || href.startsWith("/terms") ? 0.3 : 0.7,
  }));
}
