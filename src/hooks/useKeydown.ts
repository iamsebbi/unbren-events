import { useEffect } from "react";

/**
 * Hook to handle keydown events.
 */
export function useKeydown(key: string | string[], callback: (event: KeyboardEvent) => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = Array.isArray(key) ? key : [key];
      if (keys.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, enabled]);
}
