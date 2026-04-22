import { useEffect, EffectCallback } from "react";

/**
 * Approved escape hatch for one-time external sync on mount.
 * This is useEffect(fn, []) wrapped in a named hook.
 */
export const useMountEffect = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};
