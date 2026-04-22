import { useState, useEffect } from "react";

/**
 * Hook to track scroll position, scrolled state, visibility, and direction.
 */
export function useWindowScroll(threshold: number = 0) {
  const [scrollData, setScrollData] = useState({
    y: typeof window !== "undefined" ? window.scrollY : 0,
    isScrolled: false,
    isVisible: true,
    direction: "up" as "up" | "down",
  });

  useEffect(() => {
    // effect:audited — window scroll listener
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isVisible = currentScrollY < lastScrollY || currentScrollY < 100;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      setScrollData({
        y: currentScrollY,
        isScrolled: currentScrollY > threshold,
        isVisible,
        direction,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollData;
}
