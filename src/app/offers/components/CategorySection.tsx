"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { OfferCategory, Package } from "@/app/sanity/types";

/* The `const THEME` object in the code snippet is defining a set of styling themes for different parts
of a React component. Each key in the `THEME` object corresponds to a specific section or element
within the component, such as section styling, header styling, card styling, etc. */
const THEME = {
  section: {
    padding: "py-12 px-6 md:py-24 md:px-12 lg:py-16 lg:px-8",
    paddingOuter: "px-4",
    border: "border-b border-[var(--color-events-border)]",
    wrapper: "max-w-screen-2xl mx-auto",
  },
  header: {
    wrapper: "flex flex-col gap-4 mb-16 px-1",
    subtitle:
      "block text-sm uppercase tracking-[0.1em] text-(--color-events-muted)",
    description:
      "max-w-xl text-base md:text-lg text-(--color-events-muted) leading-snug",
    title:
      "text-[clamp(2rem,6vw,4rem)] font-medium tracking-tighter uppercase leading-[0.85]",
  },
  grid: "flex flex-col items-stretch gap-4 md:flex-row md:flex-wrap md:justify-center md:items-start md:gap-8",
  card: {
    base: "relative flex w-full shrink-0 flex-col overflow-hidden border p-4 transition-all duration-500 aspect-[5/7] md:w-[350px] md:h-[490px] md:aspect-auto md:p-6 lg:w-[380px] lg:h-[530px] xl:w-[420px] xl:h-[580px]",
    default:
      "border-(--color-events-border) hover:border-(--color-events-text)",
    recommended:
      "border-(--color-events-text) bg-(--color-events-text) text-(--color-events-bg)",
  },
  badge: "absolute top-0 right-0 p-4",
  cardHeader: {
    wrapper: "mb-1 flex flex-col justify-end",
    duration: {
      base: "mb-1 block text-sm font-bold tracking-tight uppercase",
      default: "text-(--color-events-muted)",
      recommended: "text-(--color-events-bg) opacity-70",
    },
    name: "text-2xl font-medium uppercase tracking-tight leading-tight",
  },
  features: {
    list: "flex flex-col flex-1 gap-2 overflow-hidden",
    item: "flex items-start gap-2",
    icon: {
      base: "mt-1 shrink-0",
      default: "text-[var(--color-events-muted)]",
      recommended: "text-[var(--color-events-bg)]",
    },
    text: {
      base: "text-sm leading-tight",
      default: "text-[var(--color-events-text)]/90",
      recommended: "text-[var(--color-events-bg)]",
    },
  },
  price: {
    wrapper: "mt-auto pt-1",
    amount: "text-3xl font-bold tracking-tighter",
  },
  cta: {
    wrapper: "mt-3 flex justify-end",
    base: "inline-flex min-h-11 min-w-11 items-center justify-center border px-5 py-2 text-base font-semibold  tracking-tigher transition-all duration-300 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg)",
    default:
      "border-(--color-events-border) text-(--color-events-text) hover:border-(--color-events-text)",
    recommended:
      "border-(--color-events-bg) text-(--color-events-bg) hover:bg-(--color-events-bg) hover:text-(--color-events-text)",
  },
} as const;

export interface OfferSelectionPayload {
  category: string;
  packageName: string;
  duration: string;
  benefits: string[];
}

const PackageCard = ({
  pkg,
  category,
  onSelectPackage,
}: {
  pkg: Package;
  category: OfferCategory;
  onSelectPackage: (payload: OfferSelectionPayload) => void;
}) => {
  const isRec = pkg.recommended;

  return (
    <div
      className={cn(
        THEME.card.base,
        isRec ? THEME.card.recommended : THEME.card.default,
      )}
    >
      {isRec && (
        <div className={THEME.badge}>
          <span className="text-xs font-bold tracking-widest text-(--color-events-bg) uppercase">
            Popular
          </span>
        </div>
      )}

      <div className={THEME.cardHeader.wrapper}>
        <span
          className={cn(
            THEME.cardHeader.duration.base,
            isRec
              ? THEME.cardHeader.duration.recommended
              : THEME.cardHeader.duration.default,
          )}
        >
          {pkg.duration}
        </span>
        <h3 className={THEME.cardHeader.name}>{pkg.name}</h3>
      </div>

      {pkg.description && (
        <p
          className={cn(
            "mb-4 text-sm leading-snug",
            isRec ? "text-(--color-events-bg)" : "text-(--color-events-muted)",
          )}
        >
          {pkg.description}
        </p>
      )}

      <div className={cn(THEME.price.wrapper, "border-b pb-3")}>
        <p className={THEME.price.amount}>{pkg.price}</p>
      </div>

      <ul className={cn(THEME.features.list, "mt-3", "space-y-1")}>
        {pkg.features.map((feature) => (
          <li key={feature} className={THEME.features.item}>
            <Check
              size={14}
              className={cn(
                THEME.features.icon.base,
                isRec
                  ? THEME.features.icon.recommended
                  : THEME.features.icon.default,
              )}
            />
            <span
              className={cn(
                THEME.features.text.base,
                isRec
                  ? THEME.features.text.recommended
                  : THEME.features.text.default,
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className={THEME.cta.wrapper}>
        <button
          type="button"
          onClick={() =>
            onSelectPackage({
              category: category.title,
              packageName: pkg.name,
              duration: pkg.duration,
              benefits: pkg.features,
            })
          }
          className={cn(
            THEME.cta.base,
            isRec ? THEME.cta.recommended : THEME.cta.default,
          )}
        >
          Solicită Ofertă
        </button>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  category: OfferCategory;
  onSelectPackage: (payload: OfferSelectionPayload) => void;
}

const CategorySection = ({
  category,
  onSelectPackage,
}: CategorySectionProps) => {
  return (
    <section
      className={cn(
        THEME.section.padding,
        THEME.section.border,
        THEME.section.paddingOuter,
      )}
    >
      <div className={THEME.section.wrapper}>
        <div className={THEME.header.wrapper}>
          <span className={THEME.header.subtitle}>{category.subtitle}</span>
          <p className={THEME.header.description}>{category.description}</p>
          <h2 className={THEME.header.title}>{category.title}</h2>
        </div>

        <div className={THEME.grid}>
          {category.packages.map((pkg) => (
            <PackageCard
              key={pkg.name}
              pkg={pkg}
              category={category}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
