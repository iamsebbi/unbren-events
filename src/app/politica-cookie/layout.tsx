import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Politica Cookie",
  description:
    "Politica de cookie-uri UNBREN. Informații despre cookie-urile tehnice utilizate pe site.",
  path: "/politica-cookie",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
