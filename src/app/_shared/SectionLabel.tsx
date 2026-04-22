import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionLabel = ({
  label,
  children,
  className,
}: Readonly<SectionLabelProps>) => {
  return (
    <span
      className={cn(
        "block text-xs font-medium tracking-[0.1em] text-(--color-events-muted) uppercase md:text-sm",
        className,
      )}
    >
      {label ?? children}
    </span>
  );
};

export default SectionLabel;
