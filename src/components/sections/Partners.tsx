const partners = ["Google", "Microsoft", "AWS", "Stripe", "Notion", "GitHub"];

export default function Partners() {
  return (
    <section className="border-y bg-background py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-base">
          Ils nous font confiance
        </p>

        <div className="mt-8 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex min-w-30 items-center justify-center rounded-xl border bg-muted/40 px-5 py-4 text-base font-semibold text-muted-foreground grayscale transition hover:border-primary/40 hover:text-primary sm:min-w-35 sm:text-lg">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
