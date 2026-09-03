interface TechnicalStackCardProps {
  skills: string[];
}

export default function TechnicalStackCard({
  skills,
}: TechnicalStackCardProps) {
  return (
    <div className="mt-5 border-t border-border pt-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Compétences & stack
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
