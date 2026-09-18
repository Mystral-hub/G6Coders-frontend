import api from "@/lib/api";

export interface Partner {
  id: number;
  name: string;
  image_url: string;
  partner_status: string;
  partnership_type: string;
  created_at: string;
  updated_at: string | null;
}

export interface PartnerFormValues {
  name: string;
  partner_status: string;
  partnership_type: string;
  image?: File | null;
}

export async function getPartners(): Promise<Partner[]> {
  const response = await api.get<Partner[]>("/partners/");
  return response.data;
}

export async function getPartner(partnerId: number): Promise<Partner> {
  const response = await api.get<Partner>(`/partners/${partnerId}`);
  return response.data;
}

function toPartnerFormData(values: PartnerFormValues): FormData {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("partner_status", values.partner_status);
  formData.append("partnership_type", values.partnership_type);

  if (values.image) {
    formData.append("image", values.image);
  }

  return formData;
}

export async function createPartner(
  values: PartnerFormValues,
): Promise<Partner> {
  const response = await api.post<Partner>(
    "/partners/",
    toPartnerFormData(values),
  );
  return response.data;
}

export async function updatePartner(
  partnerId: number,
  values: Partial<PartnerFormValues>,
): Promise<Partner> {
  const formData = new FormData();

  if (values.name !== undefined) {
    formData.append("name", values.name);
  }
  if (values.partner_status !== undefined) {
    formData.append("partner_status", values.partner_status);
  }
  if (values.partnership_type !== undefined) {
    formData.append("partnership_type", values.partnership_type);
  }
  if (values.image) {
    formData.append("image", values.image);
  }

  const response = await api.put<Partner>(
    `/partners/${partnerId}`,
    formData,
  );
  return response.data;
}

export async function deletePartner(partnerId: number): Promise<void> {
  await api.delete(`/partners/${partnerId}`);
}
