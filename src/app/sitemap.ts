import type { MetadataRoute } from "next";
import { locales, pagePath, siteUrl, type Section } from "@/content/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return (["home", "legal", "privacy", "terms"] as Section[]).flatMap((section) =>
    locales.map((locale) => ({
      url: `${siteUrl}${pagePath(locale, section)}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${siteUrl}${pagePath(lang, section)}`]),
        ),
      },
    })),
  );
}
