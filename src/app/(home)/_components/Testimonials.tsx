"use client";

import React, { useState } from "react";
import SectionLabel from "../../_shared/SectionLabel";
import SliderControls from "@/components/ui/events/SliderControls";
import ImageReveal from "@/components/ui/events/ImageReveal";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    content:
      "Colaborarea cu UNBREN. a fost peste așteptările noastre. Au o viziune artistică rară și au reușit să capteze esența evenimentului nostru fără ca noi să simțim prezența camerei.",
    author: "Elena & Andrei",
    category: "Nuntă Premium",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    content:
      "Profesionalism desăvârșit pentru evenimentele noastre corporate. Materialele livrate au fost exact ce aveam nevoie pentru campaniile de marketing post-eveniment.",
    author: "Mihai Dragomir",
    category: "BDR Associates",
    image:
      "https://images.unsplash.com/photo-1612599542558-f3022089fb38?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content:
      "O echipă relaxată care știe exact ce face. Fotografiile de la botezul fetiței noastre sunt absolut magice, pline de emoție și lumină naturală.",
    author: "Simona Popescu",
    category: "Botez",
    image:
      "https://images.unsplash.com/photo-1714972383570-44ddc9738355?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Main Container ──────────────────────────────────────────────
  section: {
    padding: "py-16 sm:py-20 md:py-24 lg:py-16 xl:py-20 2xl:py-24",
    bg: "bg-(--color-events-bg)",
    overflow: "overflow-hidden",
  },
  layout: {
    padding: "px-4 sm:px-8 2xl:px-8",
    maxWidth: "max-w-7xl 2xl:max-w-none", // Consistent with other full-width sections
    center: "mx-auto",
    grid: "grid grid-cols-1 lg:grid-cols-2",
    gap: "gap-6 lg:gap-12 xl:gap-16 2xl:gap-20",
    items: "items-stretch", // Changed from items-start to match column heights
  },

  // ── [CONTENT] Left Column ─────────────────────────────────────────────────
  content: {
    wrapper: "flex flex-col order-2 lg:order-1 h-full font-sans", // Removed fixed gap
    inner: "flex flex-col flex-1",
    label: {
      text: "(TESTIMONIALE)",
      className: "mb-8",
      wrapper: "mb-6 lg:mb-0",
    },
    quote: {
      wrapper:
        "flex-1 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] lg:min-h-0 py-8 lg:py-0", // Stable container for quote
      text: "text-[clamp(1.5rem,3.8vw,2.5rem)] font-normal tracking-tight leading-[1.1] text-(--color-events-text) italic",
    },
    author: {
      wrapper: "flex flex-col gap-1 items-start", // Changed from items-end to items-start
      name: "text-lg sm:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tight text-(--color-events-text) uppercase text-left",
      category:
        "text-xs sm:text-xs lg:text-xs xl:text-sm 2xl:text-base uppercase tracking-widest text-(--color-events-muted) text-left",
    },
  },

  // ── [IMAGE] Right Column ──────────────────────────────────────────────────
  image: {
    wrapper: "order-1 lg:order-2",
    aspectRatio: "aspect-square lg:aspect-square",
    className: "bg-(--color-events-border)",
  },

  // ── [CONTROLS] Navigation ─────────────────────────────────────────────────
  controls: {
    wrapper: "mt-0 lg:mt-4 flex justify-end lg:justify-start", // Reduced margin top for mobile row
  },
} as const;

import type { Testimonial as SanityTestimonial } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface DisplayTestimonial {
  id: string | number;
  content: string;
  author: string;
  category: string;
  image: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface TestimonialsProps {
  items?: SanityTestimonial[];
}

const Testimonials = ({ items }: TestimonialsProps) => {
  const displayItems: DisplayTestimonial[] =
    items && items.length > 0
      ? items.map((t) => ({
          id: t._id,
          content: t.content,
          author: t.author,
          category: t.category,
          image: urlFor(t.image).url(),
        }))
      : TESTIMONIALS.map((t) => ({ ...t, id: t.id }));

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % displayItems.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  return (
    <section
      className={cn(
        THEME.section.padding,
        THEME.section.bg,
        THEME.section.overflow,
      )}
    >
      <div
        className={cn(
          THEME.layout.padding,
          THEME.layout.maxWidth,
          THEME.layout.center,
        )}
      >
        {/* Mobile Label */}
        <SectionLabel
          className={cn(
            THEME.content.label.className,
            "lg:hidden",
            THEME.content.label.wrapper,
          )}
        >
          {THEME.content.label.text}
        </SectionLabel>

        <div
          className={cn(
            THEME.layout.grid,
            THEME.layout.gap,
            THEME.layout.items,
          )}
        >
          {/* Left: Content */}
          <div className={cn(THEME.content.wrapper)}>
            <div className={cn(THEME.content.inner)}>
              {/* Desktop Label */}
              <SectionLabel
                className={cn(THEME.content.label.className, "hidden lg:block")}
              >
                {THEME.content.label.text}
              </SectionLabel>

              <div className="grid flex-1 grid-cols-1 grid-rows-1">
                {displayItems.map((testimonial, i) => (
                  <div
                    key={testimonial.id}
                    className={`col-start-1 row-start-1 flex flex-col justify-between transition-opacity duration-500 ease-in-out ${
                      i === index
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0"
                    }`}
                  >
                    <div className={cn(THEME.content.quote.wrapper)}>
                      <h2 className={cn(THEME.content.quote.text)}>
                        &ldquo;{testimonial.content}&rdquo;
                      </h2>
                    </div>

                    <div className="flex flex-row items-end justify-between pt-8 lg:flex-col lg:items-start lg:gap-8 lg:pt-0">
                      <div className={cn(THEME.content.author.wrapper)}>
                        <span className={cn(THEME.content.author.name)}>
                          {testimonial.author}
                        </span>
                        <span className={cn(THEME.content.author.category)}>
                          {testimonial.category}
                        </span>
                      </div>

                      <SliderControls
                        onPrev={prevSlide}
                        onNext={nextSlide}
                        className={cn(THEME.controls.wrapper, "lg:hidden")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SliderControls
              onPrev={prevSlide}
              onNext={nextSlide}
              className={cn(THEME.controls.wrapper, "hidden lg:flex")}
            />
          </div>

          {/* Right: Image Container */}
          <div className={cn(THEME.image.wrapper)}>
            <ImageReveal
              src={displayItems[index].image}
              alt={displayItems[index].author}
              triggerKey={index}
              aspectRatio={THEME.image.aspectRatio}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(THEME.image.className)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
