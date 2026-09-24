import { useState } from "react";
import { X } from "lucide-react";

import type {
  Partner,
  PartnerFormValues,
} from "@/api/partners";

interface PartnerFormModalProps {
  open: boolean;
  partner: Partner | null;
  isSubmitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (
    values: PartnerFormValues,
  ) => Promise<void>;
}

function getInitialValues(
  partner: Partner | null,
): PartnerFormValues {
  if (!partner) {
    return {
      name: "",
      partner_status: "",
      partnership_type: "",
      image: null,
    };
  }

  return {
    name: partner.name,
    partner_status: partner.partner_status,
    partnership_type: partner.partnership_type,
    image: null,
  };
}

export default function PartnerFormModal({
  open,
  partner,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: PartnerFormModalProps) {
  const [values, setValues] =
    useState<PartnerFormValues>(() =>
      getInitialValues(partner),
    );

  const [imageName, setImageName] = useState("");

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof PartnerFormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-background p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Partenaires
            </p>

            <h2
              id="partner-form-title"
              className="mt-1 text-2xl font-bold">
              {partner
                ? "Modifier le partenaire"
                : "Ajouter un partenaire"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Fermer le formulaire"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit(values);
          }}
          className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="partner-name"
              className="text-sm font-medium">
              Nom
            </label>

            <input
              id="partner-name"
              required
              value={values.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value,
                )
              }
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="partner-status"
                className="text-sm font-medium">
                Statut du partenaire
              </label>

              <input
                id="partner-status"
                required
                placeholder="Actif"
                value={values.partner_status}
                onChange={(event) =>
                  updateField(
                    "partner_status",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="partnership-type"
                className="text-sm font-medium">
                Type de partenariat
              </label>

              <input
                id="partnership-type"
                required
                placeholder="Technologique"
                value={values.partnership_type}
                onChange={(event) =>
                  updateField(
                    "partnership_type",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="partner-image"
              className="text-sm font-medium">
              Image{" "}
              {partner
                ? "(facultatif lors de la modification)"
                : ""}
            </label>

            <input
              id="partner-image"
              required={!partner}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file =
                  event.target.files?.[0] ?? null;

                setValues((current) => ({
                  ...current,
                  image: file,
                }));

                setImageName(file?.name ?? "");
              }}
              className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-medium"
            />

            {imageName && (
              <p className="text-xs text-muted-foreground">
                Fichier : {imageName}
              </p>
            )}

            {partner?.image_url && !imageName && (
              <img
                src={partner.image_url}
                alt={`Logo actuel de ${partner.name}`}
                className="mt-2 h-16 w-16 rounded-lg border object-contain p-1"
              />
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted disabled:opacity-50">
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50">
              {isSubmitting
                ? "Enregistrement..."
                : partner
                  ? "Enregistrer les modifications"
                  : "Ajouter le partenaire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
