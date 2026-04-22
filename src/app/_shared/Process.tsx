"use client";

import { motion } from "motion/react";
import { LucideIcon, Search, Calendar, Camera, Film } from "lucide-react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

export const HOME_PROCESS_STEPS = [
  {
    icon: Search,
    title: "Descoperire",
    description:
      "Înțelegem viziunea și obiectivele tale pentru a pune bazele unui concept unic.",
  },
  {
    icon: Calendar,
    title: "Planificare",
    description:
      "Logistica și organizarea creativă sunt puse la punct pentru o zi fără cusur.",
  },
  {
    icon: Camera,
    title: "Execuție",
    description:
      "Momentul în care viziunea prinde viață. Suntem acolo pentru a captura fiecare detaliu.",
  },
  {
    icon: Film,
    title: "Livrare",
    description:
      "Post-producție meticuloasă pentru rezultate care depășesc așteptările.",
  },
];

export const HOME_PROCESS_CONTENT = {
  title: (
    <>
      Cum transformăm viziunea <br />
      <span className="text-(--color-events-text)">în realitate.</span>
    </>
  ),
  label: "(CUM LUCRĂM)",
  description:
    "Un proces rafinat de-a lungul anilor, conceput pentru a oferi siguranță și rezultate premium fiecărui partener.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface ProcessItem {
  title: string;
  description?: string;
  icon?: LucideIcon;
  number?: string;
}

interface ProcessProps {
  items: ProcessItem[];
  title?: string | React.ReactNode;
  label?: string;
  subtitle?: string;
  description?: string;
  decorator?: "number" | "icon" | "none";
  className?: string; // For inner container
  sectionClassName?: string; // For section container
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Main Container ──────────────────────────────────────────────
  section: {
    padding: "py-16 sm:py-20 md:py-24 lg:py-32",
    bg: "bg-(--color-events-bg)",
  },
  layout: {
    maxWidth: "max-w-7xl",
    center: "mx-auto",
    padding: "px-4 sm:px-8 md:px-8",
  },

  // ── [HEADER] Section Header ───────────────────────────────────────────────
  header: {
    wrapper: "flex flex-col gap-6 mb-16 md:mb-24 max-w-6xl",
    label: {
      fontSize: "text-sm md:text-base",
      textTransform: "uppercase",
      tracking: "tracking-[0.1em]",
      color: "text-(--color-events-muted)",
      marginBottom: "mb-4",
      fontWeight: "font-normal",
    },
    title: {
      fontSize: "text-[clamp(2rem,6vw,4.5rem)]",
      tracking: "tracking-tighter",
      color: "text-(--color-events-text)",
      leading: "leading-[0.9em]",
      textTransform: "uppercase",
      fontWeight: "font-medium",
      fontSans: "font-sans",
    },
    subtitle: {
      fontSize: "text-sm md:text-base",
      textTransform: "uppercase",
      tracking: "tracking-[0.1em]",
      color: "text-(--color-events-accent)",
      marginTop: "mt-2",
      fontWeight: "font-medium",
    },
    description: {
      fontSize: "text-sm sm:text-base md:text-lg",
      color: "text-(--color-events-muted)",
      maxWidth: "max-w-xl",
      lineHeight: "leading-snug",
    },
  },

