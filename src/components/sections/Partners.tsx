import { useEffect, useState } from "react";

import { getPartners, type Partner } from "@/api/partners";

const PARTNERS_SCROLL_DURATION_SECONDS = 28;

function PartnerSkeleton() {
  return (
    <div className="flex min-h-19 min-w-45 animate-pulse items-center gap-4 rounded-2xl border bg-card px-5 py-4 sm:min-w-52.5 sm:px-6">
      <div className="h-11 w-11 shrink-0 rounded-xl bg-muted" />
      <div className="h-5 w-28 rounded bg-muted" />
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPartners() {
      try {
        const data = await getPartners();

        if (isMounted) {
          setPartners(data);
        }
      } catch (error) {
        console.error("Impossible de charger les partenaires :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      aria-labelledby="partners-title"
      className="overflow-hidden border-y bg-background py-12 sm:py-14">
      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .partners-track {
          animation: partners-scroll ${PARTNERS_SCROLL_DURATION_SECONDS}s linear infinite;
          width: max-content;
        }

        .partners-track:hover,
        .partners-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p
          id="partners-title"
          className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-base">
          Ils nous font confiance
        </p>
      </div>

      {isLoading && (
        <div className="mt-8 flex gap-4 overflow-hidden px-5 sm:gap-6 lg:gap-8">
          <PartnerSkeleton />
          <PartnerSkeleton />
          <PartnerSkeleton />
        </div>
      )}

      {!isLoading && partners.length > 0 && (
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-28" />

          <div className="partners-track flex min-w-max items-center gap-4 px-5 sm:gap-6 lg:gap-8">
            {duplicatedPartners.map((partner, index) => {
              const isDuplicate = index >= partners.length;

              return (
                <div
                  key={`${partner.id}-${isDuplicate ? "duplicate" : "original"}`}
                  aria-hidden={isDuplicate}
                  title={`${partner.partnership_type} · ${partner.partner_status}`}
                  className="flex min-h-19 min-w-45 items-center gap-4 rounded-2xl border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:min-w-52.5 sm:px-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                    <img
                      src={partner.image_url}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </span>

                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isLoading && partners.length === 0 && (
        <p className="mx-auto mt-8 max-w-7xl px-5 text-center text-base text-muted-foreground lg:px-8">
          Aucun partenaire n’est disponible pour le moment.
        </p>
      )}

      {!isLoading && hasError && (
        <p className="mx-auto mt-4 max-w-7xl px-5 text-center text-sm text-muted-foreground lg:px-8">
          Les partenaires sont momentanément indisponibles.
        </p>
      )}
    </section>
  );
}
