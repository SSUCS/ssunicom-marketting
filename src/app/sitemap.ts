import type { MetadataRoute } from "next";
import { companyNav, legalNav, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...new Set([...nav, ...companyNav, ...legalNav].map((r) => r.href as string))];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...pages.map((href) => ({
      url: `${site.url}${href}`,
      changeFrequency: "monthly" as const,
      priority: href.startsWith("/privacy") || href.startsWith("/terms") ? 0.3 : 0.7,
    })),
  ];
}
