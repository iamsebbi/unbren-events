"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SliderControls from "@/components/ui/events/SliderControls";
import { cn } from "@/lib/utils";

import type { EventProject as SanityEventProject } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Main Container ──────────────────────────────────────────────
  section: {
    padding: "py-16 sm:py-20 md:py-24 lg:py-16 xl:py-20 2xl:py-24",
    gap: "gap-10 sm:gap-12 md:gap-14 lg:gap-8 xl:gap-10 2xl:gap-12",
    bg: "bg-(--color-events-bg)",
    overflow: "overflow-hidden",
  },

  // ── [HEADER] Section Header ───────────────────────────────────────────────
  header: {
    padding: "px-4 sm:px-8 md:px-8",
    layout:
      "flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0",
  },

  // ── [TITLE] typography ────────────────────────────────────────────────────
  title: {
    wrapper: "flex flex-col gap-4 max-w-2xl",
    text: "text-[clamp(2.25rem,6vw,4rem)] font-sans tracking-tight leading-[0.9] text-(--color-events-text) uppercase",
    subtitle:
      "text-base sm:text-lg md:text-xl lg:text-sm xl:text-base 2xl:text-lg text-(--color-events-muted) max-w-xl leading-snug",
  },

  // ── [CONTROLS] Slider Navigation ──────────────────────────────────────────
  sliderControls: {
    wrapper: "mb-2 hidden lg:flex",
  },

  // ── [CAROUSEL] Horizontal Scroll Container ────────────────────────────────
  carousel: {
    layout:
      "flex gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-6 2xl:gap-8 snap-x snap-mandatory",
    padding:
      "scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-8 lg:scroll-pl-8 xl:scroll-pl-8 2xl:scroll-pl-8",
    interaction:
      "cursor-grab active:cursor-grabbing overflow-x-auto no-scrollbar",
  },

  // ── [CARD] Event Item ─────────────────────────────────────────────────────
  card: {
    wrapper:
      "group relative block w-[280px] sm:w-[320px] md:w-[400px] lg:w-[280px] xl:w-[320px] 2xl:w-[380px] shrink-0 snap-start first:ml-4 sm:first:ml-6 md:first:ml-8 lg:first:ml-8 xl:first:ml-8 2xl:first:ml-8 last:mr-4 sm:last:mr-6 md:last:mr-8 lg:last:mr-8 xl:last:mr-8 2xl:last:mr-8",
    image: {
      aspect: "relative aspect-[3/4] overflow-hidden bg-black",
      margin: "mb-0.5 sm:mb-1 md:mb-1 lg:mb-1",
      img: "object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out",
    },
    content: {
      layout: "flex justify-between items-center",
      title: "text-base md:text-lg text-(--color-events-muted) max-w-[70%]",
      metaWrapper: "relative h-11 overflow-hidden w-[84px] text-right",
      meta: "flex h-11 items-center justify-end text-base text-(--color-events-muted) group-hover:block",
      cta: "flex h-11 min-w-[44px] items-center justify-end gap-1 text-base font-medium text-(--color-events-accent)",
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────────────────────

const revealVariants = {
  initial: { y: 0 },
  hover: { y: "-2.75rem" },
};

const revealTransition = { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const };

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

interface EventCardProps {
  event: SanityEventProject;
}

const EventCard = ({ event }: EventCardProps) => {
  const imageUrl =
    typeof event.coverImage === "string"
      ? event.coverImage
      : urlFor(event.coverImage).url();
  const slug = typeof event.slug === "string" ? event.slug : event.slug.current;

  return (
    <Link
      href={`/events/last-events/${slug}`}
      className={cn(
        THEME.card.wrapper,
        "focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none",
      )}
    >
      <motion.div initial="initial" whileHover="hover">
        {/* Image */}
        <div className={cn(THEME.card.image.aspect, THEME.card.image.margin)}>
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            loading="lazy"
            className={THEME.card.image.img}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Details */}
        <div className={THEME.card.content.layout}>
          <span className={THEME.card.content.title}>{event.title}</span>

          {/* Reveal Animation */}
          <div className={THEME.card.content.metaWrapper}>
            <motion.div
              variants={revealVariants}
              transition={revealTransition}
              className="flex flex-col items-end"
            >
              <span className={THEME.card.content.meta}>{event.year}</span>
              <span className={THEME.card.content.cta}>
                Vezi <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

interface LatestEventsProps {
  events: SanityEventProject[];
  title?: string;
  subtitle?: string;
}

const LatestEvents = ({
  events = [],
  title = "Ultimele Evenimente",
  subtitle = "Fiecare eveniment este o poveste unică, un ansamblu de momente autentice și emoții pure pe care le transformăm în amintiri eterne.",
}: LatestEventsProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const offset = direction === "left" ? -400 : 400;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section
      className={cn(
        THEME.section.padding,
        THEME.section.gap,
        THEME.section.overflow,
        THEME.section.bg,
        "flex flex-col",
      )}
    >
      {/* Header */}
      <div className={cn(THEME.header.padding, THEME.header.layout, "w-full")}>
        <div className={THEME.title.wrapper}>
          <h2 className={THEME.title.text}>
            <span className="block">{title.split(" ")[0]}</span>
            <span className="block">{title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className={THEME.title.subtitle}>{subtitle}</p>
        </div>

        <SliderControls
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
          className={THEME.sliderControls.wrapper}
        />
      </div>

      {/* Carousel */}
      <motion.div
        ref={carouselRef}
        className={cn(
          THEME.carousel.interaction,
          THEME.carousel.layout,
          THEME.carousel.padding,
        )}
        whileTap={{ cursor: "grabbing" }}
      >
        {events.map((event, idx: number) => (
          <EventCard key={event._id || idx} event={event} />
        ))}
      </motion.div>
    </section>
  );
};

export default LatestEvents;
