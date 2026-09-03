import { FaGithub, FaLinkedin } from "react-icons/fa";

import TechnicalStackCard from "@/components/team/TechnicalStackCard";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Alexandre Mba",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["Python", "Django", "FastAPI", "PostgreSQL"],
  },
  {
    name: "Sophie Nkomo",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["Figma", "UX Research", "Design System", "Prototypage"],
  },
  {
    name: "Marc-Eric Tchana",
    role: "Full-Stack Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["React", "Node.js", "Laravel", "MySQL"],
  },
  {
    name: "Grace Abena",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    skills: ["Agile", "Scrum", "Jira", "Product Strategy"],
  },
];

export default function Team() {
  const duplicatedMembers = [...teamMembers, ...teamMembers];

  return (
    <section
      id="equipe"
      aria-labelledby="team-title"
      className="overflow-hidden bg-muted/40 py-20 sm:py-24 lg:py-28">
      <style>{`
        @keyframes team-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .team-track {
          animation: team-scroll  40s linear infinite;
          width: max-content;
        }

        .team-track:hover,
        .team-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .team-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Notre équipe
          </span>

          <h2
            id="team-title"
            className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Des talents engagés pour vos projets
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Une équipe complémentaire, passionnée par la technologie et orientée
            vers des résultats concrets.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-muted/40 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-muted/40 to-transparent sm:w-24" />

        <div className="team-track flex flex-nowrap gap-6 px-5 sm:gap-8">
          {duplicatedMembers.map((member, index) => {
            const isDuplicate = index >= teamMembers.length;

            return (
              <article
                key={`${isDuplicate ? "duplicate" : "original"}-${member.name}-${index}`}
                aria-hidden={isDuplicate}
                className="w-52.5 shrink-0 overflow-hidden rounded-2xl border bg-background transition hover:shadow-xl sm:w-72.5">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="mt-1 text-base font-medium text-primary">
                    {member.role}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} sur LinkedIn`}
                      className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary">
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} sur GitHub`}
                      className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary">
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </div>

                  <TechnicalStackCard skills={member.skills} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
