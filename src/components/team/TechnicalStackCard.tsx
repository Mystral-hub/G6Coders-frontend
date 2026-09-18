interface TechnicalStackCardProps {
  skills: string[];
  isPaused?: boolean;
}

const SKILLS_SCROLL_DURATION_SECONDS = 18;

export default function TechnicalStackCard({
  skills,
  isPaused = false,
}: TechnicalStackCardProps) {
  const duplicatedSkills = [...skills, ...skills];

  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="skills-marquee mt-5 min-w-0 border-t border-border pt-5">
      <style>{`
        @keyframes skills-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .skills-marquee-viewport {
          overflow: hidden;
          width: 100%;
        }

        .skills-marquee-track {
          animation: skills-scroll ${SKILLS_SCROLL_DURATION_SECONDS}s linear infinite;
          display: flex;
          gap: 0.5rem;
          width: max-content;
        }

        .skills-marquee-track[data-paused="true"] {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-marquee-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Compétences & stack
      </p>

      <div
        className="skills-marquee-viewport mt-3"
        aria-label="Compétences et stack technique">
        <div
          className="skills-marquee-track"
          data-paused={isPaused}
          aria-live="off">
          {duplicatedSkills.map((skill, index) => {
            const isDuplicate = index >= skills.length;

            return (
              <span
                key={`${skill}-${index}`}
                aria-hidden={isDuplicate}
                className="shrink-0 whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground">
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
