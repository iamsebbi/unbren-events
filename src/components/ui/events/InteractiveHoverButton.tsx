import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dotClassName?: string;
  hoverTextClassName?: string;
}

export function InteractiveHoverButton({
  children,
  className,
  dotClassName,
  hoverTextClassName,
  ...props
}: Readonly<InteractiveHoverButtonProps>) {
  return (
    <button
      className={cn(
        "group bg-background relative min-h-11 min-w-11 cursor-pointer overflow-hidden border p-2 px-6 text-center font-semibold focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]",
            dotClassName,
          )}
        ></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>

      <div
        className={cn(
          "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100",
          hoverTextClassName || "text-white",
        )}
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
}

export default InteractiveHoverButton;
