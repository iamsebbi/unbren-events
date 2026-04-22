"use client";

import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/events/Button";
import TextReveal from "@/components/ui/events/TextRevealLine";
import MobileOfferCard from "./MobileOfferCard";

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Toate atributele de design centralizate
// Modifică valorile de aici pentru a schimba rapid designul întregii secțiuni.
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [SECTION] Container principal ─────────────────────────────────────────
  section: {
    height: "h-dvh",
    bg: "bg-black",
    font: "font-sans",
    paddingTop: "pt-24 sm:pt-28 md:pt-28 lg:pt-32 xl:pt-36 2xl:pt-36",
  },

  // ── [VIDEO] Background videos ─────────────────────────────────────────────
  video: {
    srcMobile: "/hero.mp4", // Video portret pentru mobile
    srcDesktop: "/heroH.mp4", // Video landscape pentru desktop
    opacity: "opacity-50", // Opacitatea video-ului
    breakpoint: "lg", // De la lg → video desktop
  },

  // ── [OVERLAY] Dark overlay peste video ────────────────────────────────────
  overlay: {
    bg: "bg-black/30", // Opacitate overlay pentru lizibilitate
  },

  // ── [CONTENT] Main content wrapper ────────────────────────────────────────
  content: {
    padding: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12 2xl:px-16",
    justify: "justify-start",
    textAlign: "text-left",
  },

  // ── [TITLE] Hero Title (TextReveal) ───────────────────────────────────────
  title: {
    line1: "CREEĂM MIȘCAREA",
    line2: "IMAGINI CARE STAU",
    accent: "MEREU CU TINE.",
    // Stil accent line
    accentClass: "font-sans text-[#f7f4ed] tracking-tighter",
    // Stil general titlu — culoare fixă, mereu vizibilă pe fundal întunecat
    color: "text-[#f7f4ed]",
    fontSize: "text-[clamp(2.45rem,8vw,5rem)]",
    tracking: "tracking-tighter",
    lineHeight: "leading-[0.95]",
    whitespace: "whitespace-nowrap",
    // Animație TextReveal
    stagger: 0.15,
    delay: 0.2,
  },

  // ── [CTA] Buton Call-to-Action ────────────────────────────────────────────
  cta: {
    marginTop: "mt-8 sm:mt-10 md:mt-14 lg:mt-16 xl:mt-14",
    layout: "inline-flex flex-nowrap gap-3 sm:gap-4",
    buttonSize: "w-auto",
    offers: {
      text: "Vezi oferte",
      href: "/offers",
      textColor: "text-[#f7f4ed]",
      borderColor: "border-[#7c8f5e]",
      bgColor: "bg-[#7c8f5e]",
      hoverActiveClass:
        "hover:bg-[#f7f4ed] hover:border-[#f7f4ed] hover:text-[#1f1f1f] active:bg-[#f7f4ed] active:border-[#f7f4ed] active:text-[#1f1f1f]",
      dotColor: "bg-[#f7f4ed]",
      hoverTextColor: "text-[#1f1f1f]",
    },
    services: {
      text: "Galerie",
      href: "/gallery",
      textColor: "text-[#f7f4ed]",
      borderColor: "border-[#f7f4ed]",
      bgColor: "bg-transparent",
      dotColor: "bg-[#f7f4ed]",

      hoverTextColor: "text-[#1f1f1f]",
    },
    // Animație intrare
    animation: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      delay: 0.8,
      duration: 1,
    },
  },

  // ── [BOTTOM_BAR] Bara de jos ──────────────────────────────────────────────
  bottomBar: {
    visibility: "hidden md:flex",
    textColor: "text-[#f7f4ed]", // Culoare text bottom bar
    bgColor: "bg-[#f7f4ed]", // Culoare bg pentru dot
    padding:
      "py-12 sm:py-20 md:py-24 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12",
    gap: "gap-3 sm:gap-4",
  },

  // ── [DESCRIPTION] Text descriere stânga-jos ───────────────────────────────
  description: {
    text: "Povești vizuale create în Iași, unde detaliul și claritatea vin pe primul loc.",
    textTransform: "uppercase",
    tracking: "tracking-tight",
    lineHeight: "leading-tight",
    opacity: "opacity-70",
    fontSize: "text-sm md:text-sm lg:text-base",
    maxWidth:
      "max-w-[70%] sm:max-w-[65%] md:max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg",
    // Animație
    animation: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      delay: 1,
      duration: 1,
    },
  },

  // ── [SCROLL_CUE] Indicator scroll (doar desktop) ─────────────────────────
  scrollCue: {
    text: "(Scroll pentru mai mult)",
    visibility: "hidden xl:flex", // Vizibil doar de la xl+
    tracking: "tracking-[0.2em]",
    fontSize: "text-sm xl:text-base",
    dotSize: "size-1",
    dotShape: "rounded-full",
    // Animație bounce
    bounceAnimation: { y: [0, 5, 0] } as { y: number[] },
    bounceDuration: 2,
  },

  // ── [COPYRIGHT] An copyright dreapta-jos ──────────────────────────────────
  copyright: {
    fontSize:
      "text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl",
    fontWeight: "font-semibold lg:font-bold",
    tracking: "tracking-tight",
    translateY: "translate-y-[1%] lg:translate-y-[12%] xl:translate-y-[10%]",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints (Tailwind v4 defaults):
//   sm: 640px  │  md: 768px  │  lg: 1024px  │  xl: 1280px  │  2xl: 1536px
// ─────────────────────────────────────────────────────────────────────────────

import type { SiteSettings } from "../../sanity/types";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  settings?: SiteSettings;
}

