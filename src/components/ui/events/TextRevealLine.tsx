"use client";

import { motion, Variants, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealLine {
  content: string;
  className?: string;
}

interface TextRevealProps {
  text: string | string[] | TextRevealLine[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
  stagger = 0.1,
  as: Component = "h1",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    initial: { y: shouldReduceMotion ? 0 : "150%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.6 : 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const lines: TextRevealLine[] = Array.isArray(text)
    ? text.map((line) =>
        typeof line === "string" ? { content: line } : line,
      )
    : [{ content: text }];

  return (
    <Component
      className={cn(
        "font-sans font-regular tracking-tighter leading-[0.9]",
        className,
      )}
    >
      <motion.span
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        className="block"
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={cn(
              "overflow-hidden pt-2 -mt-2 pb-2 -mb-4",
              line.className,
            )}
          >
            <motion.span variants={itemVariants} className="block">
              {line.content}
            </motion.span>
          </div>
        ))}
      </motion.span>
    </Component>
  );
};

export default TextReveal;
