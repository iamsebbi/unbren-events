"use client";

import Image from "next/image";
import { SanityImage } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

interface LastEventSplitSectionProps {
  category: string;
  title: string;
  quote: string;
  image: SanityImage | string;
  author: string;
  readTime: string;
  intro: string;
  approach: string[];
  conclusion: string;
  reflection: string;
}

const LastEventSplitSection = ({
  category,
  title,
  quote,
  image,
  author,
  readTime,
  intro,
  approach,
  conclusion,
  reflection,
}: LastEventSplitSectionProps) => {
  const imageUrl = typeof image === "string" ? image : urlFor(image).url();
  return (
    <section className="relative w-full bg-[var(--color-events-bg)] text-[var(--color-events-text)] md:pb-24">
      <div className="flex flex-col md:flex-row">
        {/* Coloana Stângă (Media) - Pinned on desktop */}
        <div className="order-1 w-full overflow-hidden bg-zinc-900 md:sticky md:top-0 md:h-screen md:w-1/2">
          <div className="relative h-[40vh] w-full md:h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-black/5" />
        </div>

        {/* Coloana Dreaptă (Content) - Scrollable */}
        <div className="order-2 flex w-full flex-col md:w-1/2">
          {/* Mobile: Continuous flow | Desktop: Hero section */}
          <div className="p-6 md:relative md:flex md:min-h-screen md:flex-col md:justify-center md:p-16 lg:p-24">
            {/* Category + Title + Quote - Left aligned mobile, center desktop */}
            <div className="flex flex-col items-start gap-2 md:items-center md:text-center">
              <span className="text-xs tracking-[0.1em] text-[var(--color-events-muted)] uppercase">
                ({category})
              </span>
              <h1 className="font-regular text-3xl leading-[0.95] tracking-tight uppercase md:text-5xl lg:text-5xl">
                {title}
              </h1>
              <p className="max-w-md text-sm leading-[1.3] text-[var(--color-events-muted)] md:text-sm">
                {quote}
              </p>
            </div>

            {/* Author + Read Time */}
            <div className="mt-48 flex items-center justify-between text-xs tracking-[0.1em] text-[var(--color-events-muted)] uppercase md:absolute md:right-6 md:bottom-6 md:left-6">
              <span>{author}</span>
              <span>{readTime}</span>
            </div>
          </div>

          {/* Story Content - Continuous on mobile, scrollable on desktop */}
          <div className="flex flex-col gap-12 px-6 pb-12 md:gap-20 md:p-16 lg:p-24">
            {/* Section 1: Introduction */}
            <div className="mt-18 flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.1em] text-(--color-events-muted) uppercase">
                Introducere
              </h2>
              <p className="md:text-md font-regular text-base leading-[1.2]">
                {intro}
              </p>
            </div>

            {/* Section 2: Approach - 3 Steps */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xs tracking-[0.1em] text-[var(--color-events-muted)] uppercase">
                Abordare
              </h2>
              <div className="flex flex-col gap-4">
                {approach.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-5 shrink-0 text-sm text-[var(--color-events-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-md md:text-md font-regular leading-[1.2]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Conclusion */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.1em] text-[var(--color-events-muted)] uppercase">
                Concluzie
              </h2>
              <p className="md:text-md font-regular text-base leading-[1.2]">
                {conclusion}
              </p>
            </div>

            {/* Section 4: Reflection */}
            <div className="flex flex-col gap-4 pb-8">
              <h2 className="text-xs tracking-[0.1em] text-[var(--color-events-muted)] uppercase">
                Reflecție
              </h2>
              <p className="text-md md:text-md font-regular leading-[1.2]">
                {reflection}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastEventSplitSection;
