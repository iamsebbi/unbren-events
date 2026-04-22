"use client";

import Image from "next/image";
import { SanityImage } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

interface QuoteSectionProps {
  quote: string;
  image: SanityImage | string;
}

const QuoteSection = ({ quote, image }: QuoteSectionProps) => {
  const imageUrl = typeof image === "string" ? image : urlFor(image).url();
  return (
    <section className="bg-(--color-events-bg) px-4 pt-12 pb-12 md:px-8 md:pt-20 md:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Quote Part */}
        <div className="mb-12 max-w-3xl text-left md:mb-20">
          <blockquote className="text-2xl leading-tight font-normal tracking-tight text-(--color-events-text) md:text-3xl lg:text-4xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>

        {/* Image Part */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Visual anchor"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
