const reasons = [
  "Une expertise technique adaptée à chaque projet.",
  "Une méthode de travail claire et transparente.",
  "Des solutions pensées pour évoluer avec votre entreprise.",
];

export default function About() {
  return (
    <section id="apropos" className="bg-muted/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
            alt="Équipe G6Coders en atelier"
            className="aspect-4/3 w-full object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Pourquoi G6Coders ?
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Des produits fiables portés par une équipe formée au réel
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Nous transformons des apprenants en véritables professionnels et
            nous livrons aux entreprises des produits digitaux fiables,
            construits avec une méthodologie claire et une expertise concrète.
          </p>

          <div className="mt-8 space-y-4">
            {reasons.map((reason, index ) => (
              <div key={reason} className="flex items-start gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-base leading-7 text-foreground">{reason}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-9 border-l-4 border-primary bg-background p-5 text-base leading-7 text-muted-foreground sm:p-6">
            « Notre mission est de rendre la technologie accessible, utile et
            durable pour chaque organisation. »
          </blockquote>
        </div>
      </div>
    </section>
  );
}
