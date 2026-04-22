"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "motion/react";
import { X } from "lucide-react";
import ContactForm, {
  type SelectedOfferContext,
} from "../../contact/components/ContactForm";

interface OfferContactModalProps {
  isOpen: boolean;
  selectedOffer: SelectedOfferContext | null;
  onClose: () => void;
  closeOnSuccess?: boolean;
}

const OfferContactModal = ({
  isOpen,
  selectedOffer,
  onClose,
  closeOnSuccess = true,
}: OfferContactModalProps) => {
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const sheetY = useMotionValue(0);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartYRef = useRef(0);

  const handleSubmitSuccess = () => {
    if (!closeOnSuccess) return;
    globalThis.setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    // effect:audited — complex modal sync (scroll lock, keydown, custom events)
    if (!isOpen) return;
    sheetY.set(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const scrollY = globalThis.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    if (!isCoarsePointer) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }
    document.documentElement.style.overflow = "hidden";

    globalThis.dispatchEvent(
      new CustomEvent("offers:modal-toggle", {
        detail: { open: true },
      }),
    );

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.documentElement.style.overflow = originalHtmlOverflow;

      globalThis.removeEventListener("keydown", handleKeyDown);
      if (!isCoarsePointer) {
        globalThis.scrollTo({ top: scrollY });
      }

      globalThis.dispatchEvent(
        new CustomEvent("offers:modal-toggle", {
          detail: { open: false },
        }),
      );
    };
  }, [isOpen, onClose, isCoarsePointer, sheetY]);

  const handleHeaderPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!isCoarsePointer) return;

    const target = event.target as HTMLElement;
    if (target.closest("[data-no-drag='true']")) return;

    dragPointerIdRef.current = event.pointerId;
    dragStartYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleHeaderPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (dragPointerIdRef.current !== event.pointerId) return;

    const deltaY = Math.max(0, event.clientY - dragStartYRef.current);
    sheetY.set(deltaY);
  };

  const endHeaderDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    shouldReleaseCapture = true,
  ) => {
    if (dragPointerIdRef.current !== event.pointerId) return;

    if (shouldReleaseCapture) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const offset = sheetY.get();
    dragPointerIdRef.current = null;

    if (offset > 90) {
      onClose();
      return;
    }

    animate(sheetY, 0, {
      duration: 0.18,
      ease: "easeOut",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && selectedOffer && (
        <motion.div
          className="fixed inset-0 z-120 bg-(--color-events-bg)/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ y: sheetY }}
            className="absolute inset-x-0 top-[8dvh] bottom-0 border-t border-(--color-events-border) bg-(--color-events-bg) shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Formular pachet selectat"
          >
            <div className="flex h-full min-h-0 flex-col">
              <div
                className="shrink-0 touch-none select-none"
                onPointerDown={handleHeaderPointerDown}
                onPointerMove={handleHeaderPointerMove}
                onPointerUp={(event) => endHeaderDrag(event)}
                onPointerCancel={(event) => endHeaderDrag(event, false)}
              >
                {isCoarsePointer && (
                  <div className="flex justify-center pt-2 pb-1">
                    <div className="h-1.5 w-12 rounded-full bg-(--color-events-border)" />
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 border-b border-(--color-events-border) px-4 py-4 md:px-6">
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-xs tracking-[0.12em] text-(--color-events-muted) uppercase">
                      Pachet selectat
                    </p>
                    <p className="truncate text-base font-medium tracking-tight text-(--color-events-text) uppercase">
                      {selectedOffer.packageName}
                    </p>
                    <p className="truncate text-sm text-(--color-events-muted)">
                      {selectedOffer.category} • {selectedOffer.duration}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    data-no-drag="true"
                    aria-label="Închide formularul"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-(--color-events-border) text-(--color-events-text) transition-colors hover:bg-(--color-events-text) hover:text-(--color-events-bg) focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none active:scale-[0.98]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div
                className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-5 pb-[env(safe-area-inset-bottom)] md:px-6 md:py-6"
                data-lenis-prevent
                onWheel={(event) => event.stopPropagation()}
                onTouchMove={(event) => event.stopPropagation()}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <ContactForm
                  variant="modal"
                  selectedOffer={selectedOffer}
                  onSubmitSuccess={handleSubmitSuccess}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferContactModal;
