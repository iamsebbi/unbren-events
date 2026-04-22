"use client";

import React from "react";
import { useKeydown } from "@/hooks/useKeydown";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import SliderControls from "@/components/ui/events/SliderControls";
import ImageReveal from "@/components/ui/events/ImageReveal";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: string;
    image: string;
    description: string;
    tag: string;
    projectTitle: string;
  }>;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONFIG — Centralized Design Attributes
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
  // ── [OVERLAY] Backdrop & Layering ─────────────────────────────────────────
  overlay:
    "fixed inset-0 z-[100] flex items-center justify-center bg-(--color-events-bg)/95 backdrop-blur-xl",

  // ── [CONTAINER] Main Wrappers ─────────────────────────────────────────────
  container: {
    main: "relative w-full h-full flex items-center justify-center p-4  md:p-8",
    stack: cn(
      "relative flex flex-col items-center justify-center gap-4 sm:gap-6",
      "w-full max-w-[88vw] sm:max-w-none lg:max-w-6xl mx-auto",
      "-mt-28 sm:-mt-36 md:mt-0", // Shift entire UI higher on small screens
    ),
  },

  // ── [HEADER] Top Section (Info & Counter) ─────────────────────────────────
  header: {
    wrapper: "w-full flex items-end justify-between gap-4",
  },

  // ── [IMAGE] Hero Content ──────────────────────────────────────────────────
  image: {
    wrapper: cn(
      "relative w-full overflow-hidden flex items-center justify-center bg-transparent",
      "aspect-[3/4] max-h-[55vh] sm:max-h-[75vh]", // Aligned with stack
      "lg:aspect-auto lg:h-[70vh] lg:max-h-[800px]", // Desktop fallback
    ),
    objectFit: "cover" as const,
  },

  // ── [FOOTER] Bottom Section (Close & Controls) ────────────────────────────
  footer: {
    wrapper: "w-full flex items-center justify-between gap-4",
  },

  // ── [INFO] Meta & Typography ─────────────────────────────────────────────
  info: {
    wrapper: "flex flex-col items-start text-left gap-1 md:gap-2",
    meta: {
      wrapper: "flex items-center gap-2 md:gap-3",
      text: "text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-(--color-events-muted)",
      line: "w-3 md:w-4 h-px bg-(--color-events-border)",
    },
    title: {
      fontSize: "text-lg md:text-2xl lg:text-3xl",
      fontWeight: "font-sans",
      tracking: "tracking-tighter",
      color: "text-(--color-events-text)",
    },
  },

  // ── [COUNTER] Image Indicator ────────────────────────────────────────────
  counter: {
    wrapper: "px-3 py-1 bg-(--color-events-border)/30 w-fit",
    text: "text-[9px] md:text-[10px] font-medium text-(--color-events-text)/70 uppercase tracking-widest",
  },

  // ── [CLOSE] Close Button (Matching SliderControls) ────────────────────────
  closeButton: {
    wrapper: cn(
      "p-4 md:p-3 border border-[var(--color-events-border)]",
      "hover:bg-[var(--color-events-text)] hover:cursor-pointer hover:text-[var(--color-events-bg)]",
      "transition-colors duration-300 flex items-center justify-center group",
    ),
    icon: {
      size: 20,
      strokeWidth: 2,
    },
  },

  // ── [CONTROLS] Navigation ────────────────────────────────────────────────
  controls: {
    wrapper: "",
    iconSize: 20,
    button: "p-4 md:p-3",
  },
} as const;

const ImageLightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}: ImageLightboxProps) => {
  useKeydown("Escape", onClose, isOpen);
  useKeydown("ArrowLeft", onPrev, isOpen);
  useKeydown("ArrowRight", onNext, isOpen);

  // Prevent scroll when open
  useLockBodyScroll(isOpen);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(THEME.overlay, "touch-none")}
          onClick={onClose}
        >
          <div className={cn(THEME.container.main)}>
            <div
              className={cn(THEME.container.stack)}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER: Info & Counter */}
              <div className={cn(THEME.header.wrapper)}>
                <div className={cn(THEME.info.wrapper)}>
                  <div className={cn(THEME.info.meta.wrapper)}>
                    <span className={cn(THEME.info.meta.text)}>
                      {currentImage.tag}
                    </span>
                    <div className={cn(THEME.info.meta.line)} />
                    <span className={cn(THEME.info.meta.text)}>
                      {currentImage.projectTitle}
                    </span>
                  </div>
                  <h2
                    className={cn(
                      THEME.info.title.fontSize,
                      THEME.info.title.fontWeight,
                      THEME.info.title.tracking,
                      THEME.info.title.color,
                    )}
                  >
                    {currentImage.description}
                  </h2>
                </div>

                <div className={cn(THEME.counter.wrapper)}>
                  <span className={cn(THEME.counter.text)}>
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              </div>

              {/* IMAGE: Hero Section */}
              <div className={cn(THEME.image.wrapper)}>
                <ImageReveal
                  src={currentImage.image}
                  alt={currentImage.description}
                  triggerKey={currentIndex}
                  aspectRatio="h-full w-full"
                  objectFit={THEME.image.objectFit}
                />
              </div>

              {/* FOOTER: Close & Controls */}
              <div className={cn(THEME.footer.wrapper)}>
                <button
                  className={cn(THEME.closeButton.wrapper)}
                  onClick={onClose}
                >
                  <X
                    size={THEME.closeButton.icon.size}
                    strokeWidth={THEME.closeButton.icon.strokeWidth}
                  />
                </button>

                <SliderControls
                  onPrev={onPrev}
                  onNext={onNext}
                  className={cn(THEME.controls.wrapper)}
                  iconSize={THEME.controls.iconSize}
                  buttonClassName={cn(THEME.controls.button)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
