"use client";

import { useEffect } from "react";
import "@/styles/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="ro">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-4 text-3xl font-bold">A apărut o eroare critică</h1>
            <p className="mb-8 text-gray-400">
              Ne cerem scuze, dar ceva nu a funcționat corect la nivel de sistem.
            </p>
            <button
              onClick={() => reset()}
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition-transform hover:scale-105 active:scale-95"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
