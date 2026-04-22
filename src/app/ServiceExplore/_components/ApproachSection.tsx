"use client";

interface ApproachSectionProps {
  meta: {
    service: string;
    location: string;
    year: string;
  };
  title: string;
  subtitle: string;
  challenge: string;
  approach: string;
  result: string;
}

const ApproachSection = ({
  meta,
  title,
  challenge,
  approach,
  result,
}: ApproachSectionProps) => {
  return (
    <section className="bg-(--color-events-bg) px-4 text-(--color-events-text) md:px-8">
      <div className="flex flex-col-reverse gap-12 lg:flex-row lg:gap-24">
        {/* Meta Data */}
        <div className="flex w-full flex-col gap-8 lg:w-[35%]">
          <div>
            <h4 className="text-xs tracking-widest text-(--color-events-muted) uppercase">
              (Serviciu)
            </h4>
            <span className="text-sm font-medium">{meta.service}</span>
          </div>
          <div>
            <h4 className="text-xs tracking-widest text-(--color-events-muted) uppercase">
              (Zona)
            </h4>
            <span className="text-sm font-medium">{meta.location}</span>
          </div>
          <div>
            <h4 className="text-xs tracking-widest text-(--color-events-muted) uppercase">
              (Activ)
            </h4>
            <span className="text-sm font-medium">{meta.year}</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex w-full flex-col lg:w-[65%]">
          <h2 className="mb-6 text-3xl tracking-tight text-(--color-events-text) uppercase">
            {title}
          </h2>

          <div className="text-md flex max-w-2xl flex-col gap-8 leading-[1.1em] font-medium text-(--color-events-text)">
            <div>
              <h4 className="mb-3 text-xs tracking-widest text-(--color-events-muted) uppercase">
                (Filosofie)
              </h4>
              <p>{challenge}</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs tracking-widest text-(--color-events-muted) uppercase">
                (Cum lucrăm)
              </h4>
              <p>{approach}</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs tracking-widest text-(--color-events-muted) uppercase">
                (Ce primești)
              </h4>
              <p>{result}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
