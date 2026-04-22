import { useEffect, useCallback } from "react";

/**
 * Hook for global custom events.
 */
export const useCustomEvent = <T,>(
  eventName: string,
  handler: (data: T) => void
) => {
  const eventHandler = useCallback((event: Event) => {
    const customEvent = event as CustomEvent<T>;
    handler(customEvent.detail);
  }, [handler]);

  useEffect(() => {
    window.addEventListener(eventName, eventHandler);
    return () => window.removeEventListener(eventName, eventHandler);
  }, [eventName, eventHandler]);
};
