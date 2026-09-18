/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, type ReactNode } from "react";

import { login as loginRequest } from "@/api/auth";
import { decodeToken, isTokenExpired } from "@/lib/jwt";

const TOKEN_KEY = "access_token";

export interface AdminSession {
  username: string;
}

interface AuthContextValue {
  admin: AdminSession | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

function getStoredAdmin(): AdminSession | null {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return null;
  }

  const payload = decodeToken(token);

  if (!payload?.sub || isTokenExpired(payload)) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }

  return {
    username: payload.sub,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminSession | null>(getStoredAdmin);

  async function login(username: string, password: string): Promise<void> {
    const data = await loginRequest({
      username,
      password,
    });

    const payload = decodeToken(data.access_token);

    if (!payload?.sub || isTokenExpired(payload)) {
      throw new Error("Le token reçu est invalide ou expiré.");
    }

    localStorage.setItem(TOKEN_KEY, data.access_token);

    setAdmin({
      username: payload.sub,
    });
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading: false,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export { TOKEN_KEY };
