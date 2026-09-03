import { Code2, Rocket, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    title: "Nous comprenons le code",
    description:
      "Chaque projet est pensé comme une architecture solide, lisible et conçue pour durer.",
    icon: Code2,
  },
  {
    title: "Nous formons de vrais experts",
    description:
      "G6Coders réunit une communauté de développeurs formés sur des projets réels.",
    icon: Users,
  },
  {
    title: "Nous livrons avec précision",
    description:
      "Une méthodologie claire, des délais respectés et une communication transparente.",
    icon: Rocket,
  },
  {
    title: "Nous construisons avec confiance",
    description:
      "Des solutions sécurisées, maintenables et adaptées aux objectifs de votre entreprise.",
    icon: ShieldCheck,
  },
];

export default function FeatureCards() {
  return (
    <section className="border-y bg-muted/40 py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="text-xl font-bold leading-tight">
                {feature.title}
              </h2>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
