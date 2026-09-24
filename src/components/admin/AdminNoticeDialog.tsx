import {
  CheckCircle2,
  CircleAlert,
  X,
} from "lucide-react";

interface AdminNoticeDialogProps {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

export default function AdminNoticeDialog({
  open,
  type,
  title,
  message,
  onClose,
}: AdminNoticeDialogProps) {
  if (!open) {
    return null;
  }

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : CircleAlert;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-notice-title"
        aria-describedby="admin-notice-message"
        className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-xl sm:p-7">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              isSuccess
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            }`}>
            <Icon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="admin-notice-title"
              className="text-lg font-bold">
              {title}
            </h2>

            <p
              id="admin-notice-message"
              className="mt-2 text-sm leading-6 text-muted-foreground">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
