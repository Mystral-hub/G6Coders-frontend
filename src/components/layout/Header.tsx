import { useEffect, useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routePaths";

type SectionNavigationItem = {
  label: string;
  href: string;
  type: "section";
};

type PageNavigationItem = {
  label: string;
  href: string;
  type: "page";
};

type NavigationItem = SectionNavigationItem | PageNavigationItem;

const navigationItems: NavigationItem[] = [
  { label: "Accueil", href: "#accueil", type: "section" },
  { label: "Services", href: "#services", type: "section" },
  { label: "À propos", href: "#apropos", type: "section" },
  { label: "Contact", href: "#contact", type: "section" },
  { label: "Galerie", href: ROUTES.gallery, type: "page" },
  { label: "Projets", href: ROUTES.projects, type: "page" },
];

function getSectionId(href: string) {
  return href.replace("#", "");
}

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const isHomePage = location.pathname === ROUTES.home;

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const sectionIds = navigationItems
      .filter((item): item is SectionNavigationItem => item.type === "section")
      .map((item) => getSectionId(item.href));

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSectionClick(sectionId: string) {
    setActiveSection(sectionId);
    closeMenu();
  }

  function isItemActive(item: NavigationItem) {
    if (item.type === "page") {
      return location.pathname === item.href;
    }

    return isHomePage && activeSection === getSectionId(item.href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#accueil"
          className="flex items-center gap-1"
          onClick={() => handleSectionClick("accueil")}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-black md:text-2xl">
            G6
          </span>
          <span className="text-xl font-bold tracking-tight md:text-2xl">
            <span className="text-primary">Coders</span>
          </span>
        </a>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-2 border-b bg-background p-6 md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 lg:gap-7`}
          aria-label="Navigation principale">
          {navigationItems.map((item) => {
            const active = isItemActive(item);
            const linkClassName = `relative rounded-md px-3 py-2 text-base transition ${
              active
                ? "font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`;

            if (item.type === "page") {
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={linkClassName}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}>
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            }

            const sectionId = getSectionId(item.href);
            const sectionHref = isHomePage
              ? item.href
              : `${ROUTES.home}${item.href}`;

            return (
              <a
                key={item.href}
                href={sectionHref}
                className={linkClassName}
                aria-current={active ? "location" : undefined}
                onClick={() => handleSectionClick(sectionId)}>
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to={ROUTES.admin.login}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:flex">
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Connexion
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
