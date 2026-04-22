"use client";

import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface TrustPointItem {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface TrustPointsProps {
  items: TrustPointItem[];
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Toate atributele de design centralizate
// Modifică valorile de aici pentru a schimba rapid designul întregii secțiuni.
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Container principal (fond dark) ─────────────────────────────
  section: {
    padding: "py-24 px-6 md:px-12",
    paddingOuter: "px-4",
    colors: "bg-(--color-events-text) text-(--color-events-bg)",
  },

  // ── [LAYOUT] Inner container ──────────────────────────────────────────────
  layout: {
    maxWidth: "max-w-7xl",
    center: "mx-auto",
  },

  // ── [GRID] Grila de items ─────────────────────────────────────────────────
  grid: {
    columns: "md:grid-cols-3",
    gap: "gap-12 md:gap-16",
  },

  // ── [ANIMATION] Animație pe fiecare item ──────────────────────────────────
  animation: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    duration: 0.6,
    staggerDelay: 0.1,
  },

  // ── [ICON] Container icon ────────────────────────────────────────────────
  icon: {
    size: 24,
    strokeWidth: 1.5,
    containerSize: "w-12 h-12",
    containerShape: "rounded-full",
    containerMargin: "mb-2",
    borderColor: "border-(--color-events-bg)/20",
  },

  // ── [TITLE] Titlu item ───────────────────────────────────────────────────
  title: {
    fontSize: "text-xl md:text-2xl",
    fontWeight: "font-medium",
    textTransform: "uppercase",
    tracking: "tracking-tight",
  },

  // ── [DESCRIPTION] Descriere item ─────────────────────────────────────────
  description: {
    fontSize: "text-base",
    lineHeight: "leading-relaxed",
    maxWidth: "max-w-sm",
    color: "text-(--color-events-bg)/70",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints (Tailwind v4 defaults):
//   sm: 640px  │  md: 768px  │  lg: 1024px  │  xl: 1280px  │  2xl: 1536px
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const TrustPoints = ({ items, className }: TrustPointsProps) => {
  return (
    <section
      className={cn(
        "w-full",
        THEME.section.padding,
        THEME.section.paddingOuter,
        THEME.section.colors,
        className,
      )}
    >
      <div className={cn(THEME.layout.maxWidth, THEME.layout.center)}>
        <div className={cn("grid", THEME.grid.columns, THEME.grid.gap)}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={THEME.animation.initial}
              whileInView={THEME.animation.whileInView}
              viewport={{ once: true }}
              transition={{
                duration: THEME.animation.duration,
                delay: index * THEME.animation.staggerDelay,
              }}
              className="flex flex-col gap-4 items-start"
            >
              {/* [ICON] */}
              <div
                className={cn(
                  THEME.icon.containerSize,
                  THEME.icon.containerShape,
                  "border flex items-center justify-center",
                  THEME.icon.containerMargin,
                  THEME.icon.borderColor,
                )}
              >
                <item.icon
                  size={THEME.icon.size}
                  strokeWidth={THEME.icon.strokeWidth}
                />
              </div>

              <div className="flex flex-col gap-2">
                {/* [TITLE] */}
                <h3
                  className={cn(
                    THEME.title.fontSize,
                    THEME.title.fontWeight,
                    THEME.title.textTransform,
                    THEME.title.tracking,
                  )}
                >
                  {item.label}
                </h3>

                {/* [DESCRIPTION] */}
                <p
                  className={cn(
                    THEME.description.fontSize,
                    THEME.description.lineHeight,
                    THEME.description.maxWidth,
                    THEME.description.color,
                  )}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPoints;
