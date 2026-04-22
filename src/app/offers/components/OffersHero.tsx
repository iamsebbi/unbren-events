"use client";

import TextReveal from "@/components/ui/events/TextRevealLine";
import { cn } from "@/lib/utils";

const THEME = {
  section: {
    layout: "border-b border-[var(--color-events-border)]",
    padding: {
      default: "pt-20 pb-12 px-4",
      md: "md:px-8",
      lg: "lg:pt-24 lg:pb-10 lg:px-8",
    },
  },
  title: {
    wrapper: "grid grid-cols-1 gap-1 items-end lg:grid-cols-2",
    text: {
      default: "text-[clamp(2.25rem,8vw,4.5rem)]",
      font: "font-medium leading-[0.85] tracking-tighter uppercase",
      margin: "mb-4",
    },
  },
  description: {
    text: {
      layout: "max-w-xl pb-2",
      typography: "text-base leading-snug md:text-lg",
      visual: "text-(--color-events-muted)",
    },
  },
} as const;

export default function OffersHero() {
  return (
    <section
      className={cn(
        THEME.section.layout,
        THEME.section.padding.default,
        THEME.section.padding.md,
        THEME.section.padding.lg,
      )}
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className={THEME.title.wrapper}>
          <div>
            <TextReveal
              text="Pachete Servicii"
              className={cn(
                THEME.title.text.default,
                THEME.title.text.font,
                THEME.title.text.margin,
              )}
            />
          </div>
          <p
            className={cn(
              THEME.description.text.layout,
              THEME.description.text.typography,
              THEME.description.text.visual,
            )}
          >
            Structuri de preț create pentru a oferi claritate și valoare. Toate
            pachetele pot fi personalizate în funcție de cerințele tale
            specifice.
          </p>
        </div>
      </div>
    </section>
  );
}
