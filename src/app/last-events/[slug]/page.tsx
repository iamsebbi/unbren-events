import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getEventBySlug, getEvents } from "../../sanity/data";
import LastEventSplitSection from "../_components/LastEventSplitSection";
import MasonryGallery from "../../gallery/_components/MasonryGallery";
import LatestEvents from "../../(home)/_components/LatestEvents";
import { EventProject as SanityEventProject } from "../../sanity/types";
import { GenericPageSkeleton } from "../../_shared/skeletons/EventsSkeletons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-generate all event project pages at build time.
 */
export async function generateStaticParams() {
  const events = await getEvents();
  if (!events) return [];

  return events.map((e) => ({
    slug: e.slug.current,
  }));
}

/**
 * Generate dynamic metadata for each event project page from Sanity CMS data.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = (await getEventBySlug(slug)) as SanityEventProject | null;

  if (!event) {
    return buildPageMetadata({
      title: "Eveniment negăsit",
      description: "Pagina solicitată nu a fost găsită.",
      path: `/events/last-events/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${event.title} — ${event.category}`,
    description:
      event.heroQuote ||
      `Descoperă proiectul ${event.title} realizat de UNBREN.`,
    path: `/events/last-events/${slug}`,
  });
}

async function LastEventContainer({ slug }: { slug: string }) {
  const event = (await getEventBySlug(slug)) as SanityEventProject | null;

  if (!event) return notFound();

  const coverImage = event.coverImage;
  const galleryItems = event.gallery || [];

  // Fetch other events for "Related Events" section
  const allEvents = await getEvents();
  const relatedEvents = allEvents
    .filter((e) => e.slug.current !== slug)
    .slice(0, 6);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/events" },
          { label: "Toate Evenimentele", href: "/events/toate-evenimentele" },
          { label: event.title },
        ]}
        className="pt-(--events-navbar-height)"
        hideVisual
      />
      <LastEventSplitSection
        category={event.category}
        title={event.title}
        quote={event.heroQuote}
        image={coverImage}
        author={event.author}
        readTime={event.readTime}
        intro={event.intro}
        approach={event.approach}
        conclusion={event.conclusion}
        reflection={event.reflection}
      />
      {galleryItems && galleryItems.length > 0 && (
        <MasonryGallery
          items={galleryItems}
          showPageHeader={false}
          sectionTitle="Galerie Eveniment"
          className="pt-24 sm:pt-32"
        />
      )}
      {relatedEvents.length > 0 && <LatestEvents events={relatedEvents} />}
    </>
  );
}

export default async function LastEventPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="bg-(--color-events-bg) text-(--color-events-text)">
      <Suspense fallback={<GenericPageSkeleton />}>
        <LastEventContainer slug={slug} />
      </Suspense>
    </main>
  );
}
