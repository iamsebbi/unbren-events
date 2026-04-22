"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useCustomEvent } from "@/hooks/useCustomEvent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Button from "@/components/ui/events/Button";
import MobileMenu from "./MobileMenu";
import type { SiteSettings } from "../sanity/types";

type NavLink = { name: string; href: string };

const NAV_LINKS = [
  { name: "Toate Evenimentele", href: "/toate-evenimentele" },
  { name: "Galerie", href: "/gallery" },
  { name: "Oferte", href: "/offers" },
  { name: "Despre noi", href: "/about" },
];

interface NavbarProps {
  settings: SiteSettings;
}

function formatPhoneNumberForDisplay(number?: string) {
  if (!number) return "(07xx) xxx xxx";

  const digits = number.replaceAll(/\D/g, "");
  const local = digits.startsWith("40") ? `0${digits.slice(2)}` : digits;

  if (local.length !== 10) return `+${digits}`;

  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}

const Navbar = ({ settings }: NavbarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAfterOffersCategorySection, setIsAfterOffersCategorySection] =
    useState(false);

  const navLinks: NavLink[] =
    settings?.navItems?.length > 0
      ? settings.navItems
          .map((item) => ({ 
            name: (item.href === "/events/evenimente" || item.href === "/evenimente") ? "Toate Evenimentele" : item.label, 
            href: (item.href === "/events/evenimente" || item.href === "/evenimente") ? "/toate-evenimentele" : item.href 
          }))
          .filter(
            (item) =>
              item.href !== "/contact" &&
              item.name?.toLowerCase() !== "contact",
          )
      : NAV_LINKS;

  const mobileMenuLinks = navLinks.some((link) => link.href === "/")
    ? navLinks
    : [{ name: "Home", href: "/" }, ...navLinks];

  const mobileMenuLinksWithContact = mobileMenuLinks.some(
    (link) =>
      link.href === "/contact" || link.name?.toLowerCase() === "contact",
  )
    ? mobileMenuLinks
    : [...mobileMenuLinks, { name: "Contact", href: "/contact" }];

  const email = settings?.email || "hello@unbren.ro";
  const whatsappNumber = settings?.whatsappNumber || "40700000000";
  const phoneHref = `tel:+${whatsappNumber}`;
  const phoneLabel = formatPhoneNumberForDisplay(whatsappNumber);

  const legalLinks = {
    privacyHref:
      settings?.legalLinks?.privacyHref ||
      "/politica-de-confidentialitate",
    termsHref: settings?.legalLinks?.termsHref || "/termeni-si-conditii",
    cookieHref: settings?.legalLinks?.cookieHref || "/politica-cookie",
  };

  const { isScrolled, isVisible: scrollVisible } = useWindowScroll(50);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Derived visibility logic based on path and scroll
  const isGalleryPage = pathname === "/gallery";
  const isOffersPage = pathname === "/offers";
  const shouldHideOnScrollDown =
    isGalleryPage ||
    (isOffersPage && isMobile && !isAfterOffersCategorySection);

  const isNavbarVisible = shouldHideOnScrollDown ? scrollVisible : true;

  useCustomEvent<{ afterCategorySection?: boolean }>(
    "offers:category-section-exit",
    (detail) => {
      setIsAfterOffersCategorySection(Boolean(detail?.afterCategorySection));
    }
  );



  // Prevent scroll when menu is open
  useLockBodyScroll(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Funcție pentru scroll sus când apeși pe Logo
  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Dynamic Styles
  // ─────────────────────────────────────────────────────────────────────────

  const navStyle = isMenuOpen
    ? "bg-[var(--color-events-bg)] "
    : isScrolled
      ? "bg-[var(--color-events-bg)]/80 backdrop-blur-md backdrop-saturate-150"
      : "bg-transparent";

  // Determinam daca suntem deasupra unui Hero intunecat (ex: video-ul de pe home)
  // Daca nu am facut scroll si suntem pe pagina principala, fortam stilul "Light" (elemente albe)
  // EXCEPTIE: Daca meniul este deschis, navbar-ul primeste background-ul temei, deci logoul trebuie sa urmeze tema.
  const isOverDarkPageHero =
    !isScrolled && pathname === "/" && !isMenuOpen;

  const linkStyle = isOverDarkPageHero
    ? "text-white/90"
    : "text-[var(--color-events-text)]";

  const iconColor = isOverDarkPageHero ? "white" : "var(--color-events-text)";

  return (
    <>
      <nav
        style={{ height: "var(--events-navbar-height)" }}
        className={`fixed top-0 z-50 flex h-16 w-full items-center transition-all duration-500 ease-in-out md:h-20 ${navStyle} ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex w-full items-center justify-between px-6 md:px-12">
          <Link href="/" className="z-50" onClick={handleLogoClick}>
            <Image
              width={200}
              height={60}
              src={settings.logo || "/unbrenlogo.svg"}
              alt="UNBREN. Logo"
              priority
              className="logo-theme h-5 w-auto transition-all duration-300 md:h-8"
              style={
                isOverDarkPageHero
                  ? { filter: "brightness(0) invert(1)" }
                  : undefined
              }
            />
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-md lg:text-md font-regular transition-colors duration-300 hover:text-(--color-events-accent) hover:underline ${linkStyle}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {pathname !== "/contact" && (
              <div className="hidden lg:block">
                <Button
                  text="Contact"
                  href="/contact"
                  className={
                    isOverDarkPageHero
                      ? "border-white text-white"
                      : "border-(--color-events-text)"
                  }
                  dotClassName={
                    isOverDarkPageHero
                      ? "bg-white"
                      : "bg-[var(--color-events-text)]"
                  }
                  hoverTextClassName={
                    isOverDarkPageHero
                      ? "group-hover:!text-black"
                      : "group-hover:!text-[var(--color-events-bg)]"
                  }
                />
              </div>
            )}

            <button
              type="button"
              className="group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block h-0.5 w-7 transition-colors duration-300"
                style={{
                  backgroundColor: `var(--theme-icon-color, ${iconColor})`,
                }}
              />
              <motion.span
                animate={
                  isMenuOpen ? { rotate: -45, y: -0.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block h-0.5 w-7 transition-colors duration-300"
                style={{
                  backgroundColor: `var(--theme-icon-color, ${iconColor})`,
                }}
              />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={mobileMenuLinksWithContact}
        email={email}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        legalLinks={legalLinks}
      />
    </>
  );
};

export default Navbar;
