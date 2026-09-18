import { BarChart3, FolderKanban, Images } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboardPage() {
  const { admin } = useAuth();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Tableau de bord
        </h1>

        <p className="mt-2 text-muted-foreground">
          Bienvenue {admin?.username}. Gérez le contenu public de G6Coders
          depuis cet espace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderKanban className="h-5 w-5" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-semibold">Projets</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Gérez les réalisations affichées sur le site.
          </p>
        </article>

        <article className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Images className="h-5 w-5" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-semibold">Galerie</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Gérez les photos de la galerie.
          </p>
        </article>

        <article className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-semibold">Statistiques</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Consultez et mettez à jour les indicateurs du site.
          </p>
        </article>
      </div>
    </section>
  );
}
