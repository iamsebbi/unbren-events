import { useEffect } from "react";

/**
 * Hook to update document title.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    // effect:audited — document title sync
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
