import Image from "next/image";
import { cn } from "@/lib/utils";
import SectionLabel from "../../_shared/SectionLabel";
import { urlFor } from "../../sanity/image";
import type { SanityImage } from "../../sanity/types";

interface ApproachItem {
  title: string;
  description?: string;
  content?: string;
  image: string | SanityImage;
}

const APPROACH_ITEMS = [
  {
    image:
      "https://images.unsplash.com/photo-1544592732-83bbbfc46783?q=80&w=774&auto=format&fit=crop",
    title: "(1) Research",
    content:
      "Ascultăm povestea ta pentru a înțelege esența. Fiecare proiect începe cu explorarea detaliilor care fac momentul tău unic.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    title: "(2) Strategy & Process",
    content:
      "Planificăm fiecare cadru și fiecare unghi. Ne folosim expertiza tehnică pentru a crea un workflow eficient și creativ.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    title: "(3) Execution",
    content:
      "Transformăm planul în realitate. Capturăm lumina, mișcarea și emoția cu precizie chirurgicală și viziune artistică.",
  },
];

const THEME = {
  section:
    "py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-[var(--color-events-bg)]",

  tag: "mb-4 sm:mb-4 md:mb-6",

  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24",

  item: {
    wrapper: "flex flex-col gap-2 group cursor-default",
    image: {
      wrapper:
        "relative aspect-square overflow-hidden bg-(--color-events-border)",
      img: cn(
        "object-cover",
        "scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out",
      ),
    },
    contentWrapper: "flex flex-col gap-2 sm:gap-4",
    title:
      "text-base sm:text-lg md:text-xl font-medium uppercase tracking-tight text-[var(--color-events-text)]",
    description:
      "text-[var(--color-events-muted)] text-base xl:text-lg leading-snug max-w-[90%]",
  },
} as const;

interface ApproachProps {
  items?: ApproachItem[];
}

const Approach = ({ items }: ApproachProps) => {
  const displayItems = items && items.length > 0 ? items : APPROACH_ITEMS;
  return (
    <section className={cn(THEME.section)}>
      <div className="w-full">
        <SectionLabel className={THEME.tag}>(APPROACH)</SectionLabel>

        <div className={cn(THEME.grid)}>
          {displayItems.map((item) => (
            <div key={item.title} className={cn(THEME.item.wrapper)}>
              <div className={cn(THEME.item.image.wrapper)}>
                <Image
                  src={
                    typeof item.image === "string"
                      ? item.image
                      : urlFor(item.image).url()
                  }
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={cn(THEME.item.image.img)}
                />
              </div>
              <div className={cn(THEME.item.contentWrapper)}>
                <h3 className={cn(THEME.item.title)}>{item.title}</h3>
                <p className={cn(THEME.item.description)}>
                  {("content" in item ? item.content : item.description) || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
