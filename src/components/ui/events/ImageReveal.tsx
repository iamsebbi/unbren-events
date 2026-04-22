"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  triggerKey: string | number;
  aspectRatio?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  sizes?: string;
}

const curtainVariants = {
  initial: { y: "0%" },
  animate: {
    y: "-100%",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    y: "-100%", // Maintain position on exit to let the wait mode handle the switch
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants = {
  initial: { scale: 1.15 },
  animate: {
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  triggerKey,
  aspectRatio = "aspect-square",
  className,
  objectFit = "cover",
  sizes = "100vw",
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-(--color-events-border)/10",
        aspectRatio,
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${triggerKey}`}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          className="relative h-full w-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={cn(
              objectFit === "cover" ? "object-cover" : "object-contain",
            )}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`curtain-${triggerKey}`}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 z-10 bg-(--color-events-bg)"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 z-20" />
    </div>
  );
};

export default ImageReveal;
