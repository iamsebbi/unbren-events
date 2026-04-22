"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
  email: string;
  phoneHref: string;
  phoneLabel: string;
  legalLinks: {
    privacyHref: string;
    termsHref: string;
    cookieHref: string;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Toate atributele de design centralizate
// ═══════════════════════════════════════════════════════════════════════════════
const THEME = {
  // ── [CONTAINER] Wrapper principal ─────────────────────────────────────────
  container: {
    padding: "p-6 sm:p-8 md:p-10",
    paddingBottom: "pb-48 sm:pb-52 md:pb-56", // Incremented to avoid browser UI overlap
    position:
      "fixed left-0 right-0 z-40 w-full overflow-hidden top-16 md:top-20", // Aligned with Navbar height
    background: "bg-(--color-events-bg)", // Removed border-t
  },

  // ── [HEADER] Link-uri principale navigație ───────────────────────────────
  nav: {
    list: "flex flex-col gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 mb-24 sm:mb-14 md:mb-16", // Reduced spacing
    link: "font-sans text-(--color-events-text) hover:text-(--color-events-accent) transition-colors uppercase",
    size: "text-3xl sm:text-4xl md:text-5xl", // Slightly reduced size
  },

  // ── [FOOTER] Secțiunea inferioară (Contact & Legal) ──────────────────────
  footer: {
    base: "mt-auto border-t border-(--color-events-border)/50 pt-6 sm:pt-8 md:pt-10",
  },

  // ── [CONTACT] Informații contact (Email & Tel) ───────────────────────────
  contact: {
    container: "flex flex-col gap-2 sm:gap-2 md:gap-3 mb-10 sm:mb-12 md:mb-14",
    link: "text-[var(--color-events-text)] hover:text-[var(--color-events-muted)] transition-colors tracking-tighter block",
    size: "text-2xl sm:text-2xl md:text-3xl", // Slightly reduced size
  },

  // ── [LEGAL] Link-uri Privacy & Terms ─────────────────────────────────────
  legal: {
    container:
      "flex flex-wrap gap-x-8 gap-y-4 text-[var(--color-events-muted)] uppercase tracking-[0.2em]",
    size: "text-[9px] sm:text-[10px] md:text-xs", // Slightly reduced size
    link: "hover:text-[var(--color-events-text)] transition-colors",
  },
};

const containerVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.2,
    },
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const listVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: "105%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const footerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.65,
      staggerChildren: 0.08,
    },
  },
  exit: { opacity: 0 },
};

const MobileMenu = ({
  isOpen,
  onClose,
  links,
  email,
  phoneHref,
  phoneLabel,
  legalLinks,
}: MobileMenuProps) => {
  const allLinks = links;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ top: "var(--events-sticky-attach-offset)" }}
          className={cn(
            THEME.container.position,
            THEME.container.background,
            "h-dvh",
          )}
        >
          <div
            className={cn(
              "flex h-full flex-col justify-between",
              THEME.container.padding,
              THEME.container.paddingBottom,
            )}
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={THEME.nav.list}
            >
              {allLinks.map((link) => (
                <li key={link.name} className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(THEME.nav.link, THEME.nav.size)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={footerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={THEME.footer.base}
            >
              <div className={THEME.contact.container}>
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <a
                      href={`mailto:${email}`}
                      className={cn(THEME.contact.link, THEME.contact.size)}
                    >
                      {email}
                    </a>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <a
                      href={phoneHref}
                      className={cn(THEME.contact.link, THEME.contact.size)}
                    >
                      {phoneLabel}
                    </a>
                  </motion.div>
                </div>
              </div>

              <div className={cn(THEME.legal.container, THEME.legal.size)}>
                <Link
                  href={legalLinks.privacyHref}
                  onClick={onClose}
                  className={THEME.legal.link}
                >
                  Politică de Confidențialitate
                </Link>
                <Link
                  href={legalLinks.termsHref}
                  onClick={onClose}
                  className={THEME.legal.link}
                >
                  Termeni și Condiții
                </Link>
                <Link
                  href={legalLinks.cookieHref}
                  onClick={onClose}
                  className={THEME.legal.link}
                >
                  Politică Cookie
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
