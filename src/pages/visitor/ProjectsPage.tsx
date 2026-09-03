import { useEffect, useState } from "react";
import { ArrowLeft, Code2, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getProjects,
  type Project,
} from "@/api/projectsApi";

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-background">
      <div className="aspect-video bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-20 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const data = await getProjects();

        if (isMounted) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Impossible de charger les projets :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour à l’accueil
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <FolderKanban className="h-4 w-4" aria-hidden="true" />
              Nos projets
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Des solutions pensées pour vos ambitions
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
              Explorez les projets réalisés par notre équipe et découvrez notre
              approche du développement logiciel.
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProjectsSkeleton />
            <ProjectsSkeleton />
            <ProjectsSkeleton />
            <ProjectsSkeleton />
          </div>
        )}

        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {project.image_url ? (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-primary/10 text-primary">
                    <Code2 className="h-16 w-16" aria-hidden="true" />
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  <h2 className="text-2xl font-bold leading-tight tracking-tight">
                    {project.title}
                  </h2>

                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && !hasError && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <FolderKanban
              className="mx-auto h-10 w-10 text-primary"
              aria-hidden="true"
            />
            <p className="mt-4 text-lg text-muted-foreground">
              Aucun projet n’est disponible pour le moment.
            </p>
          </div>
        )}

        {!isLoading && hasError && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <p className="text-lg text-muted-foreground">
              Les projets sont momentanément indisponibles. Veuillez réessayer
              plus tard.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
