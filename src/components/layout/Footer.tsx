import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ROUTES } from "@/routes/routePaths";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link to={ROUTES.home} className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
              G6
            </span>
            <span className="text-xl font-bold tracking-tight">
              G6<span className="text-primary">Coders</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-base leading-7 text-secondary-foreground/75">
            Nous transformons vos idées complexes en produits digitaux fiables,
            performants et conçus pour durer.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="mailto:contact@g6coders.com"
              aria-label="Envoyer un e-mail à G6Coders"
              className="rounded-md p-2.5 text-secondary-foreground/75 transition hover:bg-secondary-foreground/10 hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="G6Coders sur GitHub"
              className="rounded-md p-2.5 text-secondary-foreground/75 transition hover:bg-secondary-foreground/10 hover:text-primary">
              <FaGithub className="h-5 w-5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="G6Coders sur LinkedIn"
              className="rounded-md p-2.5 text-secondary-foreground/75 transition hover:bg-secondary-foreground/10 hover:text-primary">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Navigation
          </h2>

          <nav className="mt-5 flex flex-col gap-4 text-base text-secondary-foreground/75">
            <a className="transition hover:text-primary" href="#accueil">
              Accueil
            </a>
            <a className="transition hover:text-primary" href="#services">
              Services
            </a>
            <a className="transition hover:text-primary" href="#apropos">
              À propos
            </a>
            <a className="transition hover:text-primary" href="#contact">
              Contact
            </a>
          </nav>
        </div>

        <div>
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Espace administrateur
          </h2>

          <p className="mt-5 text-base leading-7 text-secondary-foreground/75">
            Accédez à l’interface de gestion des contenus G6Coders.
          </p>

          <Link
            to={ROUTES.admin.login}
            className="mt-5 inline-flex text-base font-medium text-secondary-foreground transition hover:text-primary">
            Se connecter →
          </Link>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-secondary-foreground/65 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} G6Coders. Tous droits réservés.</p>
          <p>Solutions digitales sur mesure.</p>
        </div>
      </div>
    </footer>
  );
}
