import { useEffect, useState } from "react";
import {
  ExternalLink,
  FolderKanban,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Project,
  type ProjectFormValues,
} from "@/api/projectsApi";

import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import ProjectAdminCard from "@/components/admin/ProjectAdminCard";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [hasError, setHasError] =
    useState(false);
  const [formError, setFormError] =
    useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null);
  const [deletingId, setDeletingId] =
    useState<number | null>(null);
  const [notice, setNotice] =
    useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialProjects() {
      try {
        const data = await getProjects();

        if (isMounted) {
          setProjects(data);
          setHasError(false);
        }
      } catch (error) {
        console.error(
          "Impossible de charger les projets :",
          error,
        );

        if (isMounted) {
          setHasError(true);

          setNotice({
            type: "error",
            title: "Chargement impossible",
            message:
              "Les projets ne peuvent pas être chargés pour le moment.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  async function reloadProjects() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(
        "Impossible de charger les projets :",
        error,
      );

      setHasError(true);

      setNotice({
        type: "error",
        title: "Chargement impossible",
        message:
          "Les projets ne peuvent pas être chargés pour le moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProject(null);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setFormError("");
    setIsModalOpen(true);
  }

  function closeFormModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingProject(null);
    setFormError("");
  }

  async function handleSubmit(
    values: ProjectFormValues,
  ) {
    setIsSubmitting(true);
    setFormError("");

    try {
      if (editingProject) {
        const updatedProject =
          await updateProject(
            editingProject.id,
            values,
          );

        setProjects((current) =>
          current.map((project) =>
            project.id === updatedProject.id
              ? updatedProject
              : project,
          ),
        );

        setNotice({
          type: "success",
          title: "Projet modifié",
          message:
            "Les informations du projet ont été mises à jour avec succès.",
        });
      } else {
        const createdProject =
          await createProject(values);

        setProjects((current) => [
          createdProject,
          ...current,
        ]);

        setNotice({
          type: "success",
          title: "Projet ajouté",
          message:
            "Le projet a été ajouté avec succès.",
        });
      }

      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error(
        "Impossible d’enregistrer le projet :",
        error,
      );

      setFormError(
        "L’enregistrement a échoué. Vérifiez les champs et réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!projectToDelete) {
      return;
    }

    const project = projectToDelete;

    setDeletingId(project.id);

    try {
      await deleteProject(project.id);

      setProjects((current) =>
        current.filter(
          (item) => item.id !== project.id,
        ),
      );

      setProjectToDelete(null);

      setNotice({
        type: "success",
        title: "Projet supprimé",
        message: `Le projet « ${project.title} » a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error(
        "Impossible de supprimer le projet :",
        error,
      );

      setProjectToDelete(null);

      setNotice({
        type: "error",
        title: "Suppression impossible",
        message:
          "La suppression a échoué. Veuillez réessayer.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Contenu public
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Projets
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Gérez les projets présentés sur le site et leurs liens publics.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          <Plus
            className="h-4 w-4"
            aria-hidden="true"
          />
          Ajouter un projet
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des projets...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les projets.
          </p>

          <button
            type="button"
            onClick={() => void reloadProjects()}
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            Réessayer
          </button>
        </div>
      )}

      {!isLoading &&
        !hasError &&
        projects.length === 0 && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <FolderKanban
              className="mx-auto h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="mt-4 text-muted-foreground">
              Aucun projet n’est enregistré pour le moment.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              Ajouter le premier projet
            </button>
          </div>
        )}

      {!isLoading &&
        !hasError &&
        projects.length > 0 && (
          <>
            <div className="hidden overflow-hidden rounded-2xl border bg-background shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        Projet
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Description
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Lien
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {projects.map((project) => (
                      <tr
                        key={project.id}
                        className="align-middle">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                alt={`Image du projet ${project.title}`}
                                className="h-12 w-16 rounded-lg border object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-16 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                                <FolderKanban className="h-5 w-5" />
                              </div>
                            )}

                            <span className="font-semibold">
                              {project.title}
                            </span>
                          </div>
                        </td>

                        <td className="max-w-sm px-5 py-4 text-muted-foreground">
                          <p className="line-clamp-2">
                            {project.description}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {project.project_url ? (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex max-w-[220px] items-center gap-2 truncate text-primary hover:underline">
                              <ExternalLink className="h-4 w-4 shrink-0" />
                              <span className="truncate">
                                Voir le projet
                              </span>
                            </a>
                          ) : (
                            <span className="text-muted-foreground">
                              Aucun lien
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(project)
                              }
                              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                              aria-label={`Modifier ${project.title}`}>
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setProjectToDelete(project)
                              }
                              disabled={
                                deletingId === project.id
                              }
                              className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                              aria-label={`Supprimer ${project.title}`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 md:hidden">
              {projects.map((project) => (
                <ProjectAdminCard
                  key={project.id}
                  project={project}
                  isDeleting={
                    deletingId === project.id
                  }
                  onEdit={openEditModal}
                  onDelete={setProjectToDelete}
                />
              ))}
            </div>
          </>
        )}

      <ProjectFormModal
        key={`${isModalOpen ? "open" : "closed"}-${
          editingProject?.id ?? "new"
        }`}
        open={isModalOpen}
        project={editingProject}
        isSubmitting={isSubmitting}
        error={formError}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDialog
        open={projectToDelete !== null}
        title="Confirmer la suppression"
        message={
          projectToDelete
            ? `Voulez-vous vraiment supprimer le projet « ${projectToDelete.title} » ? Cette action est irréversible.`
            : ""
        }
        isLoading={deletingId !== null}
        onCancel={() =>
          setProjectToDelete(null)
        }
        onConfirm={() => void confirmDelete()}
      />

      <AdminNoticeDialog
        open={notice !== null}
        type={notice?.type ?? "success"}
        title={notice?.title ?? ""}
        message={notice?.message ?? ""}
        onClose={() => setNotice(null)}
      />
    </section>
  );
}
