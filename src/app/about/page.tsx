import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import AboutHero from "./components/AboutHero";
import QuickLinks from "./components/QuickLinks";
import Approach from "./components/Approach";
import Metrics from "../_shared/Metrics";
import Team from "./components/Team";
import AboutServices from "./components/AboutServices";

import { getAboutData, getStats, getTeam } from "../sanity/data";
import type {
  AboutPage as SanityAboutPage,
  TeamMember,
  SanityImage,
} from "../sanity/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Despre Noi — Echipa UNBREN.",
  description:
    "Cunoaște echipa UNBREN. Creativitate, profesionalism și pasiune pentru evenimente memorabile.",
  path: "/about",
});

export default async function AboutPage() {
  const [aboutData, stats, teamMembers] = await Promise.all([
    getAboutData() as Promise<SanityAboutPage | null>,
    getStats(),
    getTeam() as Promise<TeamMember[] | null>,
  ]);

  return (
    <main className="events-theme min-h-screen bg-(--color-events-bg) font-sans text-(--color-events-text)">
      <AboutHero
        title={aboutData?.heroTitle}
        image={aboutData?.heroImage}
        infoLabel={aboutData?.informationLabel}
        infoTitle={aboutData?.informationBody}
        infoSidebar={aboutData?.informationSidebar}
      />
      <QuickLinks
        links={aboutData?.quickLinks}
        description={aboutData?.informationSidebar?.[0]}
      />
      <Approach
        items={aboutData?.approachSteps?.map(
          (step: { title: string; description: string; image: SanityImage }) => ({
            title: step.title,
            description: step.description,
            image: step.image,
          }),
        )}
      />
      <Metrics
        items={stats.items}
        label={stats.label}
        title={stats.title}
        subtitle={stats.subtitle}
        theme="minimal"
      />
      <AboutServices
        services={aboutData?.services?.map(
          (s: { title: string; description: string; image: SanityImage }) => ({
            id: s.title.toLowerCase().replace(/\s+/g, "-"),
            title: s.title,
            copy: s.description,
            image: s.image,
          }),
        )}
      />
      <Team members={teamMembers || undefined} />
    </main>
  );
}
