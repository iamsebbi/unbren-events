"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { urlFor } from "../../sanity/image";
import type { EventProject } from "../../sanity/types";

interface EventGridItemProps {
  event: EventProject;
  className?: string;
}

export default function EventGridItem({ event, className }: EventGridItemProps) {
  const imageUrl = typeof event.coverImage === "string" 
    ? event.coverImage 
    : urlFor(event.coverImage).url();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn("group flex flex-col", className)}
    >
      <Link href={`/events/last-events/${event.slug.current}`} className="block">
        {/* Image Container with aspect ratio control */}
        <div className="relative aspect-4/5 overflow-hidden bg-(--color-events-border)/10 sm:aspect-3/4 lg:aspect-4/5">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Metadata section aligned at extremities */}
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 overflow-hidden border-t border-(--color-events-border)/30 pt-3">
          <h3 className="text-lg font-medium leading-tight text-(--color-events-text) md:text-xl lg:text-lg xl:text-xl">
            {event.title}
          </h3>
          <span className="text-sm font-normal tracking-wide text-(--color-events-muted) md:text-base lg:text-sm">
            {event.year}
          </span>
        </div>
        
        <div className="mt-1">
          <span className="text-[10px] font-medium uppercase tracking-widest text-(--color-events-muted)/70">
            {event.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
