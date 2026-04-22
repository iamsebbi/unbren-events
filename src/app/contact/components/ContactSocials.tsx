import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
const FALLBACK_SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
];
import type { SiteSettings } from "../../sanity/types";

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ContactSocialsProps {
  settings: SiteSettings;
}

const ContactSocials = ({ settings }: ContactSocialsProps) => {
  return (
    <section className="px-6 pb-32 font-sans md:px-12">
      <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-0">
        {/* ── Column 1: Contact Direct ──────────────────────────────── */}
        <div className="space-y-8">
          {/* Email */}
          <div className="space-y-3 border-t border-(--color-events-border) pt-6">
            <p className="text-[12px] tracking-widest text-(--color-events-muted) uppercase">
              (intrebari)
            </p>
            <a
              href={`mailto:${settings.email || "hello@unbren.ro"}`}
              className="group font-regular flex items-center gap-3 text-2xl tracking-tighter text-(--color-events-text) transition-all hover:text-(--color-events-muted) md:text-3xl"
            >
              <Mail
                size={24}
                className="shrink-0 text-(--color-events-text) transition-colors group-hover:text-(--color-events-muted)"
              />
              {settings.email || "hello@unbren.ro"}
            </a>
          </div>

          {/* Telefon & WhatsApp */}
          <div className="space-y-3 border-t border-(--color-events-border) pt-6">
            <p className="text-[12px] tracking-widest text-(--color-events-muted) uppercase">
              (contact rapid)
            </p>
            <div className="flex flex-col space-y-4">
              {settings.whatsappNumber && (
                <>
                  <a
                    href={`tel:+${settings.whatsappNumber}`}
                    className="group font-regular flex items-center gap-3 text-2xl tracking-tighter text-(--color-events-text) transition-all hover:text-(--color-events-muted) md:text-3xl"
                  >
                    <Phone
                      size={24}
                      className="shrink-0 text-(--color-events-text) transition-colors group-hover:text-(--color-events-muted)"
                    />
                    +{settings.whatsappNumber.slice(0, 2)}{" "}
                    {settings.whatsappNumber.slice(2, 5)}{" "}
                    {settings.whatsappNumber.slice(5, 8)}{" "}
                    {settings.whatsappNumber.slice(8)}
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-regular flex items-center gap-3 text-2xl tracking-tighter text-(--color-events-text) transition-all hover:text-(--color-events-muted) md:text-3xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="29"
                      height="29"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-(--color-events-text) transition-colors group-hover:text-(--color-events-muted)"
                    >
                      <path d="m3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0za5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                    WhatsApp
                  </a>
                </>
              )}
              {!settings.whatsappNumber && (
                <a
                  href="tel:+40700000000"
                  className="group font-regular flex items-center gap-3 text-2xl tracking-tighter text-(--color-events-text) transition-all hover:text-(--color-events-muted) md:text-3xl"
                >
                  <Phone
                    size={24}
                    className="shrink-0 text-(--color-events-text) transition-colors group-hover:text-(--color-events-muted)"
                  />
                  +40 7xx xxx xxx
                </a>
              )}
            </div>
          </div>

          {/* Adresa */}
          {settings.address && (
            <div className="space-y-3 border-t border-(--color-events-border) pt-6">
              <p className="text-[12px] tracking-widest text-(--color-events-muted) uppercase">
                (adresa)
              </p>
              <div className="group font-regular flex items-start gap-3 text-2xl tracking-tighter text-(--color-events-text) transition-colors hover:text-(--color-events-muted) md:text-3xl">
                <MapPin
                  size={24}
                  className="mt-1 shrink-0 text-(--color-events-text) transition-colors group-hover:text-(--color-events-muted)"
                />
                <span>{settings.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Column 2: Social Links ────────────────────────────────── */}
        <div className="space-y-8">
          <div className="space-y-6 border-t border-(--color-events-border) pt-6">
            <p className="text-[12px] tracking-widest text-(--color-events-muted) uppercase">
              (socials)
            </p>
            <div className="flex flex-col gap-2">
              {(settings.socialLinks && settings.socialLinks.length > 0
                ? settings.socialLinks
                : FALLBACK_SOCIALS.map((s) => ({
                    platform: s.name,
                    url: s.href,
                  }))
              ).map((item: { platform: string; url: string }) => (
                <a
                  key={item.platform}
                  href={item.url}
                  className="group flex items-center justify-between border-b border-(--color-events-border) py-2 transition-colors duration-300 hover:border-(--color-events-text)"
                >
                  <span className="font-regular text-xl text-(--color-events-text) md:text-3xl">
                    {item.platform}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-(--color-events-muted) transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-(--color-events-text)" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSocials;