const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const headlines = settings?.heroHeadlines || [
    THEME.title.line1,
    THEME.title.line2,
    THEME.title.accent,
  ];

  const heroDescription = settings?.heroDescription || THEME.description.text;
  const ctaOffers = settings?.ctaLabels?.primary || THEME.cta.offers.text;
  const ctaOffersHref = settings?.ctaLinks?.primary || THEME.cta.offers.href;
  const ctaServices = settings?.ctaLabels?.secondary || "Galerie";
  const ctaServicesHref = settings?.ctaLinks?.secondary || "/gallery";

  const whatsappNumber = settings?.whatsappNumber || "40700000000";
  const mobileOfferCardLabel = settings?.offerCard?.label || "Ofertă Limitată";
  const mobileOfferCardTitle =
    settings?.offerCard?.title || "Oferim servicii de la 200€";
  const mobileOfferCardButtonLabel =
    settings?.offerCard?.buttonLabel || "WhatsApp";
  const mobileOfferCardMessage =
    settings?.offerCard?.whatsappMessage ||
    "Bună ziua! Sunt interesat de oferta de servicii de la 200€.";
  const whatsappMessage = encodeURIComponent(mobileOfferCardMessage);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const mobileOfferCardHref =
    settings?.offerCard?.buttonHref?.trim() || whatsappLink;

  return (
    <section
      data-navbar-light="true"
      className={`relative flex w-full items-start justify-center overflow-hidden ${THEME.section.height} ${THEME.section.bg} ${THEME.section.font} pb-[env(safe-area-inset-bottom)] ${THEME.section.paddingTop} `}
    >
      {/* ─────────────── [VIDEO] Background Videos ─────────────── */}

      {/* Mobile video: phones + tablets (< lg) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        key={`mobile-${settings?.heroVideoMobile || THEME.video.srcMobile}`}
        preload="metadata"
        aria-label="Video de fundal UNBREN. (Mobile)"
        className={`absolute inset-0 h-full w-full object-cover lg:hidden ${THEME.video.opacity}`}
      >
        <source
          src={settings?.heroVideoMobile || THEME.video.srcMobile}
          type="video/mp4"
        />
      </video>

      {/* Desktop video: laptops + desktops (≥ lg) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        key={`desktop-${settings?.heroVideoDesktop || THEME.video.srcDesktop}`}
        preload="metadata"
        aria-label="Video de fundal UNBREN. (Desktop)"
        className={`absolute inset-0 hidden h-full w-full object-cover lg:block ${THEME.video.opacity}`}
      >
        <source
          src={settings?.heroVideoDesktop || THEME.video.srcDesktop}
          type="video/mp4"
        />
      </video>

      {/* [OVERLAY] Dark overlay pentru lizibilitate */}
      <div className={`absolute inset-0 ${THEME.overlay.bg}`} />

      {/* ─────────────── [CONTENT] Main Content ─────────────── */}
      <div
        className={`relative z-10 flex w-full ${THEME.content.justify} ${THEME.content.padding} `}
      >
        <div className={THEME.content.textAlign}>
          {/* ── [TITLE] Hero Title ── */}
          <TextReveal
            text={headlines.map((text: string, i: number) => ({
              content: text,
              className:
                i === headlines.length - 1 ? THEME.title.accentClass : "",
            }))}
            className={`${THEME.title.color} ${THEME.title.whitespace} ${THEME.title.fontSize} ${THEME.title.tracking} ${THEME.title.lineHeight}`}
            stagger={THEME.title.stagger}
            delay={THEME.title.delay}
          />

          {/* ── [CTA] Buton Call-to-Action ── */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : THEME.cta.animation.initial
            }
            animate={THEME.cta.animation.animate}
            transition={{
              delay: shouldReduceMotion ? 0.4 : THEME.cta.animation.delay,
              duration: shouldReduceMotion ? 0.6 : THEME.cta.animation.duration,
            }}
            className={`${THEME.cta.marginTop} ${THEME.cta.layout}`}
          >
            <Button
              text={ctaOffers}
              href={ctaOffersHref}
              className={`${THEME.cta.buttonSize} ${THEME.cta.offers.textColor} ${THEME.cta.offers.borderColor} ${THEME.cta.offers.bgColor} ${THEME.cta.offers.hoverActiveClass}`}
              dotClassName={THEME.cta.offers.dotColor}
              hoverTextClassName={THEME.cta.offers.hoverTextColor}
            />
            <Button
              text={ctaServices}
              href={ctaServicesHref}
              className={`${THEME.cta.buttonSize} ${THEME.cta.services.textColor} ${THEME.cta.services.borderColor} ${THEME.cta.services.bgColor}`}
              dotClassName={THEME.cta.services.dotColor}
              hoverTextClassName={THEME.cta.services.hoverTextColor}
            />
          </motion.div>
        </div>
      </div>

      <MobileOfferCard
        buttonHref={mobileOfferCardHref}
        label={mobileOfferCardLabel}
        heading={mobileOfferCardTitle}
        buttonLabel={mobileOfferCardButtonLabel}
      />

      {/* ─────────────── [BOTTOM_BAR] Bara de jos ─────────────── */}
      <div
        className={`absolute bottom-0 z-10 w-full flex-row items-end justify-between ${THEME.bottomBar.visibility} ${THEME.bottomBar.textColor} font-regular ${THEME.bottomBar.padding} ${THEME.bottomBar.gap} `}
      >
        {/* [DESCRIPTION] */}
        <motion.p
          initial={THEME.description.animation.initial}
          animate={THEME.description.animation.animate}
          transition={{
            delay: shouldReduceMotion ? 0.5 : THEME.description.animation.delay,
            duration: shouldReduceMotion
              ? 0.6
              : THEME.description.animation.duration,
          }}
          className={`text-left ${THEME.description.lineHeight} ${THEME.description.textTransform} ${THEME.description.tracking} ${THEME.description.opacity} ${THEME.description.fontSize} ${THEME.description.maxWidth} `}
        >
          {heroDescription}
        </motion.p>

        {/* [SCROLL_CUE] Indicator scroll (doar desktop) */}
        <div
          className={` ${THEME.bottomBar.textColor} items-center space-x-3 uppercase ${THEME.scrollCue.visibility} ${THEME.scrollCue.tracking} ${THEME.scrollCue.fontSize} `}
        >
          <motion.span
            animate={THEME.scrollCue.bounceAnimation}
            transition={{
              repeat: Infinity,
              duration: THEME.scrollCue.bounceDuration,
            }}
            className={`${THEME.scrollCue.dotSize} ${THEME.bottomBar.bgColor} ${THEME.scrollCue.dotShape}`}
          />
          <span>{THEME.scrollCue.text}</span>
        </div>

        {/* [COPYRIGHT] */}
        <div
          className={` ${THEME.bottomBar.textColor} pointer-events-none leading-none select-none ${THEME.copyright.fontSize} ${THEME.copyright.fontWeight} ${THEME.copyright.tracking} ${THEME.copyright.translateY} `}
        >
          &copy;{currentYear}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
