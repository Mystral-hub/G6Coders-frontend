import type { IconType } from "react-icons";
import { SiStripe } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import SantaLucia from "@/assets/logos/complexe-santa-lucia-logo.jpg";
import SABC from "@/assets/logos/logo_groupe_sabc.jpg";
import ENSPD from "@/assets/logos/logo-enspd.webp";

interface Partner {
  name: string;
  icon?: IconType;
  image?: string;
  color: string;
}

const partners: Partner[] = [
  {
    name: "Groupe SABC",
    image: SABC,
    color: "#4285F4",
  },
  {
    name: "Microsoft",
    icon: FaMicrosoft,
    color: "#00A4EF",
  },
  {
    name: "Stripe",
    icon: SiStripe,
    color: "#635BFF",
  },
  {
    name: "ENSPD",
    image: ENSPD,
    color: "#1877F2",
  },
  {
    name: "Santa Lucia",
    image: SantaLucia,
    color: "#f38332",
  },
];

export default function Partners() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      aria-labelledby="partners-title"
      className="overflow-hidden border-y bg-background py-12 sm:py-14">
      <style>{`
        @keyframes partners-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .partners-track {
          animation: partners-scroll 28s linear infinite;
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

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-28" />

        <div className="partners-track flex min-w-max items-center gap-4 px-5 sm:gap-6 lg:gap-8">
          {duplicatedPartners.map((partner, index) => {
            const PartnerIcon = partner.icon;
            const isDuplicate = index >= partners.length;

            return (
              <div
                key={`${isDuplicate ? "duplicate" : "original"}-${partner.name}-${index}`}
                aria-hidden={isDuplicate}
                className="flex min-h-19 min-w-45 items-center gap-4 rounded-2xl border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:min-w-52.5 sm:px-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted"
                  style={{ color: partner.color }}>
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt=""
                      className="h-7 w-7 object-contain"
                      loading="lazy"
                    />
                  ) : PartnerIcon ? (
                    <PartnerIcon className="h-7 w-7" aria-hidden="true" />
                  ) : null}
                </span>

                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
