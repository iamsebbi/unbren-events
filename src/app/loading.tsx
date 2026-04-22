import { HeroSkeleton } from "./_shared/skeletons/EventsSkeletons";

export default function EventsLoading() {
  return (
    <main className="min-h-screen bg-(--color-events-bg)">
      <HeroSkeleton />
      <div className="px-4 py-20 opacity-20 md:px-12">
        <div className="h-64 w-full animate-pulse rounded-lg bg-(--color-events-border)/30" />
      </div>
    </main>
  );
}
