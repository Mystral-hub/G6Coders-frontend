import {
  BarChart3,
  Bell,
  FolderKanban,
  Handshake,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Users,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  {
    path: ROUTES.admin.dashboard,
    label: "Tableau de bord",
    icon: LayoutDashboard,
    exact: true,
  },

  {
    path: ROUTES.admin.projects,
    label: "Projets",
    icon: FolderKanban,
    exact: false,
  },

  {
    path: ROUTES.admin.partners,
    label: "Partenaires",
    icon: Handshake,
    exact: false,
  },

  {
    path: ROUTES.admin.team,
    label: "Équipe",
    icon: Users,
    exact: false,
  },

  {
    path: ROUTES.admin.announcements,
    label: "Annonces",
    icon: Bell,
    exact: false,
  },

  {
    path: ROUTES.admin.gallery,
    label: "Galerie",
    icon: Images,
    exact: false,
  },

  {
    path: ROUTES.admin.testimonials,
    label: "Témoignages",
    icon: MessageSquareQuote,
    exact: false,
  },

  {
    path: ROUTES.admin.stats,
    label: "Statistiques",
    icon: BarChart3,
    exact: false,
  },
];

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  function handleLogout() {
    onClose();
    logout();
  }

  function isActive(path: string, exact: boolean) {
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform duration-200 md:static md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Navigation administrateur">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
        <Link
          to={ROUTES.admin.dashboard}
          onClick={onClose}
          className="text-lg font-bold tracking-tight text-primary">
          G6Coders Admin
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          aria-label="Fermer le menu">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Menu principal
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          const active = isActive(item.path, item.exact);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              <Icon size={18} strokeWidth={active ? 2.4 : 2} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
