import api from "@/lib/api";

export interface GalleryPhoto {
  id: number;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface GalleryPhotoPage {
  items: GalleryPhoto[];
  total: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const response = await api.get<GalleryPhoto[]>("/gallery-photos/");

  return response.data;
}

export async function getGalleryPhotosPage(
  page: number,
  itemsPerPage: number,
): Promise<GalleryPhotoPage> {
  const response = await api.get<GalleryPhotoPage>(
    "/gallery-photos/paginated",
    {
      params: {
        page,
        items_per_page: itemsPerPage,
      },
    },
  );

  return response.data;
}
