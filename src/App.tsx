import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Layers3,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Palette,
  Smartphone,
  X,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Web & Mobile",
    description:
      "Développement d’applications web et mobiles performantes et évolutives.",
    icon: Smartphone,
  },
  {
    title: "Sites Internet",
    description:
      "Création de sites vitrines et de plateformes e-commerce professionnelles.",
    icon: Code2,
  },
  {
    title: "Logiciels Métier",
    description:
      "Conception de solutions ERP et CRM adaptées à vos processus internes.",
    icon: Layers3,
  },
  {
    title: "UI/UX Design",
    description:
      "Maquettes et interfaces pensées pour offrir une expérience utilisateur claire.",
    icon: Palette,
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#accueil" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              G6
            </span>
            <span className="text-lg font-bold tracking-tight">
              G6<span className="text-primary">Coders</span>
            </span>
          </a>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-16 flex-col gap-4 border-b bg-background p-5 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0`}
          >
            <a href="#accueil" className="text-sm text-muted-foreground transition hover:text-foreground" onClick={closeMenu}>
              Accueil
            </a>
            <a href="#services" className="text-sm text-muted-foreground transition hover:text-foreground" onClick={closeMenu}>
              Services
            </a>
            <a href="#apropos" className="text-sm text-muted-foreground transition hover:text-foreground" onClick={closeMenu}>
              À propos
            </a>
            <a href="#contact" className="text-sm text-muted-foreground transition hover:text-foreground" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Connexion administrateur">
              <LogIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="accueil" className="relative overflow-hidden py-20 lg:py-32">
          <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                #1 Expert en transformation digitale
              </p>
              <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Solutions digitales <span className="text-primary">sur mesure</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Nous transformons vos idées complexes en produits web et mobiles
                performants. Une expertise technique de haut niveau pour propulser
                votre croissance.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href="#services">
                    Découvrir nos services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">Prendre rendez-vous</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border bg-muted shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop"
                  alt="Application mobile développée par G6Coders"
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 flex max-w-xs items-center gap-3 rounded-xl border bg-background p-4 shadow-xl sm:-left-6">
                <span className="h-3 w-3 shrink-0 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.18 )]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Projet actif
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Développement App Mobile — Fintech v2.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/40 py-10">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 lg:px-8">
            <div className="rounded-2xl border bg-background p-6">
              <h2 className="text-lg font-bold">Nous comprenons le code</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Chaque projet est pensé comme une architecture solide, lisible et
                conçue pour durer.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-6">
              <h2 className="text-lg font-bold">Nous formons de vrais experts</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                G6Coders réunit une communauté de développeurs formés sur des projets
                réels.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-6">
              <h2 className="text-lg font-bold">Nous livrons avec précision</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Une méthodologie claire, des délais respectés et une communication
                transparente.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Nos services
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Une approche holistique du développement logiciel
              </h2>
              <p className="mt-4 text-muted-foreground">
                Pour garantir la pérennité de vos outils digitaux, à chaque étape.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="apropos" className="bg-muted/40 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              alt="Équipe G6Coders en atelier"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Pourquoi G6Coders ?
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Des produits fiables portés par une équipe formée au réel
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Nous transformons des apprenants en véritables professionnels et nous
                livrons aux entreprises des produits digitaux fiables, construits avec
                une méthodologie claire et une expertise concrète.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-4xl font-bold text-primary">120+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Projets livrés</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Taux de recommandation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Nous contacter
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Parlons de votre projet
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Vous avez une question, besoin d’un devis ou souhaitez rejoindre
                l’équipe ? Écrivez-nous directement.
              </p>
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@g6coders.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Yaoundé, Cameroun</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t bg-secondary py-8 text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-secondary-foreground/70 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date( ).getFullYear()} G6<span className="text-primary">Coders</span>.
            Tous droits réservés.
          </p>
          <p>Solutions digitales sur mesure.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
