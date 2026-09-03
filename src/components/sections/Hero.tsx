import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            #1 Expert en transformation digitale
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Solutions digitales <span className="text-primary">sur mesure</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Nous transformons vos idées complexes en produits web et mobiles
            performants. Une expertise technique de haut niveau pour propulser
            votre croissance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Découvrir nos services
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              Prendre rendez-vous
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border bg-muted shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop"
              alt="Application mobile développée par G6Coders"
              className="aspect-4/3 w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-4 flex max-w-xs items-center gap-3 rounded-xl border bg-background p-4 shadow-xl sm:-left-6">
            <span className="h-3 w-3 shrink-0 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.18 )]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Projet actif
              </p>
              <p className="text-sm text-muted-foreground">
                Développement App Mobile — Fintech v2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
