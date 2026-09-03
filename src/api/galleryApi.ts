import api from "@/lib/api";

export interface GalleryPhoto {
  id: number;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const response = await api.get<GalleryPhoto[]>("/gallery-photos/");

  return response.data;
}
