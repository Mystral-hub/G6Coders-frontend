import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/routes/routePaths";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#accueil"
          className="flex items-center gap-3"
          onClick={closeMenu}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
            G6
          </span>
          <span className="text-xl font-bold tracking-tight">
            G6<span className="text-primary">Coders</span>
          </span>
        </a>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-18 flex-col gap-5 border-b bg-background p-6 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
          aria-label="Navigation principale"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base text-muted-foreground transition hover:text-foreground"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.admin.login}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:flex"
          >
            <LogIn className="h-5 w-5" />
            Connexion
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
