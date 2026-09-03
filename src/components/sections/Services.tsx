import { Code2, Layers3, Palette, Smartphone } from "lucide-react";

import ServiceVisual from "@/components/services/ServiceVisual";

interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: typeof Smartphone;
  accentColor: string;
}

const services: Service[] = [
  {
    title: "Web & Mobile",
    description:
      "Développement d’applications web et mobiles performantes, accessibles et évolutives.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=900&auto=format&fit=crop",
    icon: Smartphone,
    accentColor: "#f38332",
  },
  {
    title: "Sites Internet",
    description:
      "Création de sites vitrines et de plateformes e-commerce professionnelles.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    icon: Code2,
    accentColor: "#4285F4",
  },
  {
    title: "Logiciels Métier",
    description:
      "Conception de solutions ERP et CRM adaptées à vos processus internes.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    icon: Layers3,
    accentColor: "#7c3aed",
  },
  {
    title: "UI/UX Design",
    description:
      "Maquettes et interfaces pensées pour offrir une expérience utilisateur claire et intuitive.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900&auto=format&fit=crop",
    icon: Palette,
    accentColor: "#ec4899",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl md:max-w-full text-center sm:mb-14">
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm md:text-2xl font-semibold uppercase tracking-wider text-primary">
            Nos services
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Une approche holistique du développement logiciel
          </h2>

          <p className="mt-5 text-lg md:text-xl leading-8 text-muted-foreground">
            Pour garantir la pérennité de vos outils digitaux, nous vous
            accompagnons à chaque étape de votre projet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border bg-background p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">
              <ServiceVisual
                title={service.title}
                image={service.image}
                icon={service.icon}
                accentColor={service.accentColor}
              />

              <h3 className="text-xl font-bold leading-tight">
                {service.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-5 inline-flex items-center text-base font-semibold text-primary transition hover:gap-2">
                En savoir plus
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
