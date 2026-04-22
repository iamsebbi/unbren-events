"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import SliderControls from "@/components/ui/events/SliderControls";
import SectionLabel from "../../_shared/SectionLabel";
import { cn } from "@/lib/utils";
import ImageReveal from "@/components/ui/events/ImageReveal";
import { urlFor } from "../../sanity/image";
import type { SanityImage } from "../../sanity/types";

interface DisplayService {
  id: string;
  title: string;
  copy: string;
  image: string | SanityImage;
}

const SERVICES_DATA = [
  {
    id: "evenimente",
    title: "evenimente",
    copy: "Documentăm energia și dinamica evenimentelor tale, de la conferințe la petreceri private, oferind un pachet vizual complet.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sedinte-foto",
    title: "sedinte foto",
    copy: "Sesiuni dedicate în studio sau locații inedite, captând autenticitatea ta sau a brandului tău întrun mod creativ.",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "documentare",
    title: "documentare",
    copy: "O abordare discretă și sinceră a celor mai importante momente din viața ta, păstrând emoția vie peste generații.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "branding",
    title: "branding",
    copy: "Construim identități vizuale prin imagine, ajutând afacerile să comunice eficient valorile și profesionalismul lor.",
    image:
      "https://images.unsplash.com/photo-1566516171511-1c411a59c8ba?q=80&w=800&auto=format&fit=crop",
  },
];

const THEME = {
  section:
    "py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-[var(--color-events-bg)] border-t border-[var(--color-events-border)]",

  header: {
    wrapper: "flex items-center justify-between mb-4 lg:mb-4",
    tag: "mb-2",
    controls: "md:hidden",
  },

  desktop: {
    mainGrid: "hidden md:grid grid-cols-2 gap-16 lg:gap-24 items-start",
    buttonList: "flex flex-col gap-4 lg:gap-1",
    button: (isActive: boolean) =>
      cn(
        "text-left text-3xl md:text-4xl lg:text-6xl 2xl:text-7xl",
        "font-medium tracking-tighter uppercase transition-colors duration-500 cursor-pointer",
        "active:scale-[0.98] transition-transform",
        "py-2",
        isActive
          ? "text-[var(--color-events-text)] underline underline-offset-8"
          : "text-[var(--color-events-muted)] hover:text-[var(--color-events-text)]",
      ),
    copyWrapper: "mt-4 sm:mt-2 md:mt-1 lg:mt-4 xl:mt-12 h-40 overflow-hidden",
    copy: "text-[var(--color-events-muted)] text-base lg:text-lg xl:text-xl leading-snug max-w-md",
    imageWrapper:
      "aspect-square relative overflow-hidden bg-(--color-events-border)",
  },

  mobile: {
    wrapper: "md:hidden",
    scrollX: "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4",
    item: "min-w-full snap-center flex flex-col gap-2",
    imageWrapper:
      "relative aspect-square overflow-hidden bg-(--color-events-border)",
    img: "object-cover",
    contentWrapper: "flex flex-col gap-3",
    title:
      "text-2xl font-medium uppercase tracking-tight text-[var(--color-events-text)]",
    copy: "text-[var(--color-events-muted)] text-base leading-snug",
  },
} as const;

const textRevealVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface AboutServicesProps {
  services?: DisplayService[];
}

const AboutServices = ({ services }: AboutServicesProps) => {
  const displayServices =
    services && services.length > 0 ? services : SERVICES_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const nextSlide = () => {
    if (window.innerWidth < 768 && scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: width, behavior: "smooth" });
    } else {
      setActiveIndex((prev) => (prev + 1) % displayServices.length);
    }
  };

  const prevSlide = () => {
    if (window.innerWidth < 768 && scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: -width, behavior: "smooth" });
    } else {
      setActiveIndex(
        (prev) => (prev - 1 + displayServices.length) % displayServices.length,
      );
    }
  };

  return (
    <section id="services" className={cn(THEME.section)}>
      <div className={cn(THEME.header.wrapper)}>
        <SectionLabel className={cn(THEME.header.tag)}>(SERVICES)</SectionLabel>
        <SliderControls
          onPrev={prevSlide}
          onNext={nextSlide}
          className={cn(THEME.header.controls)}
        />
      </div>

      {/* Desktop Layout */}
      <div className={cn(THEME.desktop.mainGrid)}>
        <div className={cn(THEME.desktop.buttonList)}>
          {displayServices.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveIndex(index)}
              className={THEME.desktop.button(activeIndex === index)}
            >
              {service.title}
            </button>
          ))}

          <div className={cn(THEME.desktop.copyWrapper)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeIndex}
                variants={textRevealVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={cn(THEME.desktop.copy)}
              >
                {displayServices[activeIndex].copy}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className={cn(THEME.desktop.imageWrapper)}>
          <ImageReveal
            src={
              typeof displayServices[activeIndex].image === "string"
                ? displayServices[activeIndex].image
                : urlFor(displayServices[activeIndex].image).url()
            }
            alt={displayServices[activeIndex].title}
            triggerKey={activeIndex}
            aspectRatio="aspect-square"
          />
        </div>
      </div>

      {/* Mobile Layout (Slider) */}
      <div className={cn(THEME.mobile.wrapper)}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(THEME.mobile.scrollX)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayServices.map((service) => (
            <div key={service.id} className={cn(THEME.mobile.item)}>
              <div className={cn(THEME.mobile.imageWrapper)}>
                <Image
                  src={
                    typeof service.image === "string"
                      ? service.image
                      : urlFor(service.image).url()
                  }
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className={cn(THEME.mobile.img)}
                />
              </div>
              <div className={cn(THEME.mobile.contentWrapper)}>
                <h3 className={cn(THEME.mobile.title)}>{service.title}</h3>
                <p className={cn(THEME.mobile.copy)}>{service.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
