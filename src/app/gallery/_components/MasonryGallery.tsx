"use client";

import React, { useState } from "react";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { useMountEffect } from "@/hooks/useMountEffect";
import Image from "next/image";
import { motion } from "motion/react";
import type {
  EventGalleryItem as SanityGalleryItem,
  EventProject as SanityEventProject,
} from "../../sanity/types";
import { urlFor } from "../../sanity/image";
import ImageLightbox from "./ImageLightbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextReveal from "@/components/ui/events/TextRevealLine";
import SectionLabel from "../../_shared/SectionLabel";

export const GALLERY_CONTENT = {
  label: "(GALERIE)",
  title: [
    { content: "Momente" },
    { content: "Inrămate", className: "text-(--color-events-text)" },
  ],
  description:
    "O colecție vizuală a celor mai dragi momente pe care am avut onoarea să le capturăm. Explorează povestea prin detalii și emoții.",
};

const ASPECT_RATIOS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[4/5]",
  "aspect-[9/16]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/5]",
];

type GalleryImageItem = SanityGalleryItem & {
  projectTitle: string;
  projectSlug: string;
  year: string;
  id: string; // Unified ID
};

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [PAGE HEADER] Top Content ─────────────────────────────────────────────
  pageHeader: {
    padding: "px-4 md:px-8 mb-12 sm:mb-16 lg:mb-20",
    gap: "gap-4 sm:gap-6",
    label:
      "text-sm font-medium text-(--color-events-muted) uppercase tracking-widest",
    title: {
      fontSize: "text-6xl sm:text-8xl md:text-8xl lg:text-8xl 2xl:text-9xl",
      fontWeight: "font-sans",
      tracking: "tracking-tighter",
      leading: "leading-[0.9]",
    },
    description: {
      fontSize: "text-base sm:text-lg md:text-xl",
      color: "text-(--color-events-muted)",
      lineHeight: "leading-snug",
      maxWidth: "max-w-xl",
      marginTop: "mt-4 sm:mt-6",
    },
  },

  // ── [CONTAINER] Main Wrapper ──────────────────────────────────────────────
  container: {
    padding: "px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8",
    paddingY: "pt-1 pb-16 sm:py-1 md:py-1 lg:py-1 xl:py-1",
  },

  // ── [HEADER] Sticky Year Header ───────────────────────────────────────────
  header: {
    sticky:
      "sticky z-30 flex items-center justify-between bg-(--color-events-bg)/80 backdrop-blur-md border-(--color-events-border) px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-20 -mx-4 sm:-mx-6 md:-mx-8 transition-all duration-500 ease-in-out",
    border: "border-b",
    line: "w-8 sm:w-12 md:w-16 h-px bg-(--color-events-text)",
    title: {
      fontSize: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
      fontWeight: "font-sans",
      tracking: "tracking-tighter",
      color: "text-(--color-events-text)",
      leading: "leading-none",
      textTransform: "uppercase",
    },
    label: {
      fontSize: "text-[10px] sm:text-[11px] md:text-xs",
      textTransform: "uppercase",
      tracking: "tracking-[0.1em]",
      color: "text-(--color-events-muted)",
      display: "hidden sm:block",
    },
    gap: "gap-4 sm:gap-5 md:gap-6",
  },

  // ── [MASONRY] Grid Layout ─────────────────────────────────────────────────
  masonry: {
    columns:
      "columns-2 sm:columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7",
    gap: "gap-3 sm:gap-4 md:gap-5",
    spaceY: "space-y-3 sm:space-y-4 md:space-y-5",
  },

  // ── [ITEM] Gallery Card ───────────────────────────────────────────────────
  item: {
    wrapper:
      "break-inside-avoid relative overflow-hidden bg-(--color-events-border) group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-(--color-events-text)",
    image: {
      transition: "transition-transform duration-700 group-hover:scale-105",
      objectFit: "object-cover",
    },
    overlay: {
      bg: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 lg:p-6",
      tag: "text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 mb-1",
      description:
        "text-white text-[10px] sm:text-xs md:text-sm font-sans tracking-tight leading-tight",
    },
  },
} as const;

const GallerySkeleton = () => (
  <div className={cn("animate-in fade-in flex flex-col duration-500")}>
    {/* Skeleton Header */}
    <div className={cn(THEME.header.sticky, THEME.header.border)}>
      <div className={cn("flex w-full items-center", THEME.header.gap)}>
        <Skeleton className={cn(THEME.header.line)} />
        <Skeleton className="h-8 w-24 sm:w-32" />
      </div>
      <Skeleton className={cn("h-4 w-32", THEME.header.label.display)} />
    </div>

    {/* Skeleton Masonry */}
    <div
      className={cn(
        THEME.masonry.columns,
        THEME.masonry.gap,
        THEME.masonry.spaceY,
      )}
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "w-full break-inside-avoid rounded-none",
            ASPECT_RATIOS[i % ASPECT_RATIOS.length],
          )}
        />
      ))}
    </div>
  </div>
);

interface MasonryGalleryProps {
  items?: SanityGalleryItem[];
  allEvents?: SanityEventProject[];
  showPageHeader?: boolean;
  sectionTitle?: string;
  className?: string;
}

