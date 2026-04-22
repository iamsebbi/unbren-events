import Image from "next/image";
import Button from "@/components/ui/events/Button";

// ─────────────────────────────────────────────────────────────────────────────
// AboutReveal — Sticky section revealed by scrolling past the main content.
// Used on: Events Home, Contact Page
// ─────────────────────────────────────────────────────────────────────────────

const AboutReveal = () => {
  return (
    <section className="relative flex h-dvh w-full items-center justify-start overflow-hidden px-6 pb-[env(safe-area-inset-bottom)] md:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1673526759349-50f6a23fac25?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Us Background"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover brightness-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <div className="w-full max-w-fit text-left">
          <h2 className="font-regular mb-12 text-[12vw] leading-[0.85] tracking-tighter text-white sm:text-[10vw] md:text-7xl lg:text-8xl">
            HAI SĂ FACEM <br />
            EVENIMENTUL <br />
            <span className="font-events -ml-1 block text-[1.25em] italic">
              MEMORABIL.
            </span>
          </h2>

          <div className="mt-4">
            <div className="flex justify-center">
              <Button
                text="Despre noi"
                href="/about"
                className="border-white text-white"
                dotClassName="bg-white"
                hoverTextClassName="group-hover:!text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutReveal;
