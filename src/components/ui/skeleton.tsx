"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden bg-(--color-events-border)/30 rounded-md",
        className,
      )}
      {...props}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-(--color-events-text)/5 to-transparent shadow-sm"
      />
    </div>
  );
}

export { Skeleton };
