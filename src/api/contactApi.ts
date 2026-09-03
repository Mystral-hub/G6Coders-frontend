import api from "@/lib/api";

export interface ContactPayload {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  detail: string;
  sent_at: string;
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const response = await api.post<ContactResponse>("/contact/", payload);

  return response.data;
}
