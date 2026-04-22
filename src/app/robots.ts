import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Generate robots.txt rules for the site.
 *
 * Allows all crawlers full access and references the dynamic sitemap.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/sanity/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