const MasonryGallery = ({
  items: manualItems,
  allEvents,
  showPageHeader = true,
  sectionTitle,
  className,
}: MasonryGalleryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { isVisible: navbarVisible } = useWindowScroll(100);
  const navbarHidden = !navbarVisible;

  useMountEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  });

  // Extract all gallery items from all events and group them by year
  const rawData = manualItems
    ? [{ gallery: manualItems, year: "Recent", title: "", slug: "" }]
    : allEvents || [];

  const groupedItems = rawData.reduce(
    (acc, event) => {
      const year = typeof event.year === "string" ? event.year : "Gallery";
      if (!acc[year]) {
        acc[year] = [];
      }

      const items = (event.gallery || []).map((item: SanityGalleryItem) => {
        const itemKey = "_key" in item ? item._key : Math.random().toString();
        const projectSlug =
          typeof event.slug === "string"
            ? event.slug
            : event.slug?.current || "";

        return {
          ...item,
          projectTitle: event.title || "",
          projectSlug: projectSlug,
          year: year,
          id: itemKey,
        } as GalleryImageItem;
      });
      acc[year].push(...items);
      return acc;
    },
    {} as Record<string, GalleryImageItem[]>,
  );

  const years = Object.keys(groupedItems).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  // Flattened array for lightbox navigation
  const allFlattenedImages = years.flatMap((year) => groupedItems[year]);

  const openLightbox = (image: GalleryImageItem) => {
    const index = allFlattenedImages.findIndex((img) => img.id === image.id);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? allFlattenedImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === allFlattenedImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col transition-all duration-700",
        THEME.container.padding,
        THEME.container.paddingY,
        className,
      )}
    >
      {/* Page Header */}
      {!isLoading && showPageHeader && (
        <div
          className={cn(
            THEME.pageHeader.gap,
            "content-fade-in mb-12 flex flex-col",
          )}
        >
          <SectionLabel label={GALLERY_CONTENT.label} />
          <TextReveal
            as="h1"
            text={GALLERY_CONTENT.title}
            className={cn(
              THEME.pageHeader.title.fontSize,
              THEME.pageHeader.title.fontWeight,
              THEME.pageHeader.title.tracking,
              THEME.pageHeader.title.leading,
              "flex flex-col font-sans text-(--color-events-text) uppercase",
            )}
          />
          <p
            className={cn(
              THEME.pageHeader.description.fontSize,
              THEME.pageHeader.description.color,
              THEME.pageHeader.description.lineHeight,
              THEME.pageHeader.description.maxWidth,
              THEME.pageHeader.description.marginTop,
            )}
          >
            {GALLERY_CONTENT.description}
          </p>
        </div>
      )}

      {/* Specific Section Title (for embedded use) */}
      {!isLoading && !showPageHeader && sectionTitle && (
        <div className="content-fade-in mb-12 flex flex-col gap-4">
          <SectionLabel label="(GALERIE)" />
          <h2 className="font-sans text-4xl tracking-tight text-(--color-events-text) uppercase sm:text-5xl md:text-6xl">
            {sectionTitle}
          </h2>
        </div>
      )}

      {isLoading ? (
        <GallerySkeleton />
      ) : (
        years.map((year) => (
          <div key={year} className={cn("flex flex-col", THEME.header.gap)}>
            {/* Sticky Year Header */}
            {showPageHeader && (
              <div
                style={{
                  top: navbarHidden ? 0 : "var(--events-sticky-attach-offset)",
                }}
                className={cn(
                  THEME.header.sticky,
                  THEME.header.border,
                  navbarHidden ? "top-0" : "top-16 md:top-20",
                )}
              >
                <div className={cn("flex items-center", THEME.header.gap)}>
                  <div className={cn(THEME.header.line)} />
                  <span
                    className={cn(
                      THEME.header.title.fontSize,
                      THEME.header.title.fontWeight,
                      THEME.header.title.tracking,
                      THEME.header.title.color,
                      THEME.header.title.leading,
                      THEME.header.title.textTransform,
                    )}
                  >
                    {year}
                  </span>
                </div>
                <span
                  className={cn(
                    THEME.header.label.fontSize,
                    THEME.header.label.textTransform,
                    THEME.header.label.tracking,
                    THEME.header.label.color,
                    THEME.header.label.display,
                  )}
                >
                  (Arhivă Evenimente)
                </span>
              </div>
            )}

            {/* Masonry Grid */}
            <div
              className={cn(
                THEME.masonry.columns,
                THEME.masonry.gap,
                THEME.masonry.spaceY,
              )}
            >
              {groupedItems[year].map(
                (item: GalleryImageItem, index: number) => {
                  const ratioClass =
                    ASPECT_RATIOS[index % ASPECT_RATIOS.length];
                  const imageUrl =
                    typeof item.image === "string"
                      ? item.image
                      : urlFor(item.image).url();

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
                      onClick={() => openLightbox(item)}
                      className={cn(THEME.item.wrapper, ratioClass)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(item);
                        }
                      }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={imageUrl}
                          alt={item.description}
                          fill
                          className={cn(
                            THEME.item.image.objectFit,
                            THEME.item.image.transition,
                          )}
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 12vw"
                        />
                      </div>

                      {/* Overlay */}
                      <div className={cn(THEME.item.overlay.bg)}>
                        <span className={cn(THEME.item.overlay.tag)}>
                          {item.tag}
                        </span>
                        <h3 className={cn(THEME.item.overlay.description)}>
                          {item.description}
                        </h3>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        ))
      )}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={allFlattenedImages.map((img) => ({
          id: img.id,
          image:
            typeof img.image === "string" ? img.image : urlFor(img.image).url(),
          description: img.description,
          tag: img.tag,
          projectTitle: img.projectTitle,
        }))}
        currentIndex={lightboxIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default MasonryGallery;
