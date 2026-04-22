"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface MetricItem {
  value: string;
  suffix?: string;
  label: string;
}

interface MetricsProps {
  items: MetricItem[];
  label?: string;
  title?: string;
  subtitle?: string;
  theme?: "light" | "minimal";
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Toate atributele de design centralizate
// Modifică valorile de aici pentru a schimba rapid designul întregii secțiuni.
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Container principal ─────────────────────────────────────────
  section: {
    padding: "py-24 px-4 sm:px-8",
    light:
      "bg-(--color-events-bg) text-(--color-events-text) border-y border-(--color-events-border)",
    minimal:
      "bg-transparent text-(--color-events-text) border-y border-(--color-events-border)",
  },

  // ── [LAYOUT] Inner container ──────────────────────────────────────────────
  layout: {
    maxWidth: "max-w-7xl 2xl:max-w-none",
    center: "mx-auto",
  },

  // ── [LABEL] Etichetă secțiune (ex: "BY THE NUMBERS") ─────────────────────
  label: {
    fontSize: "text-sm md:text-base",
    fontWeight: "font-normal",
    textTransform: "uppercase",
    tracking: "tracking-[0.1em]",
    marginBottom: "mb-4",
    color: "text-(--color-events-muted)",
  },

  // ── [TITLE] Headline secțiune ─────────────────────────────────────────────
  title: {
    fontSize: "text-[clamp(2rem,6vw,4.5rem)]",
    fontWeight: "font-medium",
    tracking: "tracking-tighter",
    textTransform: "uppercase",
    marginBottom: "mb-4",
  },

  // ── [SUBTITLE] Sub-headline secțiune ──────────────────────────────────────
  subtitle: {
    fontSize: "text-base md:text-lg",
    color: "text-(--color-events-muted)",
    maxWidth: "max-w-xl",
    lineHeight: "leading-snug",
    marginBottom: "mb-12 md:mb-16",
  },

  // ── [GRID] Grila de items ─────────────────────────────────────────────────
  grid: {
    columns: "grid-cols-1 lg:grid-cols-3",
    gap: "gap-8 md:gap-16",
  },

  // ── [ANIMATION] Animație pe fiecare item ──────────────────────────────────
  animation: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    duration: 0.6,
    staggerDelay: 0.1,
  },

  // ── [VALUE] Valoarea numerică mare ────────────────────────────────────────
  value: {
    fontSize: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    fontWeight: "font-medium",
    tracking: "tracking-tighter",
  },

  // ── [SUFFIX] Sufixul de sub valoare (ex: "Ani", "Pasiune") ───────────────
  suffix: {
    fontSize: "text-base md:text-sm lg:text-base",
    fontWeight: "font-medium",
    textTransform: "uppercase",
    tracking: "tracking-[0.2em]",
    color: "text-(--color-events-accent)",
  },

  // ── [ITEM_LABEL] Eticheta de sub valoare (ex: "Experiență în domeniu") ───
  itemLabel: {
    fontSize: "text-base md:text-sm lg:text-base",
    fontWeight: "font-semibold",
    textTransform: "uppercase",
    tracking: "tracking-widest",
    color: "text-(--color-events-muted)",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints (Tailwind v4 defaults):
//   sm: 640px  │  md: 768px  │  lg: 1024px  │  xl: 1280px  │  2xl: 1536px
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Metrics = ({
  items,
  label,
  title,
  subtitle,
  theme = "light",
  className,
}: MetricsProps) => {
  return (
    <section
      className={cn(
        "w-full",
        THEME.section.padding,
        THEME.section[theme],
        className,
      )}
    >
      <div className={cn(THEME.layout.maxWidth, THEME.layout.center)}>
        {/* ── [LABEL] ── */}
        {label && (
          <span
            className={cn(
              THEME.label.fontSize,
              THEME.label.fontWeight,
              THEME.label.textTransform,
              THEME.label.tracking,
              THEME.label.color,
              "block",
              THEME.label.marginBottom,
            )}
          >
            {label}
          </span>
        )}

        {/* ── [TITLE] ── */}
        {title && (
          <h2
            className={cn(
              THEME.title.fontSize,
              THEME.title.fontWeight,
              THEME.title.tracking,
              THEME.title.textTransform,
              THEME.title.marginBottom,
            )}
          >
            {title}
          </h2>
        )}

        {/* ── [SUBTITLE] ── */}
        {subtitle && (
          <p
            className={cn(
              THEME.subtitle.fontSize,
              THEME.subtitle.color,
              THEME.subtitle.maxWidth,
              THEME.subtitle.lineHeight,
              THEME.subtitle.marginBottom,
            )}
          >
            {subtitle}
          </p>
        )}

        {/* ── [GRID] ── */}
        <div className={cn("grid", THEME.grid.columns, THEME.grid.gap)}>
          {items.map((item, index) => (
            <motion.div
              key={`${item.label}-${item.value}`}
              initial={THEME.animation.initial}
              whileInView={THEME.animation.whileInView}
              viewport={{ once: true }}
              transition={{
                duration: THEME.animation.duration,
                delay: index * THEME.animation.staggerDelay,
              }}
              className="flex flex-row lg:flex-col items-center lg:items-start gap-4 sm:gap-16 text-left"
            >
              {/* [VALUE] Număr */}
              <div className="flex items-baseline gap-1 w-32 md:w-56 lg:w-auto shrink-0 justify-start">
                <span
                  className={cn(
                    THEME.value.fontSize,
                    THEME.value.fontWeight,
                    THEME.value.tracking,
                  )}
                >
                  {item.value}
                </span>
              </div>

              <div className="flex flex-col">
                {/* [SUFFIX] */}
                {item.suffix && (
                  <span
                    className={cn(
                      THEME.suffix.fontSize,
                      THEME.suffix.textTransform,
                      THEME.suffix.tracking,
                      THEME.suffix.fontWeight,
                      THEME.suffix.color,
                    )}
                  >
                    {item.suffix}
                  </span>
                )}

                {/* [ITEM_LABEL] */}
                <span
                  className={cn(
                    THEME.itemLabel.fontSize,
                    THEME.itemLabel.fontWeight,
                    THEME.itemLabel.textTransform,
                    THEME.itemLabel.tracking,
                    THEME.itemLabel.color,
                  )}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
