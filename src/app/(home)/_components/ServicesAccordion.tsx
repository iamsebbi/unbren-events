"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react"; // removed useInView as it wasn't used
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "../../sanity/image";

import type { Service, ServiceProcessStep } from "../../sanity/types";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface ServiceItem {
  title: string;
  tags: string[];
  description: string;
  images: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    title: "Evenimente Private",
    tags: ["Nunți", "Botezuri", "Aniversări & Majorate", "Petreceri Private"],
    description:
      "Fie că este vorba despre emoția primei zile ca familie sau despre bucuria unui nou început, suntem aici să captăm autenticitatea momentului. Nu doar documentăm evenimente precum nunți sau botezuri, ci conservăm zâmbete, priviri și detalii care vor povesti despre voi peste ani. Ne asigurăm că fiecare amintire importantă primește atenția și sensibilitatea pe care o merită.",
    images: [
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    title: "Business & Corporate",
    tags: [
      "Conferințe & Seminarii",
      "Lansări de Brand / Produs",
      "Team Building-uri",
      "Gale & Dineuri",
    ],
    description:
      "Într-o lume vizuală, imaginea business-ului tău este prima formă de comunicare. De la conferințe de amploare la lansări de brand, oferim soluții foto-video profesionale care reflectă calitatea și valorile companiei tale. Transformăm evenimentele corporate în instrumente de marketing puternice, oferindu-ți materiale premium gata să impresioneze partenerii și clienții.",
    images: [
      "https://images.unsplash.com/photo-1566516171511-1c411a59c8ba?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591980339459-9c60eddf146e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612599542558-f3022089fb38?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    title: "Ședințe Foto-Video Dedicate",
    tags: [
      "Save the Date / Trash the Dress",
      "Ședințe de Familie / Maternitate",
      "Portrete profesionale",
      "Personal Branding",
    ],
    description:
      "Sesiunile noastre foto-video sunt despre tine, brandul tău sau familia ta, într-un cadru controlat și creativ. Indiferent dacă ai nevoie de un portret de business care să inspire încredere sau de o ședință artistică de cuplu, punem accent pe compoziție, lumină și confortul tău în fața camerei. Rezultatul? Imagini care te reprezintă cu adevărat.",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    title: "Servicii Extra",
    tags: [
      "Filmare cu Drona",
      "Cabină Foto / Oglindă Magică",
      "Albume & Printuri",
    ],
    description:
      "Dincolo de standard, aducem tehnologia și inovația în serviciul tău. De la viziunea grandioasă a cadrelor aeriene filmate cu drona, până la emoția instantanee a unui montaj realizat în aceeași zi, aceste servicii extra sunt concepute să adauge acel factor 'wow' evenimentului tău. Transformăm o simplă documentare într-o experiență cinematografică completă.",
    images: [
      "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1676299791270-fb8866892d15?q=80&w=800&auto=format&fit=crop",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Main Container ──────────────────────────────────────────────
  section: {
    padding: "py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-8 md:px-8",
    bg: "bg-(--color-events-bg)",
    text: "text-(--color-events-text)",
  },

  // ── [LAYOUT] Inner Container ──────────────────────────────────────────────
  layout: {
    maxWidth: "w-full max-w-none",
    center: "",
  },

  // ── [LABEL] Section Label (e.g. "(SERVICII PE CARE LE OFERIM)") ───────────
  label: {
    fontSize: "text-sm md:text-base",
    fontWeight: "font-normal",
    textTransform: "uppercase",
    tracking: "tracking-[0.1em]",
    color: "text-(--color-events-muted)",
    marginBottom: "mb-8 md:mb-12",
  },

  // ── [ACCORDION] Item Styling ──────────────────────────────────────────────
  accordion: {
    border: "border-b border-(--color-events-border)",
    transition: "transition-all duration-700 ease-in-out",
    wrapper: "border-t border-(--color-events-border) w-full",
  },

  // ── [HEADER] Button & Title ───────────────────────────────────────────────
  header: {
    padding: "py-6 sm:py-8 md:py-6 lg:py-8",
    index: {
      fontSize: "text-sm md:text-base",
      color: "text-(--color-events-muted)",
      fontWeight: "font-medium",
    },
    title: {
      fontSize: "text-lg sm:text-xl md:text-3xl lg:text-4xl",
      fontWeight: "font-normal", // "font-regular" in tw v4 is usually just normal or specific weight
      textTransform: "uppercase",
      tracking: "tracking-tight",
    },
    gap: "gap-4 sm:gap-6 md:gap-8",
  },

  // ── [CONTENT] Expanded Content ────────────────────────────────────────────
  content: {
    padding: "pb-8 md:pb-12 lg:pb-16 pl-0 md:pl-20 lg:pl-24", // Indent content on larger screens
    gap: "gap-8 md:gap-12 lg:gap-24",
    flex: "flex-col md:flex-row",
    description: {
      fontSize: "text-sm sm:text-base md:text-lg",
      lineHeight: "leading-relaxed",
      fontWeight: "font-normal",
      marginBottom: "mb-6 md:mb-8",
      maxWidth: "max-w-prose md:max-w-2xl",
    },
  },

  // ── [TAGS] Service Tags ───────────────────────────────────────────────────
  tags: {
    wrapper: "flex flex-wrap gap-2",
    item: {
      padding: "px-2 sm:px-3 py-1",
      fontSize: "text-sm md:text-base",
      textTransform: "uppercase",
      tracking: "tracking-widest",
      border: "border border-(--color-events-border)",
      colors: "text-(--color-events-muted) hover:text-(--color-events-text)",
      hoverBorder: "hover:border-(--color-events-text)",
      transition: "transition-colors duration-300",
    },
  },

  // ── [IMAGES] Hover Reveal Images ──────────────────────────────────────────
  images: {
    wrapperHeight: "h-6 md:h-10",
    img: {
      size: "h-8 w-12 sm:h-10 sm:w-16",
      objectFit: "object-cover",
    },
    gap: "gap-2",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const AccordionItem = ({
  item,
  index,
  isOpen,
  onToggle,
  isCentral,
}: {
  item: ServiceItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isCentral: boolean;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Combine hover, mobile central state and expansion state
  const isActive = isHovered || isOpen || (isCentral && !isOpen);

  return (
    <div
      ref={containerRef}
      className={cn(
        THEME.accordion.border,
        THEME.accordion.transition,
        isActive ? "opacity-100 grayscale-0" : "opacity-50 grayscale",
      )}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={cn(
          "group relative flex min-h-11 w-full cursor-pointer items-center justify-between text-left transition-transform duration-200 ease-out focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none active:scale-[0.985]",
          THEME.header.padding,
        )}
      >
        <div className={cn("flex flex-1 items-center", THEME.header.gap)}>
          <span
            className={cn(
              THEME.header.index.fontSize,
              THEME.header.index.color,
              THEME.header.index.fontWeight,
              "shrink-0",
            )}
          >
            ({String(index + 1).padStart(2, "0")})
          </span>
          <span
            className={cn(
              THEME.header.title.fontSize,
              THEME.header.title.fontWeight,
              THEME.header.title.textTransform,
              THEME.header.title.tracking,
              "flex-1",
            )}
          >
            {item.title}
          </span>
        </div>

        {/* Image Slot - Only visible on LG+ normally, or based on design needs */}
        <div
          className={cn(
            "relative hidden items-center overflow-hidden lg:flex", // Hidden on mobile/tablet to keep header clean? Or adjust if needed.
            THEME.images.wrapperHeight,
          )}
        >
          <AnimatePresence>
            {!isOpen && (
              <div className={cn("flex h-full items-center", THEME.images.gap)}>
                {item.images.map((img, i) => (
                  <div
                    key={`${item.title}-${img}`}
                    className="h-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: isActive || shouldReduceMotion ? "0%" : "100%" }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: shouldReduceMotion ? 0.3 : 0.5,
                        ease: [0.33, 1, 0.68, 1],
                        delay: shouldReduceMotion ? 0 : i * 0.1,
                      }}
                      className={cn(
                        THEME.images.img.size,
                        "relative overflow-hidden",
                      )}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className={cn(THEME.images.img.objectFit)}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-4 shrink-0 text-(--color-events-text) sm:ml-8">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: shouldReduceMotion ? "auto" : 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: shouldReduceMotion ? "auto" : 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "flex",
                THEME.content.padding,
                THEME.content.gap,
                THEME.content.flex,
              )}
            >
              <div className="max-w-2xl flex-1">
                <p
                  className={cn(
                    THEME.content.description.fontSize,
                    THEME.content.description.fontWeight,
                    THEME.content.description.lineHeight,
                    THEME.content.description.marginBottom,
                    THEME.content.description.maxWidth,
                    "text-(--color-events-text)",
                  )}
                >
                  {item.description}
                </p>
                <div className={cn(THEME.tags.wrapper)}>
                  {item.tags.map((tag, i) => (
                    <span
                      key={`${item.title}-${tag}-${i}`}
                      className={cn(
                        THEME.tags.item.padding,
                        THEME.tags.item.fontSize,
                        THEME.tags.item.textTransform,
                        THEME.tags.item.tracking,
                        THEME.tags.item.border,
                        THEME.tags.item.colors,
                        THEME.tags.item.hoverBorder,
                        THEME.tags.item.transition,
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ServicesAccordionProps {
  items?: Service[];
}

const ServicesAccordion = ({ items }: ServicesAccordionProps) => {
  // Map Sanity services to the internal ServiceItem structure
  const displayItems: ServiceItem[] =
    items && items.length > 0
      ? [...items]
          .sort((a, b) => (a.order || 99) - (b.order || 99))
          .map((s: Service) => ({
            // #4: Use shortTitle for accordion if set, fall back to full title
            title: s.accordionControl?.shortTitle || s.title,
            tags:
              s.accordionControl?.tags && s.accordionControl.tags.length > 0
                ? s.accordionControl.tags
                : s.process?.items?.map((p: ServiceProcessStep) => p.title) ||
                  [],
            description:
              s.accordionControl?.description || s.introQuote || "",
            images:
              s.accordionControl?.images &&
              s.accordionControl.images.length > 0
                ? s.accordionControl.images.map((img) => urlFor(img).url())
                : s.galleryImages?.slice(0, 3).map((img) => urlFor(img).url()) ||
                  [],
          }))
      : SERVICES_DATA;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [centralIndex, setCentralIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // effect:audited — scroll highlight logic
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestIndex = null;

      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Only apply central highlight on mobile and tablet (lg breakpoint matches THEME usage)
      if (window.innerWidth < 1024) {
        setCentralIndex(closestIndex);
      } else {
        setCentralIndex(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="servicii"
      ref={containerRef}
      className={cn(
        "w-full",
        THEME.section.padding,
        THEME.section.bg,
        THEME.section.text,
      )}
    >
      <div className={cn(THEME.layout.maxWidth, THEME.layout.center, "w-full")}>
        <h2
          className={cn(
            THEME.label.fontSize,
            THEME.label.fontWeight,
            THEME.label.textTransform,
            THEME.label.tracking,
            THEME.label.color,
            THEME.label.marginBottom,
          )}
        >
          (SERVICII PE CARE LE OFERIM)
        </h2>
        <div className={cn(THEME.accordion.wrapper)}>
          {displayItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
            >
              <AccordionItem
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                isCentral={centralIndex === index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
