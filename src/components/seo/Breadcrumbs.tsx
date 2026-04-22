import Link from "next/link";
import JsonLd from "./JsonLd";
import { buildCanonicalUrl } from "@/lib/seo";

// ═══════════════════════════════════════════════════════════════════════════════
// BREADCRUMBS COMPONENT WITH SCHEMA MARKUP
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * A single breadcrumb item.
 */
interface BreadcrumbItem {
  /** Display label for the breadcrumb. */
  label: string;
  /** Pathname for the breadcrumb link. Omit for the current (last) item. */
  href?: string;
}

/**
 * Props for the Breadcrumbs component.
 */
interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items (first = root, last = current page). */
  readonly items: BreadcrumbItem[];
  /** Optional additional CSS class. */
  readonly className?: string;
  /** Hide visual breadcrumb UI but keep JSON-LD output for SEO. */
  readonly hideVisual?: boolean;
}

/**
 * Server component rendering breadcrumb navigation with BreadcrumbList JSON-LD.
 *
 * Renders an accessible `<nav aria-label="Breadcrumb">` with linked items
 * and injects Schema.org BreadcrumbList structured data for rich results.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/events" },
 *   { label: "Servicii", href: "/events" },
 *   { label: "Foto Nuntă" },
 * ]} />
 * ```
 */
export default function Breadcrumbs({
  items,
  className = "",
  hideVisual = false,
}: BreadcrumbsProps) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: buildCanonicalUrl(item.href) }),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      {!hideVisual && (
        <nav
          aria-label="Breadcrumb"
          className={`px-4 pt-4 md:px-8 lg:px-12 ${className}`}
        >
          <ol className="flex flex-wrap items-center gap-1 text-xs tracking-wide text-(--color-events-muted) uppercase">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.label} className="flex items-center gap-1">
                  {index > 0 && (
                    <span aria-hidden="true" className="mx-1 select-none">
                      /
                    </span>
                  )}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-(--color-events-text)"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className={isLast ? "text-(--color-events-text)" : ""}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
