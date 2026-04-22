"use client";

import Image from "next/image";
import { SanityImage } from "../../sanity/types";
import { urlFor } from "../../sanity/image";

interface BentoGalleryProps {
  images: (SanityImage | string)[];
  video: string;
}

const BentoGallery = ({ images, video }: BentoGalleryProps) => {
  const resolveImage = (img: SanityImage | string | undefined) => {
    if (!img) return "";
    return typeof img === "string" ? img : urlFor(img).url();
  };

  const fallbackImages = [
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=776&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1160&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop",
  ];

  return (
    <section className="bg-[var(--color-events-bg)] px-4 py-24 md:px-8">
      <div className="flex flex-col gap-4 bg-(--color-events-bg) md:grid md:grid-cols-12 md:gap-4 md:px-0">
        {/* Row 1 - Video Full Width */}
        <div className="relative aspect-21/9 overflow-hidden bg-black md:col-span-12">
          <Image
            src={resolveImage(images[0]) || fallbackImages[0]}
            alt="Gallery 1"
            fill
            className="object-cover"
          />
        </div>

        {/* Row 2: 50/50 */}
        <div className="relative aspect-square overflow-hidden md:col-span-6 md:aspect-[4/3]">
          <Image
            src={resolveImage(images[1]) || fallbackImages[1]}
            alt="Gallery 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden md:col-span-6 md:aspect-[4/3]">
          <Image
            src={resolveImage(images[2]) || fallbackImages[2]}
            alt="Gallery 3"
            fill
            className="object-cover"
          />
        </div>

        {/* Row 3: Full Width Video */}
        <div className="relative aspect-21/9 overflow-hidden bg-black md:col-span-12">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            aria-label="Showcase video evenimente"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 4: Full Width */}
        <div className="relative aspect-[21/9] overflow-hidden md:col-span-12">
          <Image
            src={resolveImage(images[3]) || fallbackImages[3]}
            alt="Gallery 4"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BentoGallery;
