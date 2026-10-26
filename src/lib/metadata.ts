import type { Metadata } from "next";
import { site } from "./site";

/** Builds per-page metadata with a canonical URL and Open Graph tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
