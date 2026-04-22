"use client";

import Image from "next/image";
import Button from "@/components/ui/events/Button";
import SectionLabel from "../../_shared/SectionLabel";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Main Container ──────────────────────────────────────────────
  section: {
    padding: "py-16 sm:py-20 md:py-24 lg:py-32",
    bg: "bg-(--color-events-bg)",
    overflow: "overflow-hidden",
  },
  layout: {
    padding: "px-4 sm:px-8 2xl:px-8",
    maxWidth: "max-w-7xl 2xl:max-w-none",
    center: "mx-auto",
    grid: "grid grid-cols-1 lg:grid-cols-2",
    gap: "gap-12 lg:gap-10 xl:gap-16",
    items: "items-center lg:items-start", // Align top on desktop
  },

  // ── [IMAGE] Left Column ───────────────────────────────────────────────────
  image: {
    wrapper: "relative w-full overflow-hidden block group", // Removed h-full min-h
    aspectRatio: "aspect-square", // 1:1 on ALL screens
    img: "object-cover transition-transform duration-700 group-hover:scale-105",
  },

  // ── [CONTENT] Right Column ────────────────────────────────────────────────
  content: {
    wrapper: "flex flex-col gap-8 md:gap-10 lg:gap-10",
    header: "flex flex-col gap-4 md:gap-6",
    label: {
      fontWeight: "font-normal",
    },
    title: {
      fontSize: "text-[clamp(1.875rem,5vw,3.25rem)]",
      fontWeight: "font-normal", // "font-regular"
      tracking: "tracking-tighter",
      lineHeight: "leading-[1.1]",
      color: "text-(--color-events-text)",
      textTransform: "uppercase",
    },
    description: {
      fontSize: "text-base md:text-lg",
      color: "text-(--color-events-muted)",
      lineHeight: "leading-snug",
      maxWidth: "max-w-xl",
    },
    cta: {
      wrapper: "mt-2 md:mt-4",
      button: cn(
        "border-(--color-events-text)",
        "active:bg-(--color-events-text)",
        "active:[&_span]:!text-(--color-events-bg)",
        "active:[&_svg]:!text-(--color-events-bg)",
      ),
      dot: "bg-(--color-events-text)",
      hoverText: "text-(--color-events-bg)",
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

import { urlFor } from "../../sanity/image";
import type { SanityImage } from "../../sanity/types";

const OffersPreview = ({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: SanityImage | string;
}) => {
  return (
    <section
      className={cn(
        THEME.section.padding,
        THEME.section.bg,
        THEME.section.overflow,
      )}
    >
      <div className={cn(THEME.layout.padding)}>
        <div
          className={cn(
            THEME.layout.maxWidth,
            THEME.layout.center,
            THEME.layout.grid,
            THEME.layout.gap,
            THEME.layout.items,
          )}
        >
          {/* Left: Image Container */}
          <div
            className={cn(
              THEME.image.wrapper,
              THEME.image.aspectRatio,
              THEME.content.header, // Using gap from header for consistency if needed, but wrapper handles it
            )}
          >
            <Image
              src={
                image
                  ? typeof image === "string"
                    ? image
                    : urlFor(image).url()
                  : "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
              }
              alt={title || "Premium Event Setup"}
              fill
              className={cn(THEME.image.img)}
            />
          </div>

          {/* Right: Content */}
          <div className={cn(THEME.content.wrapper)}>
            <div className={cn(THEME.content.header)}>
              <SectionLabel className={cn(THEME.content.label.fontWeight)}>
                (OFERTE)
              </SectionLabel>
              <h2
                className={cn(
                  THEME.content.title.fontSize,
                  THEME.content.title.fontWeight,
                  THEME.content.title.tracking,
                  THEME.content.title.lineHeight,
                  THEME.content.title.color,
                  THEME.content.title.textTransform,
                )}
              >
                {title || "Găsește structura perfectă pentru evenimentul tău."}
              </h2>
            </div>

            <p
              className={cn(
                THEME.content.description.fontSize,
                THEME.content.description.color,
                THEME.content.description.lineHeight,
                THEME.content.description.maxWidth,
              )}
            >
              {description ||
                "De la pachete esențiale la producții de lux, oferim structura ideală pentru a-ți documenta povestea exact așa cum o vizualizezi."}
            </p>

            <div className={cn(THEME.content.cta.wrapper)}>
              <Button
                text="Explorează Pachetele"
                href="/offers"
                className={cn(THEME.content.cta.button)}
                dotClassName={cn(THEME.content.cta.dot)}
                hoverTextClassName={cn(THEME.content.cta.hoverText)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersPreview;
