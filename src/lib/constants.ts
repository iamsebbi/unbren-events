// ═══════════════════════════════════════════════════════════════════════════════
// SHARED NAVIGATION & LINK CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Navigation links used in the Events footer sitemap column. */
export const EVENTS_FOOTER_SITEMAP = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Galerie", href: "/gallery" },
  { name: "Oferte", href: "/offers" },
  { name: "Contact", href: "/contact" },
  { name: "Last Events", href: "/last-events" },
] as const;

/** Legal page links shared across footers. */
export const LEGAL_LINKS = [
  {
    name: "Politică de Confidențialitate",
    href: "/politica-de-confidentialitate",
  },
  { name: "Termeni și Condiții", href: "/termeni-si-conditii" },
  { name: "Politică Cookie", href: "/politica-cookie" },
] as const;

/** Fallback social links when Sanity data is unavailable. */
export const FALLBACK_SOCIAL_LINKS = [
  { platform: "Instagram", url: "https://instagram.com" },
  { platform: "Facebook", url: "https://facebook.com" },
] as const;
