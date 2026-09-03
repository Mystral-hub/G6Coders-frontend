import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { MessageCircle, Send, Star } from "lucide-react";

import {
  createTestimonial,
  getTestimonials,
  type Testimonial,
} from "@/api/testimonialsApi";

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

interface TestimonialForm {
  author_name: string;
  message: string;
  rating: number;
}

const initialForm: TestimonialForm = {
  author_name: "",
  message: "",
  rating: 5,
};

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function TestimonialSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border bg-background p-6 sm:p-7">
      <div className="h-5 w-32 rounded bg-muted" />
      <div className="mt-5 h-20 rounded bg-muted" />
      <div className="mt-6 h-5 w-40 rounded bg-muted" />
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState<TestimonialForm>(initialForm);

  useEffect(() => {
    let isMounted = true;

    async function loadTestimonials() {
      try {
        const data = await getTestimonials();

        if (isMounted) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Impossible de charger les témoignages :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(field: keyof TestimonialForm, value: string | number) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setFormError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const authorName = form.author_name.trim();
    const message = form.message.trim();

    if (!authorName) {
      setFormError("Merci de renseigner votre nom.");
      return;
    }

    if (message.length < 10) {
      setFormError("Votre commentaire doit contenir au moins 10 caractères.");
      return;
    }

    if (form.rating < 1 || form.rating > 5) {
      setFormError("La note doit être comprise entre 1 et 5.");
      return;
    }

    setIsSubmitting(true);

    try {
      const createdTestimonial = await createTestimonial({
        author_name: authorName,
        message,
        rating: form.rating,
      });

      setTestimonials((currentTestimonials) => [
        createdTestimonial,
        ...currentTestimonials,
      ]);
      setForm(initialForm);
      setSuccessMessage("Merci pour votre commentaire !");
    } catch (error) {
      console.error("Impossible de publier le témoignage :", error);
      setFormError(
        "Votre commentaire n’a pas pu être publié. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="temoignages"
      aria-labelledby="testimonials-title"
      className="bg-muted/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm md:text-xl font-semibold uppercase tracking-wider text-primary">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Témoignages
          </span>

          <h2
            id="testimonials-title"
            className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Ils parlent de notre collaboration
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Découvrez les retours de nos clients et partagez votre propre
            expérience avec G6Coders.
          </p>
        </div>

        {/* Les anciens commentaires sont volontairement affichés en premier. */}
        <div>
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </div>
          )}

          {!isLoading && testimonials.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => {
                const rating = Math.max(1, Math.min(5, testimonial.rating));
                const date = formatDate(testimonial.created_at);

                return (
                  <article
                    key={testimonial.id}
                    className="flex flex-col rounded-2xl border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`Note : ${rating} sur 5`}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < rating
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-5 flex-1 text-base leading-7 text-muted-foreground">
                      « {testimonial.message} »
                    </blockquote>

                    <div className="mt-7 flex items-center gap-3 border-t pt-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {getInitials(testimonial.author_name)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold">
                          {testimonial.author_name}
                        </p>
                        {date && (
                          <time
                            dateTime={testimonial.created_at}
                            className="text-sm text-muted-foreground">
                            {date}
                          </time>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!isLoading && testimonials.length === 0 && !hasError && (
            <p className="rounded-2xl border bg-background p-6 text-center text-base text-muted-foreground">
              Aucun témoignage n’est disponible pour le moment. Soyez le premier
              à partager votre expérience.
            </p>
          )}

          {!isLoading && hasError && (
            <p className="rounded-2xl border bg-background p-6 text-center text-base text-muted-foreground">
              Les témoignages existants sont momentanément indisponibles.
            </p>
          )}
        </div>

        {/* Formulaire compact placé sous les témoignages. */}
        <div className="mt-10 rounded-2xl border bg-background p-5 shadow-sm sm:mt-12 sm:p-7 lg:p-8">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                Partagez votre expérience
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
                Votre avis nous aide à améliorer continuellement nos services.
              </p>
            </div>
          </div>

          <form
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-end"
            onSubmit={handleSubmit}>
            <div className="lg:col-span-3">
              <label
                htmlFor="testimonial-author-name"
                className="mb-2 block text-sm font-semibold">
                Votre nom
              </label>
              <input
                id="testimonial-author-name"
                name="author_name"
                type="text"
                value={form.author_name}
                onChange={(event) =>
                  handleChange("author_name", event.target.value)
                }
                placeholder="Ex. Marie Ngombe"
                maxLength={100}
                disabled={isSubmitting}
                className="w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="testimonial-rating"
                className="mb-2 block text-sm font-semibold">
                Votre note
              </label>
              <select
                id="testimonial-rating"
                name="rating"
                value={form.rating}
                onChange={(event) =>
                  handleChange("rating", Number(event.target.value))
                }
                disabled={isSubmitting}
                className="w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60">
                <option value={5}>5 sur 5 — Excellent</option>
                <option value={4}>4 sur 5 — Très bien</option>
                <option value={3}>3 sur 5 — Bien</option>
                <option value={2}>2 sur 5 — Moyen</option>
                <option value={1}>1 sur 5 — Insatisfaisant</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-5">
              <label
                htmlFor="testimonial-message"
                className="mb-2 block text-sm font-semibold">
                Votre commentaire
              </label>
              <textarea
                id="testimonial-message"
                name="message"
                value={form.message}
                onChange={(event) =>
                  handleChange("message", event.target.value)
                }
                placeholder="Décrivez votre expérience avec G6Coders..."
                minLength={10}
                maxLength={1000}
                rows={2}
                disabled={isSubmitting}
                className="w-full resize-y rounded-xl border bg-background px-4 py-3 text-base leading-7 outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-2">
              <Send className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? "Publication..." : "Publier"}
            </button>

            {formError && (
              <p
                role="alert"
                className="text-sm font-medium text-destructive md:col-span-2 lg:col-span-10">
                {formError}
              </p>
            )}

            {successMessage && (
              <p
                className="text-sm font-medium text-primary md:col-span-2 lg:col-span-10"
                role="status">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
