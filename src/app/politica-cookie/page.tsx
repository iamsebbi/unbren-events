import TextReveal from "@/components/ui/events/TextRevealLine";
import { cn } from "@/lib/utils";
import { getLegalPageData } from "../sanity/data";

const THEME = {
  section: "w-full pt-16 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-24 pb-20",
  container: "px-4 sm:px-6 md:px-8",

  tag: "block mb-4 text-[10px] font-medium tracking-[0.1em] text-(--color-events-muted) uppercase sm:text-xs md:text-sm",

  title: cn(
    "text-4xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-7xl",
    "mb-12 font-medium leading-[0.85] tracking-tighter text-(--color-events-text) uppercase sm:leading-[0.8] md:leading-none sm:mb-16 md:mb-20",
  ),

  content: "mt-12 sm:mt-16 md:mt-20 max-w-4xl space-y-12 sm:space-y-16",

  article: "space-y-6 sm:space-y-8",

  h2: "text-2xl font-medium tracking-tighter text-(--color-events-text) uppercase sm:text-3xl md:text-4xl",

  p: "font-sans text-base leading-relaxed text-(--color-events-muted) sm:text-lg md:text-xl",

  ul: "pl-0 list-none space-y-4 font-sans text-base text-(--color-events-muted) sm:text-lg md:text-xl",

  li: "relative pl-6 before:absolute before:left-0 before:text-(--color-events-text) before:content-['/']",
} as const;

const CookiePolicyPage = async () => {
  const page = await getLegalPageData("cookie");

  return (
    <main className="min-h-screen bg-(--color-events-bg) text-(--color-events-text)">
      <section className={cn(THEME.section)}>
        <div className={cn(THEME.container)}>
          {/* Tag */}
          <span className={cn(THEME.tag)}>(LEGAL)</span>

          <div className="max-w-7xl">
            <TextReveal text={page.title} className={cn(THEME.title)} />
          </div>

          <div className={cn(THEME.content)}>
            {page.sections.map((section, index) => (
              <div
                key={`${section.heading}-${index}`}
                className={cn(THEME.article)}
              >
                <h2 className={cn(THEME.h2)}>
                  {index + 1}. {section.heading}
                </h2>
                <p className={cn(THEME.p)}>{section.content}</p>
                {section.listItems?.length ? (
                  <ul className={cn(THEME.ul)}>
                    {section.listItems.map((item) => (
                      <li key={item} className={cn(THEME.li)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicyPage;
