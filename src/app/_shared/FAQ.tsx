"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  label?: string;
  description?: string;
  className?: string;
  sectionClassName?: string;
}

const FAQItemComponent = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="overflow-hidden border-b border-(--color-events-border) font-sans last:border-0">
      <button
        onClick={onToggle}
        className="group flex min-h-11 w-full items-center justify-between py-6 text-left transition-colors hover:text-(--color-events-muted) focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none active:scale-[0.985]"
      >
        <span className="pr-8 text-lg font-medium tracking-tight uppercase md:text-xl">
          {question}
        </span>
        <div className="shrink-0 rounded-full border border-(--color-events-border) p-1 transition-colors group-hover:border-(--color-events-muted)">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-xl pb-8 text-base leading-relaxed text-(--color-events-muted)">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({
  items,
  title = "ÎNTREBĂRI FRECVENTE.",
  label = "( FAQ )",
  description,
  className,
  sectionClassName,
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={cn(
        "bg-(--color-events-bg) px-6 py-24 md:px-12 md:py-32",
        sectionClassName,
      )}
    >
      <div className={cn("mx-auto max-w-screen-2xl", className)}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-4">
            {label && (
              <span className="mb-4 block text-sm tracking-widest text-(--color-events-muted) uppercase md:mb-6 md:text-base">
                {label}
              </span>
            )}
            <h2 className="font-regular mb-6 text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] tracking-tighter text-(--color-events-text) uppercase">
              {title}
            </h2>
            {description && (
              <p className="max-w-sm text-lg leading-snug text-(--color-events-muted) md:text-xl">
                {description}
              </p>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <FAQItemComponent
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
