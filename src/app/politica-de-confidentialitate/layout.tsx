import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Politica de Confidențialitate",
  description:
    "Politica de confidențialitate UNBREN. Informații despre colectarea, utilizarea și protecția datelor personale.",
  path: "/politica-de-confidentialitate",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
