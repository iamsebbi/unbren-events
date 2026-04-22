import { useEffect } from "react";

/**
 * Hook for locking body scroll (e.g., when a modal or mobile menu is open).
 */
export const useLockBodyScroll = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
};
