"use client";

import React from "react";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const { isScrolled: isVisible } = useWindowScroll(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className={cn(
            "fixed z-50 p-3 transition-colors duration-300",
            // Poziționare (ajustată pentru desktop)
            "bottom-10 right-10",
            // Stil Pătrat & Culori
            "border border-[var(--color-events-border)] bg-[var(--color-events-bg)]/80 backdrop-blur-sm",
            "text-[var(--color-events-text)] hover:border-[var(--color-events-accent)]",
          )}
          aria-label="Scroll to top"
        >
          {/* Animație de Bounce Controlată */}
          <motion.div
            animate={{
              y: [0, -6, 0], // Se mișcă 6 pixeli în sus și revine
            }}
            transition={{
              duration: 2, // Durată mare pentru a fi "lentă"
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp size={20} strokeWidth={2} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