  // ── [GRID] Layout Styles ──────────────────────────────────────────────────
  grid: {
    columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    gapX: "gap-x-8 md:gap-x-12",
    gapY: "gap-y-12 md:gap-y-16",
    item: {
      wrapper: "flex flex-col gap-6 relative z-10 group",
      header: "flex items-end gap-4 lg:flex-col lg:items-start lg:gap-4",
      number: {
        fontSize: "text-5xl md:text-6xl",
        fontWeight: "font-normal",
        tracking: "tracking-tighter",
        color: "text-(--color-events-muted/50)",
        leading: "leading-none",
      },
      title: {
        fontSize: "text-xl sm:text-xl lg:text-2xl xl:text-4xl",
        fontWeight: "font-medium",
        textTransform: "uppercase",
        tracking: "tracking-tighter",
        color: "text-(--color-events-text)",
      },
      description: {
        fontSize: "text-sm sm:text-base",
        color: "text-(--color-events-muted)",
        lineHeight: "leading-snug",
        maxWidth: "max-w-md",
      },
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SUB COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const GridItem = ({
  item,
  index,
  decorator,
}: {
  item: ProcessItem;
  index: number;
  decorator: "number" | "icon" | "none";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(THEME.grid.item.wrapper)}
    >
      <div className={cn(THEME.grid.item.header)}>
        {/* Number */}
        <span
          className={cn(
            THEME.grid.item.number.fontSize,
            THEME.grid.item.number.fontWeight,
            THEME.grid.item.number.tracking,
            THEME.grid.item.number.color,
            THEME.grid.item.number.leading,
            "select-none",
          )}
        >
          {item.number || `0${index + 1}`}.
        </span>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            {/* Icon */}
            {decorator === "icon" && item.icon && (
              <item.icon
                size={24}
                strokeWidth={1.5}
                className="text-(--color-events-accent)"
              />
            )}
            <h3
              className={cn(
                THEME.grid.item.title.fontSize,
                THEME.grid.item.title.fontWeight,
                THEME.grid.item.title.textTransform,
                THEME.grid.item.title.tracking,
                THEME.grid.item.title.color,
              )}
            >
              {item.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="pl-0">
        <p
          className={cn(
            THEME.grid.item.description.fontSize,
            THEME.grid.item.description.color,
            THEME.grid.item.description.lineHeight,
            THEME.grid.item.description.maxWidth,
          )}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Process = ({
  items,
  title,
  label,
  subtitle,
  description,
  decorator = "icon",
  className,
  sectionClassName,
}: ProcessProps) => {
  return (
    <section
      className={cn(
        "w-full",
        THEME.section.padding,
        THEME.section.bg,
        sectionClassName,
      )}
    >
      <div
        className={cn(
          "max-w-none", // Reset default max-width
          THEME.layout.padding,
          className,
        )}
      >
        {/* Header */}
        {(title || label || description) && (
          <div className={cn(THEME.header.wrapper)}>
            <div className="max-w-5xl">
              {label && (
                <span
                  className={cn(
                    THEME.header.label.fontSize,
                    THEME.header.label.textTransform,
                    THEME.header.label.tracking,
                    THEME.header.label.color,
                    THEME.header.label.marginBottom,
                    THEME.header.label.fontWeight,
                    "block",
                  )}
                >
                  {label}
                </span>
              )}
              {title && (
                <h2
                  className={cn(
                    THEME.header.title.fontSize,
                    THEME.header.title.tracking,
                    THEME.header.title.color,
                    THEME.header.title.leading,
                    THEME.header.title.textTransform,
                    decorator === "number"
                      ? THEME.header.title.fontWeight
                      : THEME.header.title.fontSans,
                  )}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <span
                  className={cn(
                    THEME.header.subtitle.fontSize,
                    THEME.header.subtitle.textTransform,
                    THEME.header.subtitle.tracking,
                    THEME.header.subtitle.color,
                    THEME.header.subtitle.marginTop,
                    THEME.header.subtitle.fontWeight,
                    "block",
                  )}
                >
                  {subtitle}
                </span>
              )}
            </div>
            {description && (
              <p
                className={cn(
                  THEME.header.description.fontSize,
                  THEME.header.description.color,
                  THEME.header.description.maxWidth,
                  THEME.header.description.lineHeight,
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content - Grid Only */}
        <div
          className={cn(
            "grid",
            THEME.grid.columns,
            THEME.grid.gapX,
            THEME.grid.gapY,
            "relative",
          )}
        >
          {items.map((item, index) => (
            <GridItem
              key={`${item.title}-${item.number ?? index}`}
              item={item}
              index={index}
              decorator={decorator}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
