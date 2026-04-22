"use client";

import React from "react";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventsHeaderProps {
  count: number;
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}

export default function EventsHeader({
  count,
  viewMode,
  onViewChange,
}: EventsHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b border-(--color-events-border) pb-8 lg:flex-row lg:items-end lg:gap-0">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] font-sans tracking-tight uppercase text-(--color-events-text)">
        EVENIMENTE<sup className="ml-1 text-[0.4em] font-medium tracking-normal">({count.toString().padStart(2, "0")})</sup>
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewChange("grid")}
          className={cn(
            "flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-colors",
            viewMode === "grid"
              ? "text-(--color-events-text)"
              : "text-(--color-events-muted) hover:text-(--color-events-text)"
          )}
          aria-label="Grid view"
        >
          <Grid className={cn("h-4 w-4", viewMode === "grid" ? "stroke-2" : "stroke-1")} />
          <span className="hidden sm:inline">Grid view</span>
        </button>

        <div className="h-4 w-px bg-(--color-events-border)" aria-hidden="true" />

        <button
          onClick={() => onViewChange("list")}
          className={cn(
            "flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-colors",
            viewMode === "list"
              ? "text-(--color-events-text)"
              : "text-(--color-events-muted) hover:text-(--color-events-text)"
          )}
          aria-label="List view"
        >
          <List className={cn("h-4 w-4", viewMode === "list" ? "stroke-2" : "stroke-1")} />
          <span className="hidden sm:inline">List view</span>
        </button>
      </div>
    </div>
  );
}
