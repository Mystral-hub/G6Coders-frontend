import api from "@/lib/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface ProjectPage {
  items: Project[];
  total: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects/");

  return response.data;
}

export async function getProjectsPage(
  page: number,
  itemsPerPage: number,
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>("/projects/paginated", {
    params: {
      page,
      items_per_page: itemsPerPage,
    },
  });

  return response.data;
}

export async function getProject(projectId: number): Promise<Project> {
  const response = await api.get<Project>(`/projects/${projectId}`);

  return response.data;
}
