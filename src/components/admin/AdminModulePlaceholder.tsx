import type { ReactNode } from "react";

interface AdminModulePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function AdminModulePlaceholder({
  eyebrow,
  title,
  description,
  children,
}: AdminModulePlaceholderProps) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        {children ?? (
          <p className="text-sm text-muted-foreground">
            Ce module sera connecté aux opérations CRUD du backend dans la
            prochaine étape.
          </p>
        )}
      </div>
    </section>
  );
}
