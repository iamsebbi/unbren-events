import { useState, useEffect } from "react";

/**
 * Hook to sync state with localStorage.
 */
export function useLocalStorageState<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error(error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
