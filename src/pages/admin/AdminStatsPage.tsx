import { useEffect, useState } from "react";
import {
  BarChart3,
  RefreshCw,
} from "lucide-react";

import {
  getPublicStats,
  updateStats,
  type PublicStats,
  type StatsUpdatePayload,
} from "@/api/statsApi";

import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import StatsForm from "@/components/admin/StatsForm";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

export default function AdminStatsPage() {
  const [stats, setStats] =
    useState<PublicStats | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [hasError, setHasError] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [notice, setNotice] =
    useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const data = await getPublicStats();

        if (isMounted) {
          setStats(data);
          setHasError(false);
          setLoadError("");
        }
      } catch (error) {
        console.error(
          "Impossible de charger les statistiques :",
          error,
        );

        if (isMounted) {
          setHasError(true);
          setLoadError(
            "Les statistiques ne peuvent pas être chargées pour le moment.",
          );
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

  async function reloadStats() {
    setIsLoading(true);
    setHasError(false);
    setLoadError("");

    try {
      const data = await getPublicStats();

      setStats(data);
    } catch (error) {
      console.error(
        "Impossible de charger les statistiques :",
        error,
      );

      setHasError(true);
      setLoadError(
        "Les statistiques ne peuvent pas être chargées pour le moment.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(
    payload: StatsUpdatePayload,
  ) {
    setIsSubmitting(true);

    try {
      const data = await updateStats(payload);

      setStats(data);

      setNotice({
        type: "success",
        title: "Statistiques mises à jour",
        message:
          "Les indicateurs publics ont été enregistrés avec succès.",
      });
    } catch (error) {
      console.error(
        "Impossible de mettre à jour les statistiques :",
        error,
      );

      setNotice({
        type: "error",
        title: "Mise à jour impossible",
        message:
          "Les statistiques n’ont pas pu être enregistrées. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Indicateurs
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Gestion des statistiques
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Mettez à jour les indicateurs visibles sur la page d’accueil.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des statistiques...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {loadError}
          </p>

          <button
            type="button"
            onClick={() => void reloadStats()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            <RefreshCw
              className="h-4 w-4"
              aria-hidden="true"
            />
            Réessayer
          </button>
        </div>
      )}

      {!isLoading &&
        !hasError &&
        stats && (
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Indicateurs publics
                </h2>

                <p className="text-sm text-muted-foreground">
                  Les valeurs modifiées seront visibles sur la page d’accueil.
                </p>
              </div>
            </div>

            <StatsForm
              key={stats.updated_at}
              stats={stats}
              isSubmitting={isSubmitting}
              error=""
              onSubmit={handleSubmit}
            />
          </div>
        )}

      <AdminNoticeDialog
        open={notice !== null}
        type={notice?.type ?? "success"}
        title={notice?.title ?? ""}
        message={notice?.message ?? ""}
        onClose={() => setNotice(null)}
      />
    </section>
  );
}
