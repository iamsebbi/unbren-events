import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// ContactFooter — Standalone footer used exclusively on the Contact page.
// The main site footer (EventsFooter) is conditionally hidden on /contact.
// ─────────────────────────────────────────────────────────────────────────────

const ContactFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-(--color-events-bg) text-(--color-events-text) border-t border-(--color-events-border) pt-20 pb-10 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* ── Footer Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {/* Brand */}
          <div className="flex flex-col space-y-6">
            <Link href="#" className="inline-block">
              <Image
                src="/unbrenlogo.svg"
                alt="UNBREN. Logo"
                width={140}
                height={45}
                className="logo-theme h-auto w-auto"
              />
            </Link>
            <p className="text-(--color-events-muted) text-sm leading-relaxed max-w-xs">
              O agenție creativă dedicată excelenței în digital și evenimente.
              Transformăm viziuni în experiențe memorabile.
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--color-events-muted)] mb-2 opacity-50">
              Unde ne găsești
            </h4>
            <p className="text-(--color-events-text) text-lg md:text-xl tracking-tighter">
              Iași, România <br />
              <span className="text-sm text-(--color-events-muted) tracking-normal">
                Disponibili pentru proiecte oriunde.
              </span>
            </p>
          </div>

          {/* Verticals */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--color-events-muted)] mb-2 opacity-50">
              Divizii
            </h4>
            <div className="pt-2">
              <p className="font-events text-2xl md:text-3xl text-(--color-events-muted) leading-tight tracking-tight">
                UNBREN. Experience <br />
                UNBREN. Digital
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-(--color-events-border) text-[10px] uppercase tracking-[0.2em] text-(--color-events-muted)">
          <p>© {currentYear} UNBREN. Toate drepturile rezervate.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link
              href="/politica-de-confidentialitate"
              className="hover:text-(--color-events-text) transition-colors"
            >
              Politică de Confidențialitate
            </Link>
            <Link
              href="/termeni-si-conditii"
              className="hover:text-(--color-events-text) transition-colors"
            >
              Termeni și Condiții
            </Link>
            <Link
              href="/politica-cookie"
              className="hover:text-(--color-events-text) transition-colors"
            >
              Politică Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
