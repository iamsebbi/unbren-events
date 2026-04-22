import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllEventProjects, getAllServices } from "./sanity/queries";
import type { Service, EventProject } from "./sanity/types";

/**
 * Generate a dynamic sitemap for the site.
 *
 * Includes all static routes plus dynamic routes fetched from Sanity CMS
 * (services and event projects). Each entry has lastModified, changeFrequency,
 * and priority fields for optimal crawl scheduling.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // ── Static Routes ───────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-de-confidentialitate`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/termeni-si-conditii`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/politica-cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/toate-evenimentele`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ── Dynamic Routes from Sanity ──────────────────────────────────────────
  let serviceRoutes: MetadataRoute.Sitemap = [];
  let eventRoutes: MetadataRoute.Sitemap = [];

  try {
    const services = await getAllServices();
    serviceRoutes = services.map((service: Service) => ({
      url: `${baseUrl}/${service.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch services", error);
  }

  try {
    const events = await getAllEventProjects();
    eventRoutes = events.map((event: EventProject) => ({
      url: `${baseUrl}/last-events/${event.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch event projects", error);
  }

  return [...staticRoutes, ...serviceRoutes, ...eventRoutes];
}
