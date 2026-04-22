"use client";

import React, { useState, memo } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface ProcessItem {
  title: string;
  description?: string;
  content?: string;
}

interface ProcessAccordionProps {
  items: ProcessItem[];
  title?: string | React.ReactNode;
  label?: string;
  subtitle?: string;
  description?: string;
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
    padding: "px-4 sm:px-4 md:px-8",
  },

  // ── [HEADER] Section Header ───────────────────────────────────────────────
  header: {
    wrapper: "flex flex-col gap-6 mb-16 md:mb-24 max-w-6xl",
    label: {
      fontSize: "text-[10px] sm:text-xs",
      textTransform: "uppercase",
      tracking: "tracking-[0.1em]",
      color: "text-(--color-events-muted)",
      marginBottom: "mb-4",
      fontWeight: "font-normal",
    },
    title: {
      fontSize: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      tracking: "tracking-tighter",
      color: "text-(--color-events-text)",
      leading: "leading-[0.9em]",
      textTransform: "uppercase",
      fontWeight: "font-medium",
    },
    subtitle: {
      fontSize: "text-[10px] sm:text-xs",
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
      lineHeight: "leading-relaxed",
    },
  },

  // ── [ACCORDION] Layout Styles ─────────────────────────────────────────────
  accordion: {
    wrapper: "border-t border-(--color-events-border) w-full",
    item: {
      border: "border-b border-(--color-events-border) last:border-0",
      button:
        "w-full py-6 md:py-8 flex justify-between items-center text-left focus:outline-none group cursor-pointer",
    },
    index: {
      fontSize: "text-base sm:text-md md:text-lg",
      color: "text-(--color-events-muted)",
      fontWeight: "font-medium",
    },
    title: {
      fontSize: "text-lg sm:text-xl md:text-3xl",
      fontWeight: "font-medium",
      textTransform: "uppercase",
      tracking: "tracking-tight",
      color: "text-(--color-events-text)",
    },
    content: {
      padding: "pb-8 md:pl-14",
      fontSize: "text-md md:text-lg",
      fontWeight: "font-medium",
      lineHeight: "leading-snug",
      maxWidth: "max-w-3xl",
      color: "text-(--color-events-text)",
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SUB COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const accordionVariants: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      },
      opacity: {
        duration: 0.3,
        ease: "linear",
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
      opacity: {
        duration: 0.2,
        ease: "linear",
      },
    },
  },
};

const AccordionItem = memo(
  ({
    item,
    index,
    isOpen,
    onToggle,
  }: {
    item: ProcessItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    return (
      <div className={cn(THEME.accordion.item.border)}>
        <button
          onClick={onToggle}
          className={cn(THEME.accordion.item.button)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className={cn(
                THEME.accordion.index.fontSize,
                THEME.accordion.index.color,
                THEME.accordion.index.fontWeight,
              )}
            >
              ({index + 1})
            </span>
            <h3
              className={cn(
                THEME.accordion.title.fontSize,
                THEME.accordion.title.fontWeight,
                THEME.accordion.title.textTransform,
                THEME.accordion.title.tracking,
                THEME.accordion.title.color,
              )}
            >
              {item.title}
            </h3>
          </div>
          <div className="text-(--color-events-text)">
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              variants={accordionVariants}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div
                className={cn(
                  THEME.accordion.content.padding,
                  THEME.accordion.content.fontSize,
                  THEME.accordion.content.fontWeight,
                  THEME.accordion.content.lineHeight,
                  THEME.accordion.content.maxWidth,
                  THEME.accordion.content.color,
                )}
              >
                {item.content || item.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const ProcessAccordion = ({
  items,
  title,
  label,
  subtitle,
  description,
  className,
  sectionClassName,
}: ProcessAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                    THEME.header.title.fontWeight,
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

        {/* Content - Accordion Only */}
        <div className={cn(THEME.accordion.wrapper)}>
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessAccordion;
