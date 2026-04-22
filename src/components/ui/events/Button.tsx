"use client";

import Link from "next/link";
import { InteractiveHoverButton } from "./InteractiveHoverButton";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  dotClassName?: string;
  hoverTextClassName?: string;
}

const Button = ({
  text,
  children,
  href,
  className,
  dotClassName,
  hoverTextClassName,
  ...props
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const displayContent = children || text;

  const content = (
    <InteractiveHoverButton
      className={cn(
        "min-h-11 min-w-11 font-sans text-base tracking-wide transition-all duration-300 active:scale-95",
        "border-(--color-events-border) bg-transparent text-(--color-events-text)",
        className,
      )}
      dotClassName={cn("bg-[var(--color-events-accent)]", dotClassName)}
      hoverTextClassName={hoverTextClassName}
      onClick={handleClick}
      {...props}
    >
      {displayContent}
    </InteractiveHoverButton>
  );

  if (href && !href.startsWith("#")) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default Button;
