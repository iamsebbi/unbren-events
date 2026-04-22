import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import MasonryGallery from "./_components/MasonryGallery";
import { getEvents } from "../sanity/data";
import { GenericPageSkeleton } from "../_shared/skeletons/EventsSkeletons";

export const metadata: Metadata = buildPageMetadata({
  title: "Galerie Foto & Video — UNBREN.",
  description:
    "Explorează galeria UNBREN.: portofoliu de fotografii și videoclipuri de la nunți, botezuri și evenimente speciale.",
  path: "/gallery",
});

async function GalleryContainer() {
  const allEvents = await getEvents();
  return <MasonryGallery allEvents={allEvents} />;
}

export default function GalleryPage() {
  return (
    <main
      style={{ paddingTop: "var(--events-navbar-height)" }}
      className="min-h-screen bg-(--color-events-bg) pt-16 md:pt-20"
    >
      <Suspense fallback={<GenericPageSkeleton />}>
        <GalleryContainer />
      </Suspense>
    </main>
  );
}
