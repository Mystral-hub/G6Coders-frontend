import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Partner } from "@/api/partners";

interface PartnerAdminCardProps {
  partner: Partner;
  isDeleting: boolean;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

export default function PartnerAdminCard({
  partner,
  isDeleting,
  onEdit,
  onDelete,
}: PartnerAdminCardProps) {
  return (
    <article className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <img
          src={partner.image_url}
          alt={`Logo de ${partner.name}`}
          className="h-16 w-16 shrink-0 rounded-xl border object-contain p-1"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-foreground">
            {partner.name}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {partner.partner_status}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onEdit(partner)}
            className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={`Modifier ${partner.name}`}>
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(partner)}
            disabled={isDeleting}
            className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
            aria-label={`Supprimer ${partner.name}`}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Type de partenariat
        </p>

        <p className="mt-1 text-sm text-foreground">
          {partner.partnership_type}
        </p>
      </div>
    </article>
  );
}
