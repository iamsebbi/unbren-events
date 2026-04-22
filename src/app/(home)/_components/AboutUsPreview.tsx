"use client";

import Button from "@/components/ui/events/Button";
import SectionLabel from "../../_shared/SectionLabel";
import { cn } from "@/lib/utils";

const THEME = {
  // ── [SECTION] Container principal ─────────────────────────────────────────
  section: {
    paddingTop: "pt-10 sm:pt-10 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10",
    paddingBottom: "pb-20 sm:pb-20 md:pb-20 lg:pb-20 xl:pb-20 2xl:pb-20",
  },

  // ── [LAYOUT] Content wrapper ──────────────────────────────────────────────
  layout: {
    padding: "px-4 sm:px-8 md:px-8 lg:px-8 xl:px-8 2xl:px-8",
  },

  // ── [CONTENT] Inner content container ─────────────────────────────────────
  content: {
    gap: "gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-4 2xl:gap-4",
    maxWidth: "max-w-4xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-6xl",
  },

  // ── [LABEL] Eticheta "(STUDIO)" ───────────────────────────────────────────
  label: {
    text: "(STUDIO)",
    fontWeight: "font-normal",
  },

  // ── [PARAGRAPH] Descrierea studioului ─────────────────────────────────────
  paragraph: {
    text: "Surprindem momente care ii aduc pe oameni impreuna. din iasi, venim cu un mix de curiozitate si atentie la detaliu, transformand nunti, botezuri sau petrecerea ta in amintiri vizuale clare. lucram relaxat, alaturi de tine, pentru a da forma unei povesti care sa ramana vie peste ani, fie ca e vorba de inceputul unei familii sau bucuria unui moment nou.",
    fontWeight: "font-regular",
    tracking: "tracking-tighter",
    lineHeight: "leading-snug",
    fontSize:
      "text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl",
    paddingBottom: "pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-8 2xl:pb-10",
  },

  // ── [CTA] Buton Call-to-Action ────────────────────────────────────────────
  cta: {
    text: "Mai mult",
    href: "/events/about",
    paddingBottom: "pb-6 sm:pb-7 md:pb-8 lg:pb-10 xl:pb-10 2xl:pb-10",
    // Culori buton
    borderColor: "border-(--color-events-text)",
    activeColor: "active:bg-[var(--color-events-text)]",
    activeTextColor: "active:[&_span]:!text-[var(--color-events-bg)]",
    activeIconColor: "active:[&_svg]:!text-[var(--color-events-bg)]",
    dotColor: "bg-[var(--color-events-text)]",
    hoverTextColor: "text-[var(--color-events-bg)]",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints (Tailwind v4 defaults):
//   sm: 640px  │  md: 768px  │  lg: 1024px  │  xl: 1280px  │  2xl: 1536px
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface AboutUsPreviewProps {
  description?: string;
}

const AboutUsPreview = ({ description }: AboutUsPreviewProps) => {
  return (
    <section
      className={`flex flex-col ${THEME.section.paddingTop} ${THEME.section.paddingBottom}`}
    >
      {/* ─────────────── [LAYOUT] Content Wrapper ─────────────── */}
      <div className={`w-full ${THEME.layout.padding}`}>
        <div
          className={`flex flex-col ${THEME.content.gap} ${THEME.content.maxWidth}`}
        >
          {/* ── [LABEL] Etichetă ── */}
          <SectionLabel className={cn(THEME.label.fontWeight)}>
            {THEME.label.text}
          </SectionLabel>
          {/* ── [PARAGRAPH] Descriere ── */}
          <p
            className={` ${THEME.paragraph.fontWeight} ${THEME.paragraph.tracking} ${THEME.paragraph.lineHeight} ${THEME.paragraph.fontSize} ${THEME.paragraph.paddingBottom} `}
          >
            {description || THEME.paragraph.text}
          </p>

          {/* ── [CTA] Buton ── */}
          <div className={THEME.cta.paddingBottom}>
            <Button
              text={THEME.cta.text}
              href={THEME.cta.href}
              className={cn(
                THEME.cta.borderColor,
                THEME.cta.activeColor,
                THEME.cta.activeTextColor,
                THEME.cta.activeIconColor,
              )}
              dotClassName={THEME.cta.dotColor}
              hoverTextClassName={THEME.cta.hoverTextColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPreview;
