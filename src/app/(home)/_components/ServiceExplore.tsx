"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/image";
import type { Service, SanityImage } from "../../sanity/types";

interface StudioCard {
  image: SanityImage | string | undefined;
  alt: string;
  label: string;
  href: string;
  aspectRatio: string;
}

const FALLBACK_CARDS: StudioCard[] = [
  {
    image: "/nunta_ta.webp",
    alt: "Wedding couple",
    label: "Nunta ta",
    href: "/events/nunta-ta",
    aspectRatio: "aspect-[3/4] md:aspect-[9/16]",
  },
  {
    image: "/evenimente.webp",
    alt: "Event celebration",
    label: "Evenimente",
    href: "/events/evenimente",
    aspectRatio: "aspect-[4/3] md:aspect-square lg:aspect-[4/3]",
  },
  {
    image: "/portrete.webp",
    alt: "Portrait",
    label: "Portrete",
    href: "/events/portrete",
    aspectRatio: "aspect-[3/4] md:aspect-[4/6]",
  },
];

interface ImageCardProps {
  card: StudioCard;
  priority?: boolean;
}

const ImageCard = ({ card, priority = false }: ImageCardProps) => (
  <div className="flex w-full flex-col gap-0">
    <Link
      href={card.href}
      className="group block w-full focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none"
    >
      <div
        className={`relative w-full overflow-hidden bg-black hover:cursor-pointer ${card.aspectRatio}`}
      >
        <Image
          src={
            typeof card.image === "string"
              ? card.image
              : card.image
                ? urlFor(card.image).width(800).url()
                : "/nunta_ta.webp" // ultimate fallback
          }
          alt={card.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="scale-110 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </Link>

    <div className="flex items-center justify-between text-base text-(--color-events-muted)">
      <span className="flex min-h-11 items-center">{card.label}</span>
      <Link
        href={card.href}
        aria-label={`Explorează serviciul ${card.label}`}
        className="flex min-h-11 min-w-11 animate-pulse items-center transition-colors hover:text-(--color-events-text) focus-visible:ring-2 focus-visible:ring-(--color-events-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-events-bg) focus-visible:outline-none active:scale-95"
      >
        Exploreaza
      </Link>
    </div>
  </div>
);

interface ServiceExploreProps {
  items?: Service[];
}

const ServiceExplore = ({ items }: ServiceExploreProps) => {
  const cards =
    items && items.length > 0
      ? items.slice(0, 3).map((s, i) => ({
          // #3: Use dedicated coverImage, fall back to hero.image
          image: s.coverImage || s.hero?.image,
          alt: s.title,
          // #4: Use shortTitle if set, fall back to full title
          label: s.accordionControl?.shortTitle || s.title,
          href: `/events/${s.slug.current}`,
          aspectRatio:
            FALLBACK_CARDS[i]?.aspectRatio ?? "aspect-3/4 md:aspect-9/16",
        }))
      : FALLBACK_CARDS;

  return (
    <section className="pt-5 pb-20">
      <div className="flex w-full flex-col items-start gap-8 px-4 md:grid md:grid-cols-3 md:gap-4 md:px-8">
        {cards.map((card, index) => (
          <ImageCard
            key={`${card.href}-${card.label}-${index}`}
            card={card}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceExplore;
