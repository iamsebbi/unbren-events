import React from "react";

export function EventsPageSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-12 sm:gap-16">
      {/* Header Skeleton */}
      <div className="flex flex-col justify-between gap-6 border-b border-(--color-events-border)/20 pb-8 lg:flex-row lg:items-end">
        <div className="h-16 w-64 bg-(--color-events-border)/10 lg:h-24" />
        <div className="h-4 w-32 bg-(--color-events-border)/10" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={i % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
            <div className="aspect-4/5 bg-(--color-events-border)/5" />
            <div className="mt-4 flex justify-between">
              <div className="h-6 w-1/2 bg-(--color-events-border)/5" />
              <div className="h-6 w-12 bg-(--color-events-border)/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
