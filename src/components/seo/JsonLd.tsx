import React from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// JSON-LD STRUCTURED DATA COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Props for the JsonLd component.
 */
interface JsonLdProps {
  /** A JSON-LD structured data object (e.g. Organization, BreadcrumbList). */
  readonly data: Record<string, unknown>;
}

/**
 * Server component that renders a `<script type="application/ld+json">` tag.
 *
 * Use this to inject structured data (Schema.org) into any page for rich
 * search results. Supports Organization, BreadcrumbList, FAQPage, etc.
 *
 * @example
 * ```tsx
 * <JsonLd data={{
 *   "@context": "https://schema.org",
 *   "@type": "Organization",
 *   name: "UNBREN.",
 *   url: "https://unbren.ro",
 * }} />
 * ```
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
