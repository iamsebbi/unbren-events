"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/events/Button";

interface MobileOfferCardProps {
  buttonHref: string;
  label: string;
  heading: string;
  buttonLabel: string;
}

const THEME = {
  container:
    "absolute right-0 bottom-10 left-0 z-20 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden",
  inner: "mx-auto w-full max-w-[28rem]",
  glass:
    " border border-[#f7f4ed]/15 bg-[#f7f4ed]/8 p-4 backdrop-blur-xl shadow-2xl saturate-180  flex flex-col items-start gap-2",
  label:
    "mb-1 font-sans text-[10px] tracking-[0.24em] text-[#f7f4ed]/50 uppercase",
  content:
    "mb-3 font-sans text-lg font-bold leading-tight tracking-tight text-[#f7f4ed]",
  button:
    "border-[#f7f4ed] bg-transparent text-[#f7f4ed] hover:bg-[#f7f4ed] hover:text-[#1f1f1f]",
  animation: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    delay: 1.05,
    duration: 0.7,
  },
} as const;

const MobileOfferCard: React.FC<MobileOfferCardProps> = ({
  buttonHref,
  label,
  heading,
  buttonLabel,
}) => {
  return (
    <motion.div
      initial={THEME.animation.initial}
      animate={THEME.animation.animate}
      transition={{
        delay: THEME.animation.delay,
        duration: THEME.animation.duration,
      }}
      className={THEME.container}
    >
      <div className={THEME.inner}>
        <div className={THEME.glass}>
          <p className={THEME.label}>{label}</p>
          <h3 className={THEME.content}>{heading}</h3>
          <Button
            text={buttonLabel}
            href={buttonHref}
            className={THEME.button}
            dotClassName="bg-[#f7f4ed]"
            hoverTextClassName="text-[#1f1f1f]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileOfferCard;
