import api from "@/lib/api";

export interface Testimonial {
  id: number;
  author_name: string;
  message: string;
  rating: number;
  created_at: string;
}

export interface CreateTestimonialPayload {
  author_name: string;
  message: string;
  rating: number;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await api.get<Testimonial[]>("/testimonials/");

  return response.data;
}

export async function createTestimonial(
  payload: CreateTestimonialPayload,
): Promise<Testimonial> {
  const response = await api.post<Testimonial>("/testimonials/", payload);

  return response.data;
}
