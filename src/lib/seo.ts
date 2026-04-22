import type { Metadata } from "next";

// ═══════════════════════════════════════════════════════════════════════════════
// SITE-WIDE SEO CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Base URL for the site, sourced from env or falling back to production domain. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://unbren.events.ro";

/** Display name used in metadata and structured data. */
export const SITE_NAME = "UNBREN.";

/** Default meta description used when no page-specific description is set. */
export const DEFAULT_DESCRIPTION =
  "Agenție creativă de foto & video pentru evenimente. Capturăm emoții, livrăm amintiri prin UNBREN.";

/** Default OG image path (relative to SITE_URL). */
export const DEFAULT_OG_IMAGE = "/unbrenlogo.svg";

// ═══════════════════════════════════════════════════════════════════════════════
// METADATA HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Build a full canonical URL from a pathname.
 *
 * @param path - The pathname, e.g. "/about"
 * @returns The full URL, e.g. "https://unbren.ro/about"
 */
export function buildCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Options for building page-level metadata.
 */
interface PageMetadataOptions {
  /** Page title. Will be templated as "Title | UNBREN.". */
  title: string;
  /** Page meta description. */
  description: string;
  /** Canonical pathname, e.g. "/events/about". */
  path: string;
  /** Optional OG image URL. Defaults to the site logo. */
  ogImage?: string;
  /** Optional `robots` directive override for non-indexable pages. */
  noIndex?: boolean;
}

/**
 * Build a complete Next.js `Metadata` object for a page.
 *
 * Includes title, description, canonical URL, Open Graph, and Twitter Card tags.
 *
 * @param options - Page metadata configuration
 * @returns A `Metadata` object ready to export from a page or layout
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const imageUrl = ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
