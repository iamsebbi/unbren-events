"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderControlsProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  iconSize?: number;
  buttonClassName?: string;
}

const SliderControls = ({
  onPrev,
  onNext,
  className,
  iconSize = 24,
  buttonClassName,
}: SliderControlsProps) => {
  const baseButtonStyle = cn(
    "p-3 min-h-[44px] min-w-[44px] border border-[var(--color-events-border)]",
    "hover:bg-[var(--color-events-accent)] hover:cursor-pointer hover:text-[var(--color-events-bg)]",
    "transition-colors duration-300 flex items-center justify-center group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg)",
    buttonClassName,
  );

  return (
    <div className={cn("flex gap-4", className)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev?.();
        }}
        className={baseButtonStyle}
        aria-label="Previous"
      >
        <ArrowLeft
          size={iconSize}
          className="transition-transform group-active:-translate-x-1"
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext?.();
        }}
        className={baseButtonStyle}
        aria-label="Next"
      >
        <ArrowRight
          size={iconSize}
          className="transition-transform group-active:translate-x-1"
        />
      </button>
    </div>
  );
};

export default SliderControls;
