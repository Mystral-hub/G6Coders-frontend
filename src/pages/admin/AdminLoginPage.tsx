import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login(username, password);

      navigate(ROUTES.admin.dashboard, {
        replace: true,
      });
    } catch {
      setError("Nom d’utilisateur ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          G6Coders
        </p>

        <h1 className="mt-2 text-2xl font-bold">Espace administrateur</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Connectez-vous pour accéder au tableau de bord.
        </p>

        <div className="mt-6 space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Nom d’utilisateur
          </label>

          <input
            id="username"
            required
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-4 space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>

          <input
            id="password"
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="mt-6 w-full">
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
