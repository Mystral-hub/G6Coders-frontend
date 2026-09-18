import api from "@/lib/api";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  payload: LoginPayload,
 ): Promise<LoginResponse> {
  const form = new URLSearchParams();

  form.append("username", payload.username);
  form.append("password", payload.password);

  const response = await api.post<LoginResponse>("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
}
