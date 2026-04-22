import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import OffersClientPage from "./OffersClientPage";
import { getOffers, getFaqs, getSettings } from "../sanity/data";
import type { OfferCategory } from "../sanity/types";
import { OffersSkeleton } from "../_shared/skeletons/EventsSkeletons";

export const metadata: Metadata = buildPageMetadata({
  title: "Pachete & Oferte — UNBREN.",
  description:
    "Descoperă pachetele foto și video UNBREN. pentru nunți, botezuri și evenimente. Prețuri transparente, servicii premium.",
  path: "/offers",
});

async function OffersContainer() {
  const [categories, faqs, settings] = await Promise.all([
    getOffers(),
    getFaqs("offers"),
    getSettings(),
  ]);

  return (
    <OffersClientPage
      categories={(categories as OfferCategory[]) || []}
      faqs={faqs || []}
      settings={settings}
    />
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={<OffersSkeleton />}>
      <OffersContainer />
    </Suspense>
  );
}
