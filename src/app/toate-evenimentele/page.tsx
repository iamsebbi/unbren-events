import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAllEventProjects } from "../sanity/queries";
import { buildPageMetadata } from "@/lib/seo";
import EventsViewManager from "./_components/EventsViewManager";
import { EventsPageSkeleton } from "./_components/EventsSkeleton";
import AboutReveal from "../contact/components/AboutReveal";

/**
 * Metadata for the Evenimente page.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Toate Evenimentele",
  description: "Explorează portofoliul complet de evenimente și proiecte creative realizate de UNBREN.",
  path: "/toate-evenimentele",
});

/**
 * Data fetching container for the Evenimente page.
 */
async function EventsContainer() {
  const events = await getAllEventProjects().catch(() => []);
  return <EventsViewManager events={events || []} />;
}

/**
 * Main Evenimente page entry point.
 * Applied local top padding (pt-32 to pt-48) to clear the fixed Navbar.
 */
export default function EvenimentePage() {
  return (
    <div className="bg-(--color-events-bg) relative min-h-screen">
      <div className="mx-auto w-full max-w-400 px-4 pt-32 pb-24 md:px-8 lg:px-12 lg:pt-48">
        <Suspense fallback={<EventsPageSkeleton />}>
          <EventsContainer />
        </Suspense>
      </div>
      <AboutReveal />
    </div>
  );
}
