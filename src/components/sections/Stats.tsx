import { useEffect, useState } from "react";

import { getPublicStats, type PublicStats } from "@/api/statsApi";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export default function Stats() {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const data = await getPublicStats();

        if (isMounted) {
          setStats(data);
        }
      } catch (error) {
        console.error("Impossible de charger les statistiques :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const statItems: StatItem[] = stats
    ? [
        {
          value: stats.delivered_projects_count,
          suffix: "+",
          label: "Projets livrés",
        },
        {
          value: stats.recommendation_rate,
          suffix: "%",
          label: "Taux de recommandation",
        },
        {
          value: stats.active_clients_count,
          suffix: "+",
          label: "Clients actifs",
        },
        {
          value: stats.trained_talents_count,
          suffix: "+",
          label: "Talents formés",
        },
      ]
    : [];

  return (
    <section className="bg-secondary py-14 text-secondary-foreground sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:gap-10 lg:grid-cols-4 lg:px-8">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse text-center">
              <div className="mx-auto h-14 w-24 rounded-md bg-secondary-foreground/10" />
              <div className="mx-auto mt-4 h-5 w-28 rounded-md bg-secondary-foreground/10" />
            </div>
          ))}

        {!isLoading &&
          statItems.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-base leading-6 text-secondary-foreground/75 sm:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
      </div>

      {!isLoading && hasError && (
        <p className="mx-auto mt-6 max-w-7xl px-5 text-center text-sm text-secondary-foreground/60 lg:px-8">
          Les statistiques sont momentanément indisponibles.
        </p>
      )}
    </section>
  );
}
