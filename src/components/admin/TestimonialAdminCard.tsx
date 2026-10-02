import {
  Star,
  Trash2,
} from "lucide-react";

import type { Testimonial } from "@/api/testimonialsApi";

interface TestimonialAdminCardProps {
  testimonial: Testimonial;
  isDeleting: boolean;
  onDelete: (
    testimonial: Testimonial,
  ) => void;
}

export default function TestimonialAdminCard({
  testimonial,
  isDeleting,
  onDelete,
}: TestimonialAdminCardProps) {
  return (
    <article className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground">
            {testimonial.author_name}
          </h2>

          <div className="mt-2 flex items-center gap-1 text-amber-500">
            {Array.from(
              { length: 5 },
              (_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < testimonial.rating
                      ? "fill-current"
                      : ""
                  }`}
                  aria-hidden="true"
                />
              ),
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(testimonial)}
          disabled={isDeleting}
          className="shrink-0 rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          aria-label={`Supprimer le témoignage de ${testimonial.author_name}`}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <blockquote className="mt-4 text-sm leading-6 text-muted-foreground">
        « {testimonial.message} »
      </blockquote>
    </article>
  );
}
