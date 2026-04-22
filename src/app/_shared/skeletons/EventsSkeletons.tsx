"use client";

import { Skeleton } from "@/components/ui/skeleton";

// ── [HERO SKELETON] ──────────────────────────────────────────────────────────
export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[80vh] flex-col justify-center px-4 pt-20 md:px-12">
      <div className="max-w-4xl">
        <Skeleton className="mb-4 h-16 w-[80%] md:h-24" />
        <Skeleton className="mb-8 h-16 w-[60%] md:h-24" />
        <Skeleton className="mb-12 h-6 w-64" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full border border-(--color-events-border)" />
        </div>
      </div>
    </div>
  );
}

// ── [METRICS SKELETON] ────────────────────────────────────────────────────────
export function MetricsSkeleton() {
  return (
    <div className="px-4 py-24 md:px-12">
      <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-12 w-32 md:h-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── [LATEST EVENTS SKELETON] ──────────────────────────────────────────────────
export function LatestEventsSkeleton() {
  return (
    <div className="flex flex-col gap-10 overflow-hidden py-24">
      <div className="flex items-end justify-between px-4 md:px-12">
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <Skeleton className="h-12 w-[60%] md:h-16" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
        <div className="hidden gap-3 lg:flex">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
      </div>
      <div className="flex gap-8 overflow-hidden px-4 md:px-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex w-75 shrink-0 flex-col gap-4 md:w-100">
            <Skeleton className="aspect-3/4 w-full rounded-none" />
            <div className="flex items-center justify-between px-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── [SERVICES ACCORDION SKELETON] ──────────────────────────────────────────────
export function ServicesAccordionSkeleton() {
  return (
    <div className="flex flex-col gap-1 px-4 py-24 md:px-12">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-(--color-events-border)/30 py-8"
        >
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-64 md:h-12" />
            <div className="flex gap-4">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ── [TESTIMONIALS SKELETON] ───────────────────────────────────────────────────
export function TestimonialsSkeleton() {
  return (
    <div className="bg-(--color-events-border)/10 px-4 py-24 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full md:h-20" />
        <Skeleton className="h-12 w-[80%] md:h-20" />
        <div className="mt-8 flex flex-col items-center gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// ── [OFFERS SKELETON] ────────────────────────────────────────────────────────
export function OffersSkeleton() {
  return (
    <div className="min-h-screen bg-(--color-events-bg)">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center gap-6 px-4 py-24 text-center md:px-12">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full max-w-3xl md:h-24" />
        <Skeleton className="h-6 w-full max-w-xl" />
      </div>

      {/* Nav Skeleton */}
      <div className="sticky top-20 z-40 mb-20 border-y border-(--color-events-border)/30 bg-(--color-events-bg)/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-440 justify-center gap-8 px-4 md:px-12">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="mx-auto flex max-w-440 flex-col gap-24 px-4 py-20 md:px-12">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="aspect-4/5 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── [GENERIC PAGE SKELETON] ──────────────────────────────────────────────────
export function GenericPageSkeleton() {
  return (
    <div className="min-h-screen bg-(--color-events-bg) px-4 pt-32 md:px-12">
      <div className="mx-auto flex max-w-440 flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-16 w-[70%] md:h-24" />
          <Skeleton className="h-6 w-[40%]" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
