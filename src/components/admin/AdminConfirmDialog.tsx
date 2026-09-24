import {
  AlertTriangle,
  X,
} from "lucide-react";

interface AdminConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AdminConfirmDialog({
  open,
  title,
  message,
  isLoading = false,
  onCancel,
  onConfirm,
}: AdminConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-message"
        className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-xl sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle
              className="h-6 w-6"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="admin-confirm-title"
              className="text-lg font-bold">
              {title}
            </h2>

            <p
              id="admin-confirm-message"
              className="mt-2 text-sm leading-6 text-muted-foreground">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Fermer la boîte de dialogue"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted disabled:opacity-50">
            Annuler
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition hover:bg-destructive/90 disabled:pointer-events-none disabled:opacity-50">
            {isLoading
              ? "Suppression..."
              : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
