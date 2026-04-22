"use client";

import { useEffect } from "react";
import Button from "@/components/ui/events/Button";

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Events Route Error:", error);
  }, [error]);

  return (
    <div className="events-theme flex min-h-[60vh] flex-col items-center justify-center bg-(--color-events-bg) px-4 py-20 text-center">
      <div className="max-w-md">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-(--color-events-text) md:text-5xl">
          Ups! Ceva nu a mers.
        </h1>
        <p className="mb-10 text-lg text-(--color-events-muted)">
          O eroare neașteptată a apărut în secțiunea evenimente. Te rugăm să încerci din nou sau să revii mai târziu.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={reset}
            text="Încearcă din nou"
            className="border-(--color-events-border)"
            dotClassName="bg-(--color-events-text)"
            hoverTextClassName="group-hover:!text-(--color-events-bg)"
          />
        </div>
      </div>
    </div>
  );
}
