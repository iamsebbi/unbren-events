"use client";

import { motion } from "motion/react";
import Image from "next/image";
import TextReveal from "@/components/ui/events/TextRevealLine";
import { SanityImage } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: SanityImage | string;
}

const HeroSection = ({ title, subtitle, image }: HeroSectionProps) => {
  const imageUrl = typeof image === "string" ? image : urlFor(image).url();

  return (
    <section className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pt-24 md:px-8 md:pt-0">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-4">
          {/* Subtitle (Left on both) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-2 text-left md:order-1 md:w-1/3"
          >
            <span className="block text-xs font-medium tracking-widest text-(--color-events-muted) uppercase md:text-sm">
              {subtitle}
            </span>
          </motion.div>

          {/* Title (Left on mobile, Center on desktop) */}
          <TextReveal
            text={title}
            className="order-1 text-left text-6xl leading-none font-medium tracking-tighter text-[#e6e2dc] uppercase md:order-2 md:w-1/3 md:text-center md:text-8xl lg:text-[5rem]"
          />

          {/* Empty Space to balance center (Right) */}
          <div className="order-3 hidden md:block md:w-1/3" />
        </div>
      </div>

      {/* Scroll Cue (Mobile & Desktop) */}
      <div className="absolute bottom-30 left-6 z-10 flex items-center space-x-3 text-[11px] font-medium tracking-widest text-white/40 uppercase md:left-12 md:text-xs">
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="size-1 rounded-full bg-white/60 md:size-1.5"
        />
        <span>Scrolează pentru mai mult</span>
      </div>
    </section>
  );
};

export default HeroSection;
