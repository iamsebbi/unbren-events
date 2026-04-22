import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ContactForm from "./components/ContactForm";
import ContactSocials from "./components/ContactSocials";
import Faq from "../_shared/FAQ";
import AboutReveal from "./components/AboutReveal";
import { getFaqs, getSettings } from "../sanity/data";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — UNBREN.",
  description:
    "Contactează echipa UNBREN. pentru foto, video și organizare de evenimente. Solicită o ofertă personalizată.",
  path: "/contact",
});

const Contact = async () => {
  const [faqItems, settings] = await Promise.all([
    getFaqs("contact"),
    getSettings(),
  ]);

  return (
    <main className="min-h-screen bg-(--color-events-bg)">
      {/* Top Section - Lifts up to reveal About section */}
      <div className="relative z-10 bg-(--color-events-bg)">
        {/* Fullscreen First Fold: Form + FAQ */}
        <div className="min-h-screen px-4 py-24 md:px-12 md:py-32 lg:py-40">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-32 md:gap-48">
            <ContactForm className="px-0!" />
            <Faq
              items={faqItems}
              title="FAQ."
              label="(INTREBARI FRECVENTE)"
              description="Ai o întrebare specifică? Am adunat aici cele mai frecvente curiozități pentru a-ți oferi răspunsuri rapide."
              sectionClassName="py-0 md:py-0 px-0 md:px-0"
              className="px-0 md:px-0!"
            />
          </div>
        </div>

        <ContactSocials settings={settings} />

        {/* Spacer to allow scrolling off the screen */}
        <div className="h-24 md:h-32" />
      </div>

      {/* revealed sticky section */}
      <div className="sticky bottom-0 z-0 h-screen">
        <AboutReveal />
      </div>
    </main>
  );
};

export default Contact;
