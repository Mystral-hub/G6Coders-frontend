import { useState } from "react";

import type {
  PublicStats,
  StatsUpdatePayload,
} from "@/api/statsApi";

interface StatsFormProps {
  stats: PublicStats;
  isSubmitting: boolean;
  error: string;
  onSubmit: (
    payload: StatsUpdatePayload,
  ) => Promise<void>;
}

interface EditableStats {
  delivered_projects_count: string;
  active_clients_count: string;
  trained_talents_count: string;
  years_of_experience: string;
  recommendation_rate: string;
}

function getInitialValues(
  stats: PublicStats,
): EditableStats {
  return {
    delivered_projects_count: String(
      stats.delivered_projects_count,
    ),
    active_clients_count: String(
      stats.active_clients_count,
    ),
    trained_talents_count: String(
      stats.trained_talents_count,
    ),
    years_of_experience: String(
      stats.years_of_experience,
    ),
    recommendation_rate: String(
      stats.recommendation_rate,
    ),
  };
}

export default function StatsForm({
  stats,
  isSubmitting,
  error,
  onSubmit,
}: StatsFormProps) {
  const [values, setValues] =
    useState<EditableStats>(() =>
      getInitialValues(stats),
    );

  function updateField(
    field: keyof EditableStats,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function parseInteger(value: string): number {
    return Math.max(
      0,
      Number.parseInt(value || "0", 10),
    );
  }

  function parseRate(value: string): number {
    return Math.min(
      100,
      Math.max(
        0,
        Number.parseFloat(value || "0"),
      ),
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        void onSubmit({
          delivered_projects_count: parseInteger(
            values.delivered_projects_count,
          ),
          active_clients_count: parseInteger(
            values.active_clients_count,
          ),
          trained_talents_count: parseInteger(
            values.trained_talents_count,
          ),
          years_of_experience: parseInteger(
            values.years_of_experience,
          ),
          recommendation_rate: parseRate(
            values.recommendation_rate,
          ),
        });
      }}
      className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Projets livrés
          </span>

          <input
            type="number"
            min="0"
            required
            value={
              values.delivered_projects_count
            }
            onChange={(event) =>
              updateField(
                "delivered_projects_count",
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">
            Clients actifs
          </span>

          <input
            type="number"
            min="0"
            required
            value={values.active_clients_count}
            onChange={(event) =>
              updateField(
                "active_clients_count",
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">
            Talents formés
          </span>

          <input
            type="number"
            min="0"
            required
            value={
              values.trained_talents_count
            }
            onChange={(event) =>
              updateField(
                "trained_talents_count",
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">
            Années d’expérience
          </span>

          <input
            type="number"
            min="0"
            required
            value={
              values.years_of_experience
            }
            onChange={(event) =>
              updateField(
                "years_of_experience",
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium">
            Taux de recommandation (%)
          </span>

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            required
            value={
              values.recommendation_rate
            }
            onChange={(event) =>
              updateField(
                "recommendation_rate",
                event.target.value,
              )
            }
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">
          Note moyenne des témoignages
        </p>

        <p className="mt-2 text-2xl font-bold text-primary">
          {stats.average_rating.toFixed(1)} / 5
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Cette valeur est calculée automatiquement à partir des témoignages publiés.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50">
          {isSubmitting
            ? "Enregistrement..."
            : "Enregistrer les statistiques"}
        </button>
      </div>
    </form>
  );
}
