import { Mail, MapPin } from "lucide-react";

import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Nous contacter
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Parlons de votre projet
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Vous avez une question, besoin d’un devis ou souhaitez rejoindre
            l’équipe ? Écrivez-nous directement.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold">E-mail</p>
                <a
                  href="mailto:contact@g6coders.com"
                  className="text-base text-muted-foreground transition hover:text-primary"
                >
                  contact@g6coders.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold">Localisation</p>
                <p className="text-base text-muted-foreground">
                  Yaoundé, Cameroun
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
