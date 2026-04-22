"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME = {
  layout: {
    section:
      "py-20 sm:py-18 md:py-24 lg:py-24 px-4 sm:px-6 md:px-8 border-t border-[var(--color-events-border)] bg-[var(--color-events-bg)]",
    grid: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 2xl:gap-40 items-start",
  },

  left: {
    column: "w-full",
    tag: "text-xs md:text-sm font-medium text-[var(--color-events-muted)] uppercase tracking-[0.1em] block ",
    list: "flex flex-col",
    item: {
      link: cn(
        "group flex items-center justify-between py-5 sm:py-6 xl:py-8",
        "border-b border-[var(--color-events-border)] transition-colors duration-500",
        "hover:border-[var(--color-events-text)]",
        "min-h-[44px] active:bg-white/5",
      ),
      text: "text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-[var(--color-events-text)]",
      icon: cn(
        "w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8",
        "text-[var(--color-events-muted)] group-hover:text-[var(--color-events-text)]",
        "transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1",
      ),
    },
  },

  right: {
    column: "flex flex-col justify-start h-full",
    description: cn(
      "text-xl sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-medium",
      "text-[var(--color-events-text)] leading-snug tracking-tight max-w-xl lg:max-w-none",
    ),
    tag: "mt-8 sm:mt-10 lg:mt-12 text-[var(--color-events-muted)] uppercase tracking-[0.2em] text-xs",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface QuickLinkItem {
  label: string;
  href: string;
}

interface QuickLinksProps {
  links?: QuickLinkItem[];
  description?: string;
}

const QuickLinks = ({ links, description }: QuickLinksProps) => {
  const displayLinks =
    links && links.length > 0
      ? links
      : [
          { label: "Echipa", href: "#team" },
          { label: "Servicii", href: "#services" },
          { label: "Contactează-ne", href: "/events/contact" },
        ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(id.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className={cn(THEME.layout.section)}>
      <div className={cn(THEME.layout.grid)}>
        <div className={cn(THEME.left.column)}>
          <span className={cn(THEME.left.tag)}>(QUICK LINKS)</span>
          <div className={cn(THEME.left.list)}>
            {displayLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={
                  link.href.startsWith("#")
                    ? (e) => handleScroll(e, link.href)
                    : undefined
                }
                className={cn(THEME.left.item.link)}
              >
                <span className={cn(THEME.left.item.text)}>{link.label}</span>
                <ArrowUpRight className={cn(THEME.left.item.icon)} />
              </Link>
            ))}
          </div>
        </div>

        <div className={cn(THEME.right.column)}>
          <p className={cn(THEME.right.description)}>
            {description ||
              "În spatele fiecărui click se află o strategie bine definită. Suntem pasionați de detalii și de modul în care acestea construiesc identitatea vizuală a unui brand sau a unui moment personal."}
          </p>
          <p className={cn(THEME.right.tag)}>
            EXPLORE UNBREN. PROCESS & VISION
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
