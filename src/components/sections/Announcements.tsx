import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Megaphone } from "lucide-react";

import { getAnnouncements, type Announcement } from "@/api/announcementsApi";

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date non disponible";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function AnnouncementSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-background">
      <div className="h-48 bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-6 w-4/5 rounded bg-muted" />
        <div className="h-16 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAnnouncements() {
      try {
        const data = await getAnnouncements();

        if (isMounted) {
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Impossible de charger les annonces :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="annonces"
      aria-labelledby="announcements-title"
      className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm md:text-lg font-semibold uppercase tracking-wider text-primary">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              Actualités
            </span>

            <h2
              id="announcements-title"
              className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Les dernières nouvelles de G6Coders
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Découvrez nos annonces, nos évolutions et les informations
              importantes concernant notre agence.
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnnouncementSkeleton />
            <AnnouncementSkeleton />
            <AnnouncementSkeleton />
          </div>
        )}

        {!isLoading && announcements.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="group overflow-hidden rounded-2xl border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {announcement.image_url ? (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={announcement.image_url}
                      alt={announcement.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-primary/10 text-primary">
                    <Megaphone className="h-14 w-14" aria-hidden="true" />
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={announcement.created_at}>
                      {formatDate(announcement.created_at)}
                    </time>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
                    {announcement.title}
                  </h3>

                  <p className="mt-4 line-clamp-4 text-base leading-7 text-muted-foreground">
                    {announcement.content}
                  </p>

                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}>
                    En savoir plus
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && announcements.length === 0 && (
          <p className="rounded-2xl border bg-background p-6 text-center text-base text-muted-foreground">
            Aucune annonce n’est disponible pour le moment.
          </p>
        )}

        {!isLoading && hasError && (
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Les annonces sont momentanément indisponibles.
          </p>
        )}
      </div>
    </section>
  );
}
