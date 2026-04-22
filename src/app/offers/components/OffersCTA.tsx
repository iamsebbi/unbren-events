"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const THEME = {
  section: {
    layout: "bg-(--color-events-bg)",
    padding: {
      default: "py-24 px-6",
      md: "md:py-32 md:px-12",
      lg: "lg:py-20",
    },
  },
  container: "flex flex-col items-center mx-auto max-w-screen-xl text-center",
  content: "flex flex-col gap-8",
  title: {
    text: {
      default: "text-[clamp(1.875rem,5vw,3.75rem)]",
      font: "font-medium tracking-tighter uppercase",
      layout: "mx-auto max-w-2xl",
    },
  },
  description: {
    text: {
      layout: "mx-auto max-w-xl",
      typography: "text-base md:text-lg",
      visual: "text-(--color-events-muted)",
    },
  },
  cta: {
    button: {
      wrapper: "pt-4",
      link: {
        layout:
          "inline-flex items-center justify-center min-h-11 min-w-11 px-8 py-3 overflow-hidden lg:px-8 lg:py-3",
        typography: "text-base font-bold tracking-widest uppercase",
        visual: "border transition-all duration-500",
        colors: {
          default:
            "border-(--color-events-text) bg-(--color-events-text) text-(--color-events-bg)",
          hover:
            "hover:bg-(--color-events-bg) hover:text-(--color-events-text)",
        },
        interaction: "transition-all duration-500 group active:scale-[0.985]",
        focus:
          "focus-visible:ring-(--color-events-accent) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none",
      },
    },
  },
} as const;

export default function OffersCTA() {
  return (
    <section
      className={cn(
        THEME.section.layout,
        THEME.section.padding.default,
        THEME.section.padding.md,
        THEME.section.padding.lg,
      )}
    >
      <div className={THEME.container}>
        <div className={THEME.content}>
          <h3
            className={cn(
              THEME.title.text.default,
              THEME.title.text.font,
              THEME.title.text.layout,
            )}
          >
            NU AI GĂSIT CE CĂUTAI?
          </h3>
          <p
            className={cn(
              THEME.description.text.layout,
              THEME.description.text.typography,
              THEME.description.text.visual,
            )}
          >
            Suntem aici să creăm un pachet special adaptat viziunii tale.
            Trimite-ne un mesaj pentru o ofertă personalizată.
          </p>
          <div className={THEME.description.text.layout}>
            <Link
              href="/contact"
              className={cn(
                THEME.cta.button.link.layout,
                THEME.cta.button.link.typography,
                THEME.cta.button.link.visual,
                THEME.cta.button.link.colors.default,
                THEME.cta.button.link.colors.hover,
                THEME.cta.button.link.interaction,
                THEME.cta.button.link.focus,
              )}
            >
              <span className="relative z-10">
                Solicită Consultanță Gratuită
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
