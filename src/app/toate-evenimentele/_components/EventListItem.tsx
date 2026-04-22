"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { urlFor } from "../../sanity/image";
import type { EventProject } from "../../sanity/types";

interface EventListItemProps {
  event: EventProject;
  index: number;
}

export default function EventListItem({ event, index }: EventListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = typeof event.coverImage === "string" 
    ? event.coverImage 
    : urlFor(event.coverImage).url();

  return (
    <Link
      href={`/events/last-events/${event.slug.current}`}
      className="group relative flex flex-col border-b border-(--color-events-border) py-6 transition-colors hover:bg-(--color-events-text)/2 md:grid md:grid-cols-12 md:items-center md:gap-4 md:py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index (Desktop only) */}
      <span className="hidden text-[10px] font-medium text-(--color-events-muted) md:col-span-1 md:block">
        {index.toString().padStart(2, "0")}
      </span>

      {/* Title & Preview Image (Mobile Thumb) */}
      <div className="flex items-center gap-4 md:col-span-7">
        <div className="relative h-12 w-16 shrink-0 overflow-hidden md:hidden">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <h3 className="text-xl font-medium tracking-tight text-(--color-events-text) md:text-3xl lg:text-4xl">
          {event.title}
        </h3>
      </div>

      {/* Category */}
      <div className="mt-1 flex items-center justify-between gap-2 md:col-span-3 md:mt-0">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-(--color-events-muted) md:text-sm">
          {event.category}
        </span>
        <span className="text-xs font-medium text-(--color-events-muted) md:hidden">
          {event.year}
        </span>
      </div>

      {/* Year (Desktop) */}
      <span className="hidden text-right text-lg font-medium tabular-nums text-(--color-events-text) md:col-span-1 md:block lg:text-xl">
        {event.year}
      </span>

      {/* Desktop Hover Thumbnail Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10, rotate: 2 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none fixed right-[15%] top-1/2 z-50 hidden -translate-y-1/2 md:block"
          >
            <div className="relative aspect-4/5 w-64 overflow-hidden border border-(--color-events-border)/20 shadow-2xl">
              <Image
                src={imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
