import api from "@/lib/api";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export interface AnnouncementFormValues {
  title: string;
  content: string;
  image?: File | null;
}

export async function getAnnouncements(): Promise<
  Announcement[]
> {
  const response = await api.get<Announcement[]>(
    "/announcements/",
  );

  return response.data;
}

function toAnnouncementFormData(
  values: AnnouncementFormValues,
): FormData {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("content", values.content);

  if (values.image) {
    formData.append("image", values.image);
  }

  return formData;
}

export async function createAnnouncement(
  values: AnnouncementFormValues,
): Promise<Announcement> {
  const response = await api.post<Announcement>(
    "/announcements/",
    toAnnouncementFormData(values),
  );

  return response.data;
}

export async function updateAnnouncement(
  announcementId: number,
  values: AnnouncementFormValues,
): Promise<Announcement> {
  const response = await api.put<Announcement>(
    `/announcements/${announcementId}`,
    toAnnouncementFormData(values),
  );

  return response.data;
}

export async function deleteAnnouncement(
  announcementId: number,
): Promise<void> {
  await api.delete(
    `/announcements/${announcementId}`,
  );
}
