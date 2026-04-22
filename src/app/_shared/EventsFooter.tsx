"use client";

import React from "react";
import { useClock } from "@/hooks/useClock";
import Link from "next/link";
import Image from "next/image";
import {
  EVENTS_FOOTER_SITEMAP,
  LEGAL_LINKS,
  FALLBACK_SOCIAL_LINKS,
} from "@/lib/constants";
import type { SiteSettings } from "../sanity/types";

const THEME = {
  footer:
    "font-regular relative z-30 w-full border-t border-[var(--color-events-border)] bg-[var(--color-events-bg)] px-4 pt-20 pb-4 pb-[env(safe-area-inset-bottom)] font-sans text-[var(--color-events-text)] md:px-8",
  sectionWrapper: "w-full",
  mainGrid: "mb-24 flex flex-col gap-20",
  contactSection: "w-full",
  logoWrapper: "inline-block mb-6 md:mb-8",
  logo: "logo-theme h-14 w-auto md:h-18",
  contactInfoWrapper: "flex flex-col gap-3 lg:gap-4",
  contactItem: "flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-3",
  contactLabel:
    "font-regular shrink-0 text-2xl tracking-tight text-[var(--color-events-muted)] md:text-3xl",
  contactValue:
    "font-regular min-h-[44px] flex items-center text-2xl tracking-tight transition-colors hover:text-[var(--color-events-muted)] md:text-3xl",
  contactSeparator:
    "font-regular hidden lg:block text-2xl tracking-tight text-[var(--color-events-text)] opacity-100 md:text-3xl",
  linksGrid:
    "flex w-full flex-col items-start justify-between gap-16 lg:max-w-[70%] lg:flex-row lg:gap-0",
  linkColumn: "flex flex-col gap-3",
  columnTitle:
    "font-regular text-[12px] tracking-[0.1em] text-[var(--color-events-muted)] uppercase",
  linkItem:
    "font-regular flex min-h-[32px] items-center text-lg tracking-tighter transition-colors hover:text-[var(--color-events-muted)] md:text-lg lg:min-h-[36px]",
  bottomWrapper:
    "flex flex-col items-start justify-between gap-6 border-t border-[var(--color-events-border)] pt-4 text-[11px] tracking-[0.1em] text-[var(--color-events-muted)] uppercase lg:flex-row lg:items-center lg:gap-0",
  bottomText: "font-regular",
  bottomLinksWrapper: "flex flex-col gap-4 md:flex-row md:gap-8",
  bottomLink:
    "font-regular min-h-[32px] flex items-center transition-colors hover:text-[var(--color-events-text)]",
};

interface EventsFooterProps {
  settings: SiteSettings;
}

const EventsFooter = ({ settings }: EventsFooterProps) => {
  const currentYear = new Date().getFullYear();
  const time = useClock("ro-EU");

  return (
    <footer className={THEME.footer}>
      <div className={THEME.sectionWrapper}>
        <div className={THEME.mainGrid}>
          {/* Rândul 1: Contact & Logo */}
          <div className={THEME.contactSection}>
            <div className="flex flex-col">
              <Link href="/" className={THEME.logoWrapper}>
                <Image
                  src={settings.logo || "/unbrenlogo.svg"}
                  alt="UNBREN. Logo"
                  width={180}
                  height={54}
                  priority
                  className={THEME.logo}
                  suppressHydrationWarning
                />
              </Link>

              <div className={THEME.contactInfoWrapper}>
                {/* Email */}
                <div className={THEME.contactItem}>
                  <p className={THEME.contactLabel}>Intrebari:</p>
                  <a
                    href={`mailto:${settings.email || "hello@unbren.ro"}`}
                    className={THEME.contactValue}
                  >
                    {settings.email || "hello@unbren.ro"}
                  </a>
                </div>

                {/* Contact Rapid */}
                <div className={THEME.contactItem}>
                  <p className={THEME.contactLabel}>Contact:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {settings.whatsappNumber && (
                      <>
                        <a
                          href={`tel:+${settings.whatsappNumber}`}
                          className={THEME.contactValue}
                        >
                          +{settings.whatsappNumber.slice(0, 2)}{" "}
                          {settings.whatsappNumber.slice(2, 5)}{" "}
                          {settings.whatsappNumber.slice(5, 8)}{" "}
                          {settings.whatsappNumber.slice(8)}
                        </a>
                        <span className={THEME.contactSeparator}>/</span>
                        <a
                          href={`https://wa.me/${settings.whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={THEME.contactValue}
                        >
                          WhatsApp
                        </a>
                      </>
                    )}
                    {!settings.whatsappNumber && (
                      <a href="tel:+40700000000" className={THEME.contactValue}>
                        +40 7xx xxx xxx
                      </a>
                    )}
                  </div>
                </div>

                {/* Adresa */}
                {settings.address && (
                  <div className={THEME.contactItem}>
                    <p className={THEME.contactLabel}>Adresa:</p>
                    <div className={THEME.contactValue}>{settings.address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rândul 2: Location, Sitemap, Socials */}
          <div className={THEME.linksGrid}>
            {/* Coloana 2: Location & Clock */}
            <div className={THEME.linkColumn}>
              <h2 className={THEME.columnTitle}>(location)</h2>
              <div className="flex flex-col">
                <span className="font-regular text-lg tracking-tighter md:text-lg">
                  Iasi, Romania
                </span>
                <span className="font-regular text-lg tracking-tighter uppercase md:text-lg">
                  {time || "00:00:00 AM"}
                </span>
              </div>
            </div>

            {/* Coloana 3: Sitemap */}
            <div className={THEME.linkColumn}>
              <h2 className={THEME.columnTitle}>(sitemap)</h2>
              <nav className="flex flex-col">
                {EVENTS_FOOTER_SITEMAP.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={THEME.linkItem}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Coloana 4: Socials */}
            <div className={THEME.linkColumn}>
              <h2 className={THEME.columnTitle}>(socials)</h2>
              <nav className="flex flex-col">
                {(settings.socialLinks && settings.socialLinks.length > 0
                  ? settings.socialLinks
                  : FALLBACK_SOCIAL_LINKS.map((s) => ({
                      platform: s.platform,
                      url: s.url,
                    }))
                ).map((social: { platform: string; url: string }) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={THEME.linkItem}
                  >
                    {social.platform}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={THEME.bottomWrapper}>
          <p className={THEME.bottomText} suppressHydrationWarning>
            © {currentYear} UNBREN. Toate drepturile rezervate.
          </p>
          <div className={THEME.bottomLinksWrapper}>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={THEME.bottomLink}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EventsFooter;
