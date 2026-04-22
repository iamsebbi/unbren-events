import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./_components/HeroSection";
import AboutUsPreview from "./_components/AboutUsPreview";
import Metrics from "../_shared/Metrics";
import ServiceExplore from "./_components/ServiceExplore";
import Process, {
  HOME_PROCESS_STEPS,
  HOME_PROCESS_CONTENT,
} from "../_shared/Process";
import OffersPreview from "./_components/OffersPreview";

const ServicesAccordion = dynamic(
  () => import("./_components/ServicesAccordion"),
  {
    ssr: true,
  },
);
const LatestEvents = dynamic(() => import("./_components/LatestEvents"), {
  ssr: true,
});
const Testimonials = dynamic(() => import("./_components/Testimonials"), {
  ssr: true,
});
const AboutReveal = dynamic(() => import("../contact/components/AboutReveal"), {
  ssr: true,
});

import {
  getSettings,
  getStats,
  getTestimonials,
  getServicesData,
  getAboutData,
  getEvents,
} from "../sanity/data";

import {
  HeroSkeleton,
  MetricsSkeleton,
  LatestEventsSkeleton,
  ServicesAccordionSkeleton,
  TestimonialsSkeleton,
} from "../_shared/skeletons/EventsSkeletons";

export const metadata: Metadata = buildPageMetadata({
  title: "UNBREN. — Foto & Video Evenimente",
  description:
    "Servicii profesionale de foto și video pentru nunți, botezuri și evenimente corporate. Capturăm emoții și livrăm amintiri prin UNBREN.",
  path: "/",
});

// ── [WRAPPERS FOR STREAMING] ────────────────────────────────────────────────

async function HeroSectionContainer() {
  const settings = await getSettings();
  return <HeroSection settings={settings} />;
}

async function MetricsContainer() {
  const stats = await getStats();
  return (
    <Metrics
      items={stats.items}
      label={stats.label}
      title={stats.title}
      subtitle={stats.subtitle}
      theme="light"
    />
  );
}

async function ServicesAccordionContainer() {
  const services = await getServicesData();
  // Filter for accordion visibility
  const accordionItems = services?.filter((s) => s.showInAccordion !== false);
  return <ServicesAccordion items={accordionItems || undefined} />;
}

async function TestimonialsContainer() {
  const testimonials = await getTestimonials();
  return <Testimonials items={testimonials || undefined} />;
}

async function ContentSectionContainer() {
  const [aboutData, services] = await Promise.all([
    getAboutData(),
    getServicesData(),
  ]);

  // Filter for featured services
  const featured = services?.filter((s) => s.featured).slice(0, 3) || [];

  // Fallback to first 3 if none are marked featured (to avoid empty section)
  const serviceExploreItems =
    featured.length > 0 ? featured : services?.slice(0, 3);

  return (
    <>
      <AboutUsPreview description={aboutData?.informationBody || undefined} />
      <ServiceExplore items={serviceExploreItems || undefined} />
    </>
  );
}

async function OffersPreviewContainer() {
  const aboutData = await getAboutData();

  return (
    <OffersPreview
      title={
        aboutData?.informationLabel === "(ABOUT)"
          ? undefined
          : aboutData?.informationLabel
      }
      description={aboutData?.informationBody}
      image={aboutData?.heroImage}
    />
  );
}

async function LatestEventsContainer() {
  const events = await getEvents();
  return <LatestEvents events={events || undefined} />;
}

// ── [MAIN PAGE] ─────────────────────────────────────────────────────────────

export default function EventsPage() {
  return (
    <main className="bg-(--color-events-bg)">
      {/* Top Sections - Lifts up to reveal About section */}
      <div className="relative z-10 bg-(--color-events-bg)">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSectionContainer />
        </Suspense>

        <Suspense
          fallback={
            <div className="mx-12 h-40 animate-pulse rounded-lg bg-(--color-events-border)/10" />
          }
        >
          <ContentSectionContainer />
        </Suspense>

        <Suspense fallback={<MetricsSkeleton />}>
          <MetricsContainer />
        </Suspense>

        <Suspense fallback={<ServicesAccordionSkeleton />}>
          <ServicesAccordionContainer />
        </Suspense>

        <Process
          items={HOME_PROCESS_STEPS}
          {...HOME_PROCESS_CONTENT}
          decorator="icon"
        />

        <Suspense
          fallback={
            <div className="mx-12 h-40 animate-pulse rounded-lg bg-(--color-events-border)/10" />
          }
        >
          <OffersPreviewContainer />
        </Suspense>

        <Suspense fallback={<LatestEventsSkeleton />}>
          <LatestEventsContainer />
        </Suspense>

        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsContainer />
        </Suspense>

        <div className="h-24 md:h-32" />
      </div>

      {/* Revealed sticky section */}
      <div className="sticky bottom-0 z-0 h-dvh pb-[env(safe-area-inset-bottom)]">
        <AboutReveal />
      </div>
    </main>
  );
}
