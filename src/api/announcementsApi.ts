import api from "@/lib/api";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const response = await api.get<Announcement[]>("/announcements/");

  return response.data;
}
