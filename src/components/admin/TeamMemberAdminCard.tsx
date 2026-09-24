import { Pencil, Trash2 } from "lucide-react";

import type { TeamMember } from "@/api/team";

interface TeamMemberAdminCardProps {
  member: TeamMember;
  isDeleting: boolean;
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

export default function TeamMemberAdminCard({
  member,
  isDeleting,
  onEdit,
  onDelete,
}: TeamMemberAdminCardProps) {
  return (
    <article className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <img
          src={member.image_url}
          alt={`Photo de ${member.name}`}
          className="h-16 w-16 shrink-0 rounded-full border object-cover"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-foreground">
            {member.name}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onEdit(member)}
            className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={`Modifier ${member.name}`}>
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(member)}
            disabled={isDeleting}
            className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
            aria-label={`Supprimer ${member.name}`}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Compétences
        </p>

        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-black">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
