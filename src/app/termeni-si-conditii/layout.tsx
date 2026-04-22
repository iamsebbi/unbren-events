import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Termeni și Condiții",
  description:
    "Termenii și condițiile de utilizare ale site-ului UNBREN. Acceptarea termenilor, servicii, proprietate intelectuală.",
  path: "/termeni-si-conditii",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
