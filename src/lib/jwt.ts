export interface TokenPayload {
  sub?: string;
  exp?: number;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);

    return JSON.parse(decoded) as TokenPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(payload: TokenPayload): boolean {
  return Boolean(payload.exp && payload.exp * 1000 <= Date.now());
}
