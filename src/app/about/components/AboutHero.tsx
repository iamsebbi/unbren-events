"use client";

import Image from "next/image";
import { motion } from "motion/react";
import TextReveal from "@/components/ui/events/TextRevealLine";
import SectionLabel from "../../_shared/SectionLabel";
import { cn } from "@/lib/utils";

const THEME = {
  section: "w-full pt-16 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-24",
  container: "px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16",

  backLink: {
    wrapper: "mb-6 sm:mb-8",
    link: cn(
      "group flex items-center gap-2",
      "text-[var(--color-events-muted)] hover:text-[var(--color-events-text)]",
      "transition-colors text-xs md:text-sm uppercase tracking-[0.1em] font-sans",
      "active:scale-95 transition-transform",
      "min-h-[44px] py-1",
    ),
    iconSize: 16,
  },

  tag: "mb-4 sm:mb-6",

  title: cn(
    "text-[clamp(3rem,12vw,12rem)]",
    "font-medium uppercase tracking-tighter text-[var(--color-events-text)]",
    "leading-[0.85] sm:leading-[0.8] md:leading-none",
  ),

  image: {
    wrapper:
      "w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] 2xl:h-[80vh] relative overflow-hidden",
    img: "w-full h-full object-cover",
    overlay: "absolute inset-0 bg-black/10",
  },

  information: {
    section:
      "py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-8 bg-[var(--color-events-bg)]",
    grid: {
      main: "w-full grid grid-cols-1",
      contentColumn:
        "grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-10 xl:gap-10 2xl:gap-10",
    },
    tag: "mb-4",
    mainTitle: {
      wrapper: "lg:col-span-7 2xl:col-span-8",
      text: cn(
        "text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl",
        "font-medium leading-tight tracking-tight text-[var(--color-events-text)]",
        "max-w-4xl",
      ),
    },
    subParagraphs: {
      wrapper: cn(
        "lg:col-span-5 2xl:col-span-4",
        "grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 lg:gap-8 xl:gap-12",
        "text-[var(--color-events-muted)] text-base md:text-sm",
        "font-medium leading-snug self-end lg:mb-2 2xl:mb-4",
      ),
    },
  },
} as const;

import { urlFor } from "../../sanity/image";
import type { SanityImage } from "../../sanity/types";

const AboutHero = ({
  title,
  image,
  infoLabel,
  infoTitle,
  infoSidebar,
}: {
  title?: string;
  image?: SanityImage;
  infoLabel?: string;
  infoTitle?: string;
  infoSidebar?: string[];
}) => {
  return (
    <section className={cn(THEME.section)}>
      <div className={cn(THEME.container)}>
        {/* Tag */}
        <SectionLabel className={THEME.tag}>(ABOUT)</SectionLabel>

        <TextReveal text={title || "OUR STUDIO"} className={cn(THEME.title)} />
      </div>

      <div className={cn(THEME.image.wrapper)}>
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <Image
            src={
              image
                ? urlFor(image).url()
                : "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
            }
            alt="UNBREN. Hero"
            fill
            priority
            className={cn(THEME.image.img)}
          />
        </motion.div>
        <div className={cn(THEME.image.overlay)} />
      </div>

      {/* Information Section */}
      <div className={cn(THEME.information.section)}>
        <div className={cn(THEME.information.grid.main)}>
          <SectionLabel className={THEME.information.tag}>
            ({infoLabel || "INFORMATION"})
          </SectionLabel>

          <div className={cn(THEME.information.grid.contentColumn)}>
            <div className={cn(THEME.information.mainTitle.wrapper)}>
              <p className={cn(THEME.information.mainTitle.text)}>
                {infoTitle ||
                  "Suntem o echipă de creativi din Iași dedicați artei de a captura momente. Viziunea noastră este simplă: transformăm emoția în imagini care dăinuie. Fiecare proiect este o nouă oportunitate de a explora limitele creativității și de a oferi o perspectivă unică asupra poveștii tale."}
              </p>
            </div>

            <div className={cn(THEME.information.subParagraphs.wrapper)}>
              {infoSidebar && infoSidebar.length > 0 ? (
                infoSidebar.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>
                    Cu peste 10 ani de experiență în industria evenimentelor, am
                    învățat că cele mai frumoase cadre sunt cele care se nasc
                    din interacțiuni autentice. Nu suntem doar martori la
                    evenimentul tău, ci parteneri în procesul de creare a unei
                    moșteniri vizuale.
                  </p>
                  <p>
                    De la tehnologie de ultimă oră la un ochi format pentru
                    compoziție, folosim tot arsenalul nostru pentru a ne asigura
                    că rezultatul final este mai mult decât o fotografie — este
                    o trăire conservată în timp.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
