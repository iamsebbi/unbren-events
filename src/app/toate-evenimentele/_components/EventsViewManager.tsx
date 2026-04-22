"use client";

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import EventsHeader from "./EventsHeader";
import EventGridItem from "./EventGridItem";
import EventListItem from "./EventListItem";
import type { EventProject } from "../../sanity/types";

interface EventsViewManagerProps {
  events: EventProject[];
}

export default function EventsViewManager({ events }: EventsViewManagerProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <EventsHeader
        count={events.length}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <div
            key="grid"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-3 lg:gap-14 xl:grid-cols-4 xl:gap-8"
          >
            {events.map((event, index) => (
              <EventGridItem
                key={event._id}
                event={event}
                // Every 5th element takes 2 columns for visual rhythm
                className={index % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              />
            ))}
          </div>
        ) : (
          <div
            key="list"
            className="flex flex-col border-t border-(--color-events-border)"
          >
            {/* Table Header */}
            <div className="hidden grid-cols-12 gap-4 py-4 text-[10px] font-medium tracking-[0.2em] text-(--color-events-muted) uppercase md:grid border-b border-(--color-events-border)/30">
              <div className="col-span-1">(No.)</div>
              <div className="col-span-7">(Project)</div>
              <div className="col-span-3">(Category)</div>
              <div className="col-span-1 text-right">(Year)</div>
            </div>

            {events.map((event, index) => (
              <EventListItem key={event._id} event={event} index={index + 1} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
