import api from "@/lib/api";

export interface PublicStats {
  delivered_projects_count: number;
  active_clients_count: number;
  trained_talents_count: number;
  years_of_experience: number;
  recommendation_rate: number;
  average_rating: number;
  updated_at: string;
}

export interface StatsUpdatePayload {
  delivered_projects_count?: number;
  active_clients_count?: number;
  trained_talents_count?: number;
  years_of_experience?: number;
  recommendation_rate?: number;
}

export async function getPublicStats(): Promise<PublicStats> {
  const response = await api.get<PublicStats>(
    "/stats/",
  );

  return response.data;
}

export async function updateStats(
  payload: StatsUpdatePayload,
): Promise<PublicStats> {
  const response = await api.patch<PublicStats>(
    "/stats/",
    payload,
  );

  return response.data;
}
