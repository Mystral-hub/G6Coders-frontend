import { Code2, Layers3, Palette, Smartphone } from "lucide-react";

const services = [
  {
    title: "Web & Mobile",
    description:
      "Développement d’applications web et mobiles performantes, accessibles et évolutives.",
    icon: Smartphone,
  },
  {
    title: "Sites Internet",
    description:
      "Création de sites vitrines et de plateformes e-commerce professionnelles.",
    icon: Code2,
  },
  {
    title: "Logiciels Métier",
    description:
      "Conception de solutions ERP et CRM adaptées à vos processus internes.",
    icon: Layers3,
  },
  {
    title: "UI/UX Design",
    description:
      "Maquettes et interfaces pensées pour offrir une expérience utilisateur claire et intuitive.",
    icon: Palette,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl sm:mb-14">
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Nos services
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Une approche holistique du développement logiciel
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Pour garantir la pérennité de vos outils digitaux, nous vous
            accompagnons à chaque étape de votre projet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-2xl border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-bold leading-tight">
                  {service.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
