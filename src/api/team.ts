import api from "@/lib/api";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image_url: string;
  linkedin_url: string | null;
  github_url: string | null;
  skills: string[];
  created_at: string;
  updated_at: string | null;
}

export interface TeamMemberFormValues {
  name: string;
  role: string;
  skills: string[];
  linkedin_url?: string | null;
  github_url?: string | null;
  image?: File | null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await api.get<TeamMember[]>("/team-members/");
  return response.data;
}

export async function getTeamMember(memberId: number): Promise<TeamMember> {
  const response = await api.get<TeamMember>(`/team-members/${memberId}`);
  return response.data;
}

function toTeamMemberFormData(values: TeamMemberFormValues): FormData {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("role", values.role);
  formData.append("skills", JSON.stringify(values.skills));

  if (values.linkedin_url) {
    formData.append("linkedin_url", values.linkedin_url);
  }
  if (values.github_url) {
    formData.append("github_url", values.github_url);
  }
  if (values.image) {
    formData.append("image", values.image);
  }

  return formData;
}

export async function createTeamMember(
  values: TeamMemberFormValues,
): Promise<TeamMember> {
  const response = await api.post<TeamMember>(
    "/team-members/",
    toTeamMemberFormData(values),
  );
  return response.data;
}

export async function updateTeamMember(
  memberId: number,
  values: Partial<TeamMemberFormValues>,
): Promise<TeamMember> {
  const formData = new FormData();

  if (values.name !== undefined) {
    formData.append("name", values.name);
  }
  if (values.role !== undefined) {
    formData.append("role", values.role);
  }
  if (values.skills !== undefined) {
    formData.append("skills", JSON.stringify(values.skills));
  }
  if (values.linkedin_url !== undefined && values.linkedin_url !== null) {
    formData.append("linkedin_url", values.linkedin_url);
  }
  if (values.github_url !== undefined && values.github_url !== null) {
    formData.append("github_url", values.github_url);
  }
  if (values.image) {
    formData.append("image", values.image);
  }

  const response = await api.put<TeamMember>(
    `/team-members/${memberId}`,
    formData,
  );
  return response.data;
}

export async function deleteTeamMember(memberId: number): Promise<void> {
  await api.delete(`/team-members/${memberId}`);
}
