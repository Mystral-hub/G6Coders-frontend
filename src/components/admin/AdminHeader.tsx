import { Menu, UserRound } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { admin } = useAuth();

  const username = admin?.username ?? "Administrateur";
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        aria-label="Ouvrir le menu">
        <Menu size={22} />
      </button>

      <div className="hidden md:block">
        <p className="text-xs text-muted-foreground">Espace d’administration</p>

        <p className="text-sm font-semibold">Bienvenue, {username}</p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs text-muted-foreground">Connecté en tant que</p>

          <p className="text-sm font-semibold">{username}</p>
        </div>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          title={username}
          aria-label={`Utilisateur connecté : ${username}`}>
          {initial || <UserRound size={16} />}
        </div>
      </div>
    </header>
  );
}
