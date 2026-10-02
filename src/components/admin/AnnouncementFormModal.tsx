import { useState } from "react";
import { X } from "lucide-react";

import type {
  Announcement,
  AnnouncementFormValues,
} from "@/api/announcementsApi";

interface AnnouncementFormModalProps {
  open: boolean;
  announcement: Announcement | null;
  isSubmitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (
    values: AnnouncementFormValues,
  ) => Promise<void>;
}

function getInitialValues(
  announcement: Announcement | null,
): AnnouncementFormValues {
  if (!announcement) {
    return {
      title: "",
      content: "",
      image: null,
    };
  }

  return {
    title: announcement.title,
    content: announcement.content,
    image: null,
  };
}

export default function AnnouncementFormModal({
  open,
  announcement,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: AnnouncementFormModalProps) {
  const [values, setValues] =
    useState<AnnouncementFormValues>(() =>
      getInitialValues(announcement),
    );

  const [imageName, setImageName] =
    useState("");

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof AnnouncementFormValues,
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
        aria-labelledby="announcement-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-background p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Annonces
            </p>

            <h2
              id="announcement-form-title"
              className="mt-1 text-2xl font-bold">
              {announcement
                ? "Modifier l’annonce"
                : "Ajouter une annonce"}
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
              htmlFor="announcement-title"
              className="text-sm font-medium">
              Titre
            </label>

            <input
              id="announcement-title"
              required
              value={values.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value,
                )
              }
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="announcement-content"
              className="text-sm font-medium">
              Contenu
            </label>

            <textarea
              id="announcement-content"
              required
              rows={7}
              value={values.content}
              onChange={(event) =>
                updateField(
                  "content",
                  event.target.value,
                )
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="announcement-image"
              className="text-sm font-medium">
              Image facultative
            </label>

            <input
              id="announcement-image"
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

            {announcement?.image_url && !imageName && (
              <img
                src={announcement.image_url}
                alt={`Image actuelle de ${announcement.title}`}
                className="mt-2 h-20 w-32 rounded-lg border object-cover"
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
                : announcement
                  ? "Enregistrer les modifications"
                  : "Publier l’annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
