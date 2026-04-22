"use client";

import { useState, useEffect, useRef } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Zap,
  MessageSquare,
  ClipboardCheck,
  Camera,
  CheckCircle,
} from "lucide-react";
import CategorySection, {
  type OfferSelectionPayload,
} from "./components/CategorySection";
import TrustPoints from "./components/TrustPoints";
import Process from "../_shared/Process";
import Faq from "../_shared/FAQ";
import { cn } from "@/lib/utils";
import OfferContactModal from "./components/OfferContactModal";
import OffersHero from "./components/OffersHero";
import OffersNav from "./components/OffersNav";
import OffersCTA from "./components/OffersCTA";
import JsonLd from "@/components/seo/JsonLd";

import type { OfferCategory, SiteSettings } from "../sanity/types";

const THEME = {
  main: {
    bg: "bg-(--color-events-bg)",
    text: "text-(--color-events-text)",
    selection:
      "selection:bg-(--color-events-text) selection:text-(--color-events-bg)",
    minHeight: "min-h-dvh",
  },
} as const;

const OFFERS_TRUST_POINTS = [
  {
    icon: ShieldCheck,
    label: "Fără Costuri Ascunse",
    description:
      "Transparență totală. Prețul agreat în contract este cel final, fără surprize ulterioare pentru echipament sau editare.",
  },
  {
    icon: Lock,
    label: "Siguranța Datelor",
    description:
      "Folosim echipament cu slot dublu de card și backup redundant în cloud pentru a ne asigura că amintirile tale sunt în siguranță.",
  },
  {
    icon: Zap,
    label: "Livrare Rapidă",
    description:
      "Știm că ești nerăbdător. Primești un set de 'preview' în primele 48 de ore pentru a împărtăși momentele cheie.",
  },
];

const OFFERS_PROCESS_STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultanță",
    description:
      "Discutăm viziunea ta, programul evenimentului și detaliile care contează pentru tine.",
    color: "border-blue-500/50 text-blue-500",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Rezervare",
    description:
      "Semnăm contractul și achiți avansul pentru a bloca oficial data în calendarul nostru.",
    color: "border-purple-500/50 text-purple-500",
  },
  {
    number: "03",
    icon: Camera,
    title: "Evenimentul",
    description:
      "Suntem acolo cu prezență discretă și profesionalism pentru a captura povestea.",
    color: "border-orange-500/50 text-orange-500",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Livrarea",
    description:
      "Primești galeria editată în format digital, la cea mai înaltă calitate, în termenul agreat.",
    color: "border-emerald-500/50 text-emerald-500",
  },
];

const CLOSE_MODAL_ON_SUCCESS = true;

interface OffersClientPageProps {
  categories: OfferCategory[];
  faqs: { question: string; answer: string }[];
  settings: SiteSettings;
}

export default function OffersClientPage({
  categories,
  faqs,
  settings,
}: OffersClientPageProps) {
  useDocumentTitle(settings.siteTitle ? `${settings.siteTitle} | Oferte` : "Oferte");
  const [activeTab, setActiveTab] = useState(categories[0]?._id || "");
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [categoryBarHidden, setCategoryBarHidden] = useState(false);
  const [selectedOffer, setSelectedOffer] =
    useState<OfferSelectionPayload | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const categorySectionRef = useRef<HTMLDivElement | null>(null);
  const pastCategorySectionRef = useRef(false);

  // Use settings to potentially customize UI (currently placeholder)
  // console.log(settings.siteTitle);

  const handlePackageSelect = (payload: OfferSelectionPayload) => {
    setSelectedOffer(payload);
    setIsOfferModalOpen(true);
  };

  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
  };

  useEffect(() => {
    // effect:audited — complex scroll logic for category navigation
    const handleScroll = () => {
      const currentScrollY = globalThis.scrollY;
      const isMobile = !globalThis.matchMedia("(min-width: 768px)").matches;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      const categorySectionElement = categorySectionRef.current;
      if (categorySectionElement) {
        const sectionBottom =
          categorySectionElement.offsetTop +
          categorySectionElement.offsetHeight;
        const navbarOffset = globalThis.matchMedia("(min-width: 768px)").matches
          ? 80
          : 64;
        const isPastCategorySection =
          currentScrollY >= sectionBottom - navbarOffset;

        setCategoryBarHidden(isPastCategorySection);

        if (pastCategorySectionRef.current !== isPastCategorySection) {
          globalThis.dispatchEvent(
            new CustomEvent("offers:category-section-exit", {
              detail: { afterCategorySection: isPastCategorySection },
            }),
          );
          pastCategorySectionRef.current = isPastCategorySection;
        }
      }

      if (isMobile) {
        if (
          !pastCategorySectionRef.current &&
          isScrollingDown &&
          currentScrollY > 100
        ) {
          setNavbarHidden(true);
        } else if (isScrollingUp) {
          setNavbarHidden(false);
        }
      } else {
        setNavbarHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      globalThis.dispatchEvent(
        new CustomEvent("offers:category-section-exit", {
          detail: { afterCategorySection: false },
        }),
      );
    };
  }, []);

  const activeCategory =
    categories.find((cat) => cat._id === activeTab) || categories[0];

  return (
    <main
      className={cn(
        THEME.main.minHeight,
        THEME.main.bg,
        THEME.main.text,
        THEME.main.selection,
      )}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <OffersHero />

      {categories.length > 0 && (
        <OffersNav
          categories={categories.map((c) => ({ id: c._id, title: c.title }))}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navbarHidden={navbarHidden}
          categoryBarHidden={categoryBarHidden}
        />
      )}

      {/* ── Active Category Section ───────────────────────────────────── */}
      <div ref={categorySectionRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeCategory && (
              <CategorySection
                category={activeCategory}
                onSelectPackage={handlePackageSelect}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <OfferContactModal
        isOpen={isOfferModalOpen}
        selectedOffer={selectedOffer}
        onClose={closeOfferModal}
        closeOnSuccess={CLOSE_MODAL_ON_SUCCESS}
      />

      {/* ── Trust & Process ───────────────────────────────────────────── */}
      <TrustPoints items={OFFERS_TRUST_POINTS} />
      <Process
        items={OFFERS_PROCESS_STEPS}
        title="PROCESUL NOSTRU DE LUCRU."
        label="(CUM LUCRĂM)"
        decorator="icon"
        sectionClassName="border-b border-(--color-events-border)"
      />

      <Faq
        items={faqs}
        title="FAQ."
        label="(INTREBARI FRECVENTE)"
        description="Claritate totală asupra pachetelor noastre. Dacă mai ai nelămuriri, suntem la un mesaj distanță."
      />

      <OffersCTA />
    </main>
  );
}
