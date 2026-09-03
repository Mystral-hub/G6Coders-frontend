import api from "@/lib/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects/");

  return response.data;
}

export async function getProject(projectId: number): Promise<Project> {
  const response = await api.get<Project>(`/projects/${projectId}`);

  return response.data;
}
