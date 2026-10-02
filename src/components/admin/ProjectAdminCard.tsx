import {
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Project } from "@/api/projectsApi";

interface ProjectAdminCardProps {
  project: Project;
  isDeleting: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectAdminCard({
  project,
  isDeleting,
  onEdit,
  onDelete,
}: ProjectAdminCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      {project.image_url && (
        <img
          src={project.image_url}
          alt={`Image du projet ${project.title}`}
          className="h-44 w-full object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-foreground">
              {project.title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label={`Modifier ${project.title}`}>
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(project)}
              disabled={isDeleting}
              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
              aria-label={`Supprimer ${project.title}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex max-w-full items-center gap-2 truncate text-sm font-semibold text-primary hover:underline">
            <ExternalLink className="h-4 w-4 shrink-0" />
            <span className="truncate">
              Voir le projet
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
