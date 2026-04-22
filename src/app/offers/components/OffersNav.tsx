"use client";

import { cn } from "@/lib/utils";

const THEME = {
  wrapper:
    "sticky z-30 border-b border-(--color-events-border) bg-(--color-events-bg)/80 backdrop-blur-md transition-all duration-500 ease-in-out",
  container: "mx-auto max-w-screen-2xl px-0 py-2 md:px-8 md:py-2",
  chips: {
    wrapper:
      "flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide px-4 md:flex-wrap md:justify-center md:px-0 md:gap-4",
    item: {
      layout: "flex items-center justify-center h-9 shrink-0 px-6 md:px-8",
      typography:
        "whitespace-nowrap text-sm font-medium tracking-tight leading-none md:text-base",
      visual:
        "rounded-none border-l border-(--color-events-border) first:border-l-0",
      interaction: "transition-all duration-300 active:scale-[0.985]",
      focus:
        "focus-visible:ring-(--color-events-accent) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none",
    },
    active: "bg-transparent text-(--color-events-text) font-bold",
    inactive:
      "bg-transparent text-(--color-events-muted) hover:text-(--color-events-text)",
  },
} as const;

interface OffersNavProps {
  categories: { id: string; title: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  navbarHidden: boolean;
  categoryBarHidden: boolean;
}

export default function OffersNav({
  categories,
  activeTab,
  setActiveTab,
  navbarHidden,
  categoryBarHidden,
}: OffersNavProps) {
  return (
    <div
      style={{ top: navbarHidden ? 0 : "var(--events-sticky-attach-offset)" }}
      className={cn(
        THEME.wrapper,
        navbarHidden ? "top-0" : "top-16 md:top-20",
        "transform-gpu",
        categoryBarHidden
          ? "pointer-events-none -translate-y-full"
          : "translate-y-0",
      )}
    >
      <div className={THEME.container}>
        <nav className={THEME.chips.wrapper}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              aria-pressed={activeTab === cat.id}
              className={cn(
                THEME.chips.item.layout,
                THEME.chips.item.typography,
                THEME.chips.item.visual,
                THEME.chips.item.interaction,
                THEME.chips.item.focus,
                activeTab === cat.id
                  ? THEME.chips.active
                  : THEME.chips.inactive,
              )}
            >
              {cat.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
