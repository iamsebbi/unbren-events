"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Button from "@/components/ui/events/Button";

export default function NotFound() {
  return (
    <div className="events-theme min-h-screen bg-(--color-events-bg) font-sans text-(--color-events-text) selection:bg-(--color-events-accent) selection:text-white">
      <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        {/* Background Decorative Element */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] leading-none font-bold tracking-tighter select-none">
            404
          </div>
        </div>

        <div className="relative z-10 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="mb-6 block text-xs font-medium tracking-widest text-(--color-events-accent) uppercase">
              Eroare 404
            </span>

            <h1 className="font-regular mb-8 text-6xl leading-tight tracking-tighter md:text-8xl">
              PAGINA NU A FOST <br />
              <span className="font-events text-(--color-events-accent) italic">
                GĂSITĂ.
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-md text-sm leading-snug tracking-tighter text-(--color-events-muted) uppercase md:text-base">
              Se pare că evenimentul sau pagina pe care o cauți s-a mutat sau nu
              mai există.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Button
                text="Înapoi la evenimente"
                href="/"
                className="border-(--color-events-text) px-10 py-3 hover:border-(--color-events-accent)"
              />

              <Link
                href="/"
                className="text-xs tracking-widest text-(--color-events-muted) uppercase transition-colors duration-300 hover:text-(--color-events-text)"
              >
                Către UNBREN.
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Year info */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-(--color-events-muted) uppercase opacity-50"
          suppressHydrationWarning
        >
          UNBREN. &copy; {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
}
