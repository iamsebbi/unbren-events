import { useSyncExternalStore } from "react";

/**
 * Hook for responsive checks using useSyncExternalStore to avoid cascading renders.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false; // Default for SSR
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
