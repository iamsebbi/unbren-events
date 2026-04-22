import Image from "next/image";
import SectionLabel from "../../_shared/SectionLabel";
import { cn } from "@/lib/utils";
import { urlFor } from "../../sanity/image";
import type { TeamMember } from "../../sanity/types";

const TEAM_MEMBERS = [
  {
    name: "Alexandru Chioru",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Claudiu Travis",
    role: "CEO & Event Strategist",
    image:
      "https://scontent.fias1-1.fna.fbcdn.net/v/t39.30808-6/485377584_9586585821408176_1752681855263953100_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=GvG8CZun57UQ7kNvwGGRMry&_nc_oc=AdnAta0l9QynvRuW0bWu_8qGew8NCenlzKU_SoUrSBxESIZ3ynEBleSePsPFrnnoNFao-zKaxNxiVu6kknMX4TU4&_nc_zt=23&_nc_ht=scontent.fias1-1.fna&_nc_gid=p_muCGGyByyQKgitDQVlog&oh=00_Aftt5mo1dq7neEIH5-ldVEt4uE6h9FPKEy4WwDE17zXDZA&oe=699A458C",
  },
  {
    name: "Mihai Stoica",
    role: "Visual Storyteller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1G9AcxbM5FqPuo_3wmepxXObAfeFcPW_c8g&s",
  },
  {
    name: "Cosmin Cosciug",
    role: "Marketing Consultat",
    image:
      "https://scontent.fias1-1.fna.fbcdn.net/v/t39.30808-6/275403340_5355805151145764_4934902692417590858_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LQNHGLxOLY8Q7kNvwEwcm2Y&_nc_oc=AdlI3Lv9XmvfaiUAle_TcbMMIXHt5agIa-EVbMumF1bTHTi1pt9ldnQ1LUcOvsA1r15LGPr0hPyNLAUHY8RTEJ1Z&_nc_zt=23&_nc_ht=scontent.fias1-1.fna&_nc_gid=xyemeZaeOU1J_QzKm3YziQ&oh=00_Afue5mFIUieh22vPrB87HV08NdRqVtuIWwC6zws0pJY2vg&oe=699A203F",
  },
];

const THEME = {
  section:
    "py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-[var(--color-events-bg)]",

  tag: "mb-4",

  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16",

  member: {
    wrapper: "flex flex-col group cursor-default",
    image: {
      wrapper:
        "relative aspect-[3/4] overflow-hidden mb-1 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2 bg-(--color-events-border)",
      img: cn(
        "object-cover",
        "scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out",
      ),
    },
    contentWrapper: "flex flex-col gap-1 sm:gap-2",
    name: "text-xl sm:text-2xl md:text-2xl xl:text-3xl font-medium tracking-tight text-[var(--color-events-text)]",
    role: "text-xs md:text-sm text-[var(--color-events-muted)] uppercase tracking-tight",
  },
} as const;

interface TeamProps {
  members?: TeamMember[];
}

type FallbackTeamMember = {
  name: string;
  role: string;
  image: string;
};

type DisplayTeamMember = TeamMember | FallbackTeamMember;

function resolveMemberImage(member: DisplayTeamMember): string {
  if ("image" in member) return member.image;
  return urlFor(member.avatar).url();
}

const Team = ({ members }: TeamProps) => {
  const displayMembers: DisplayTeamMember[] =
    members && members.length > 0 ? members : TEAM_MEMBERS;
  return (
    <section id="team" className={cn(THEME.section)}>
      <SectionLabel className={THEME.tag}>(TEAM)</SectionLabel>

      <div className={cn(THEME.grid)}>
        {displayMembers.map((member) => (
          <div key={member.name} className={cn(THEME.member.wrapper)}>
            <div className={cn(THEME.member.image.wrapper)}>
              <Image
                src={resolveMemberImage(member)}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={cn(THEME.member.image.img)}
              />
            </div>
            <div className={cn(THEME.member.contentWrapper)}>
              <h4 className={cn(THEME.member.name)}>{member.name}</h4>
              <span className={cn(THEME.member.role)}>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
