import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";

export default function ProtectedRoute() {
  const { admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (!admin) {
    return <Navigate to={ROUTES.admin.login} replace />;
  }

  return <Outlet />;
}
