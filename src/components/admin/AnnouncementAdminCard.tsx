import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Announcement } from "@/api/announcementsApi";

interface AnnouncementAdminCardProps {
  announcement: Announcement;
  isDeleting: boolean;
  onEdit: (
    announcement: Announcement,
  ) => void;
  onDelete: (
    announcement: Announcement,
  ) => void;
}

export default function AnnouncementAdminCard({
  announcement,
  isDeleting,
  onEdit,
  onDelete,
}: AnnouncementAdminCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      {announcement.image_url && (
        <img
          src={announcement.image_url}
          alt={`Illustration de ${announcement.title}`}
          className="h-44 w-full object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground">
              {announcement.title}
            </h2>

            <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted-foreground">
              {announcement.content}
            </p>
          </div>

          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => onEdit(announcement)}
              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label={`Modifier ${announcement.title}`}>
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(announcement)}
              disabled={isDeleting}
              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
              aria-label={`Supprimer ${announcement.title}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
