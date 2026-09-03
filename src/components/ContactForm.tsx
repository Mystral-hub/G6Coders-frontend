import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendContactMessage } from "@/api/contactApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),
  email: z.string().email("Veuillez saisir une adresse e-mail valide."),
  subject: z.string().min(2, "Veuillez sélectionner un sujet."),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(5000, "Le message est trop long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      subject: "Demande d'information",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await sendContactMessage(values);

      window.alert("Votre message a été envoyé avec succès.");
      reset();
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
      window.alert(
        "Une erreur est survenue pendant l’envoi. Veuillez réessayer.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border bg-card p-6 shadow-sm"
      noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">Nom complet</Label>
          <Input
            id="full_name"
            type="text"
            placeholder="Ex. Joseph Digitell"
            aria-invalid={Boolean(errors.full_name)}
            {...register("full_name")}
          />
          {errors.full_name && (
            <p className="text-sm text-destructive">
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@exemple.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Sujet</Label>
        <select
          id="subject"
          className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-invalid={Boolean(errors.subject)}
          {...register("subject")}>
          <option value="Demande d'information">Demande d’information</option>
          <option value="Devis projet">Devis projet</option>
          <option value="Rejoindre l'équipe">Rejoindre l’équipe</option>
        </select>
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Comment pouvons-nous vous aider ?"
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
