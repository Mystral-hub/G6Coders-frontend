import { useEffect, useState } from "react";
import {
  MessageSquareQuote,
  Star,
  Trash2,
} from "lucide-react";

import {
  deleteTestimonial,
  getTestimonials,
  type Testimonial,
} from "@/api/testimonialsApi";

import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import TestimonialAdminCard from "@/components/admin/TestimonialAdminCard";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

function RatingStars({
  rating,
}: {
  rating: number;
}) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from(
        { length: 5 },
        (_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? "fill-current"
                : ""
            }`}
            aria-hidden="true"
          />
        ),
      )}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [hasError, setHasError] =
    useState(false);

  const [testimonialToDelete, setTestimonialToDelete] =
    useState<Testimonial | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [notice, setNotice] =
    useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialTestimonials() {
      try {
        const data = await getTestimonials();

        if (isMounted) {
          setTestimonials(data);
          setHasError(false);
        }
      } catch (error) {
        console.error(
          "Impossible de charger les témoignages :",
          error,
        );

        if (isMounted) {
          setHasError(true);

          setNotice({
            type: "error",
            title: "Chargement impossible",
            message:
              "Les témoignages ne peuvent pas être chargés pour le moment.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  async function reloadTestimonials() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getTestimonials();

      setTestimonials(data);
    } catch (error) {
      console.error(
        "Impossible de charger les témoignages :",
        error,
      );

      setHasError(true);

      setNotice({
        type: "error",
        title: "Chargement impossible",
        message:
          "Les témoignages ne peuvent pas être chargés pour le moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmDelete() {
    if (!testimonialToDelete) {
      return;
    }

    const testimonial =
      testimonialToDelete;

    setDeletingId(testimonial.id);

    try {
      await deleteTestimonial(testimonial.id);

      setTestimonials((current) =>
        current.filter(
          (item) => item.id !== testimonial.id,
        ),
      );

      setTestimonialToDelete(null);

      setNotice({
        type: "success",
        title: "Témoignage supprimé",
        message: `Le témoignage de ${testimonial.author_name} a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error(
        "Impossible de supprimer le témoignage :",
        error,
      );

      setTestimonialToDelete(null);

      setNotice({
        type: "error",
        title: "Suppression impossible",
        message:
          "La suppression a échoué. Veuillez réessayer.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Contenu public
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Témoignages
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Consultez les retours des visiteurs et supprimez les témoignages indésirables.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des témoignages...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les témoignages.
          </p>

          <button
            type="button"
            onClick={() =>
              void reloadTestimonials()
            }
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            Réessayer
          </button>
        </div>
      )}

      {!isLoading &&
        !hasError &&
        testimonials.length === 0 && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <MessageSquareQuote
              className="mx-auto h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="mt-4 text-muted-foreground">
              Aucun témoignage n’est disponible pour le moment.
            </p>
          </div>
        )}

      {!isLoading &&
        !hasError &&
        testimonials.length > 0 && (
          <>
            {/* Tableau desktop */}
            <div className="hidden overflow-hidden rounded-2xl border bg-background shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        Auteur
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Message
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Note
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {testimonials.map(
                      (testimonial) => (
                        <tr
                          key={testimonial.id}
                          className="align-middle">
                          <td className="px-5 py-4 font-semibold">
                            {testimonial.author_name}
                          </td>

                          <td className="max-w-lg px-5 py-4 text-muted-foreground">
                            <p className="line-clamp-2">
                              « {testimonial.message} »
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <RatingStars
                              rating={
                                testimonial.rating
                              }
                            />
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  setTestimonialToDelete(
                                    testimonial,
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  testimonial.id
                                }
                                className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                                aria-label={`Supprimer le témoignage de ${testimonial.author_name}`}>
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cartes mobile */}
            <div className="grid gap-4 md:hidden">
              {testimonials.map(
                (testimonial) => (
                  <TestimonialAdminCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isDeleting={
                      deletingId === testimonial.id
                    }
                    onDelete={setTestimonialToDelete}
                  />
                ),
              )}
            </div>
          </>
        )}

      <AdminConfirmDialog
        open={testimonialToDelete !== null}
        title="Confirmer la suppression"
        message={
          testimonialToDelete
            ? `Voulez-vous vraiment supprimer le témoignage de ${testimonialToDelete.author_name} ? Cette action est irréversible.`
            : ""
        }
        isLoading={deletingId !== null}
        onCancel={() =>
          setTestimonialToDelete(null)
        }
        onConfirm={() =>
          void confirmDelete()
        }
      />

      <AdminNoticeDialog
        open={notice !== null}
        type={notice?.type ?? "success"}
        title={notice?.title ?? ""}
        message={notice?.message ?? ""}
        onClose={() => setNotice(null)}
      />
    </section>
  );
}
