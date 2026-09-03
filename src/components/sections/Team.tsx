import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alexandre Mba",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Sophie Nkomo",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Marc-Eric Tchana",
    role: "Full-Stack Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Grace Abena",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

export default function Team( ) {
  return (
    <section id="equipe" className="bg-muted/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Notre équipe
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Des talents engagés pour vos projets
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Une équipe complémentaire, passionnée par la technologie et orientée
            vers des résultats concrets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-2xl border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                className="aspect-4/3 w-full object-cover"
                loading="lazy"
              />

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mt-1 text-base text-primary">{member.role}</p>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} sur LinkedIn`}
                    className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} sur GitHub`}
                    className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-primary"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
