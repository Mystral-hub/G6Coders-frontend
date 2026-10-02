import api from "@/lib/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
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

export interface ProjectFormValues {
  title: string;
  description: string;
  project_url: string;
  image?: File | null;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects/");
  return response.data;
}

export async function getProjectsPage(
  page: number,
  itemsPerPage: number,
): Promise<ProjectPage> {
  const response = await api.get<ProjectPage>(
    "/projects/paginated",
    {
      params: {
        page,
        items_per_page: itemsPerPage,
      },
    },
  );

  return response.data;
}

export async function getProject(
  projectId: number,
): Promise<Project> {
  const response = await api.get<Project>(
    `/projects/${projectId}`,
  );

  return response.data;
}

function toProjectFormData(
  values: ProjectFormValues,
): FormData {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("project_url", values.project_url);

  if (values.image) {
    formData.append("image", values.image);
  }

  return formData;
}

export async function createProject(
  values: ProjectFormValues,
): Promise<Project> {
  const response = await api.post<Project>(
    "/projects/",
    toProjectFormData(values),
  );

  return response.data;
}

export async function updateProject(
  projectId: number,
  values: ProjectFormValues,
): Promise<Project> {
  const response = await api.put<Project>(
    `/projects/${projectId}`,
    toProjectFormData(values),
  );

  return response.data;
}

export async function deleteProject(
  projectId: number,
): Promise<void> {
  await api.delete(`/projects/${projectId}`);
}
