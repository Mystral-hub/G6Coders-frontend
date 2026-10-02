import { useState } from "react";
import { X } from "lucide-react";

import type {
  Project,
  ProjectFormValues,
} from "@/api/projectsApi";

interface ProjectFormModalProps {
  open: boolean;
  project: Project | null;
  isSubmitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (
    values: ProjectFormValues,
  ) => Promise<void>;
}

function getInitialValues(
  project: Project | null,
): ProjectFormValues {
  if (!project) {
    return {
      title: "",
      description: "",
      project_url: "",
      image: null,
    };
  }

  return {
    title: project.title,
    description: project.description,
    project_url: project.project_url ?? "",
    image: null,
  };
}

export default function ProjectFormModal({
  open,
  project,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: ProjectFormModalProps) {
  const [values, setValues] =
    useState<ProjectFormValues>(() =>
      getInitialValues(project),
    );

  const [imageName, setImageName] =
    useState("");

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof ProjectFormValues,
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
        aria-labelledby="project-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-background p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Projets
            </p>

            <h2
              id="project-form-title"
              className="mt-1 text-2xl font-bold">
              {project
                ? "Modifier le projet"
                : "Ajouter un projet"}
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
              htmlFor="project-title"
              className="text-sm font-medium">
              Titre
            </label>

            <input
              id="project-title"
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
              htmlFor="project-description"
              className="text-sm font-medium">
              Description
            </label>

            <textarea
              id="project-description"
              required
              rows={5}
              value={values.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project-url"
              className="text-sm font-medium">
              Lien du projet
            </label>

            <input
              id="project-url"
              required
              type="url"
              placeholder="https://github.com/... ou https://mon-site.com"
              value={values.project_url}
              onChange={(event ) =>
                updateField(
                  "project_url",
                  event.target.value,
                )
              }
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <p className="text-xs text-muted-foreground">
              Ajoutez le site web ou le dépôt du projet.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project-image"
              className="text-sm font-medium">
              Image{" "}
              {project
                ? "(facultatif lors de la modification)"
                : ""}
            </label>

            <input
              id="project-image"
              required={!project}
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

            {project?.image_url && !imageName && (
              <img
                src={project.image_url}
                alt={`Image actuelle de ${project.title}`}
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
                : project
                  ? "Enregistrer les modifications"
                  : "Ajouter le projet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
