import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { getTeamMembers, type TeamMember } from "@/api/team";
import TechnicalStackCard from "@/components/team/TechnicalStackCard";

const CARD_SCROLL_OFFSET = 320;

function TeamMemberSkeleton() {
  return (
    <div className="w-52.5 shrink-0 animate-pulse overflow-hidden rounded-2xl border bg-background sm:w-72.5">
      <div className="aspect-4/3 w-full bg-muted" />

      <div className="space-y-4 p-5 sm:p-6">
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-5 w-1/2 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);
  const [touchedMemberId, setTouchedMemberId] = useState<number | null>(null);

  const teamTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTeamMembers() {
      try {
        const data = await getTeamMembers();

        if (isMounted) {
          setTeamMembers(data);
        }
      } catch (error) {
        console.error("Impossible de charger les membres de l’équipe :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTeamMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollTeam = (direction: "left" | "right") => {
    teamTrackRef.current?.scrollBy({
      left: direction === "left" ? -CARD_SCROLL_OFFSET : CARD_SCROLL_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="equipe"
      aria-labelledby="team-title"
      className="overflow-hidden bg-muted/40 py-20 sm:py-24 lg:py-28">
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

      {isLoading && (
        <div className="flex gap-6 overflow-hidden px-5 sm:gap-8">
          <TeamMemberSkeleton />
          <TeamMemberSkeleton />
          <TeamMemberSkeleton />
        </div>
      )}

      {!isLoading && teamMembers.length > 0 && (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-muted/40 to-transparent sm:w-24" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-muted/40 to-transparent sm:w-24" />

          <button
            type="button"
            onClick={() => scrollTeam("left")}
            aria-label="Afficher les membres précédents"
            className="absolute left-2 top-1/2 z-20 inline-flex -translate-y-1/2 rounded-full border bg-background/95 p-2.5 text-foreground shadow-md transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:left-3 sm:p-3">
            <FaChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTeam("right")}
            aria-label="Afficher les membres suivants"
            className="absolute right-2 top-1/2 z-20 inline-flex -translate-y-1/2 rounded-full border bg-background/95 p-2.5 text-foreground shadow-md transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-3 sm:p-3">
            <FaChevronRight aria-hidden="true" />
          </button>

          <div
            ref={teamTrackRef}
            className="flex snap-x md:max-w-[85%] mx-auto snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-14 pb-3 scrollbar-none [&::-webkit-scrollbar]:hidden sm:gap-8 sm:px-24"
            aria-label="Membres de l’équipe">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="team-card w-52.5 shrink-0 snap-start overflow-hidden rounded-2xl border bg-background transition hover:shadow-xl sm:w-72.5"
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                onPointerDown={() => setTouchedMemberId(member.id)}
                onPointerUp={() => setTouchedMemberId(null)}
                onPointerCancel={() => setTouchedMemberId(null)}
                onPointerLeave={() => setTouchedMemberId(null)}>
                <img
                  src={member.image_url}
                  alt={`${member.name}, ${member.role}`}
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>

                  <p className="mt-1 text-base font-medium text-primary">
                    {member.role}
                  </p>

                  {(member.linkedin_url || member.github_url) && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} sur LinkedIn`}
                          className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary">
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      )}

                      {member.github_url && (
                        <a
                          href={member.github_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} sur GitHub`}
                          className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary">
                          <FaGithub className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}

                  <TechnicalStackCard
                    skills={member.skills}
                    isPaused={
                      hoveredMemberId === member.id ||
                      touchedMemberId === member.id
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {!isLoading && teamMembers.length === 0 && (
        <p className="mx-auto max-w-7xl px-5 text-center text-base text-muted-foreground lg:px-8">
          Aucun membre d’équipe n’est disponible pour le moment.
        </p>
      )}

      {!isLoading && hasError && (
        <p className="mx-auto mt-5 max-w-7xl px-5 text-center text-sm text-muted-foreground lg:px-8">
          L’équipe est momentanément indisponible.
        </p>
      )}
    </section>
  );
}
