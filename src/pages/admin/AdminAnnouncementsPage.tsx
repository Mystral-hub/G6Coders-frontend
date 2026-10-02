import { useEffect, useState } from "react";
import {
  Bell,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  type Announcement,
  type AnnouncementFormValues,
} from "@/api/announcementsApi";

import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import AnnouncementAdminCard from "@/components/admin/AnnouncementAdminCard";
import AnnouncementFormModal from "@/components/admin/AnnouncementFormModal";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

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

  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  const [announcementToDelete, setAnnouncementToDelete] =
    useState<Announcement | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [notice, setNotice] =
    useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialAnnouncements() {
      try {
        const data = await getAnnouncements();

        if (isMounted) {
          setAnnouncements(data);
          setHasError(false);
        }
      } catch (error) {
        console.error(
          "Impossible de charger les annonces :",
          error,
        );

        if (isMounted) {
          setHasError(true);

          setNotice({
            type: "error",
            title: "Chargement impossible",
            message:
              "Les annonces ne peuvent pas être chargées pour le moment.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  async function reloadAnnouncements() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getAnnouncements();

      setAnnouncements(data);
    } catch (error) {
      console.error(
        "Impossible de charger les annonces :",
        error,
      );

      setHasError(true);

      setNotice({
        type: "error",
        title: "Chargement impossible",
        message:
          "Les annonces ne peuvent pas être chargées pour le moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingAnnouncement(null);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(
    announcement: Announcement,
  ) {
    setEditingAnnouncement(announcement);
    setFormError("");
    setIsModalOpen(true);
  }

  function closeFormModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingAnnouncement(null);
    setFormError("");
  }

  async function handleSubmit(
    values: AnnouncementFormValues,
  ) {
    setIsSubmitting(true);
    setFormError("");

    try {
      if (editingAnnouncement) {
        const updatedAnnouncement =
          await updateAnnouncement(
            editingAnnouncement.id,
            values,
          );

        setAnnouncements((current) =>
          current.map((announcement) =>
            announcement.id === updatedAnnouncement.id
              ? updatedAnnouncement
              : announcement,
          ),
        );

        setNotice({
          type: "success",
          title: "Annonce modifiée",
          message:
            "L’annonce a été mise à jour avec succès.",
        });
      } else {
        const createdAnnouncement =
          await createAnnouncement(values);

        setAnnouncements((current) => [
          createdAnnouncement,
          ...current,
        ]);

        setNotice({
          type: "success",
          title: "Annonce publiée",
          message:
            "L’annonce a été publiée avec succès.",
        });
      }

      setIsModalOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      console.error(
        "Impossible d’enregistrer l’annonce :",
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
    if (!announcementToDelete) {
      return;
    }

    const announcement =
      announcementToDelete;

    setDeletingId(announcement.id);

    try {
      await deleteAnnouncement(announcement.id);

      setAnnouncements((current) =>
        current.filter(
          (item) => item.id !== announcement.id,
        ),
      );

      setAnnouncementToDelete(null);

      setNotice({
        type: "success",
        title: "Annonce supprimée",
        message: `L’annonce « ${announcement.title} » a été supprimée avec succès.`,
      });
    } catch (error) {
      console.error(
        "Impossible de supprimer l’annonce :",
        error,
      );

      setAnnouncementToDelete(null);

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
            Annonces
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Publiez et gérez les actualités affichées aux visiteurs.
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
          Ajouter une annonce
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des annonces...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les annonces.
          </p>

          <button
            type="button"
            onClick={() =>
              void reloadAnnouncements()
            }
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            Réessayer
          </button>
        </div>
      )}

      {!isLoading &&
        !hasError &&
        announcements.length === 0 && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <Bell
              className="mx-auto h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="mt-4 text-muted-foreground">
              Aucune annonce n’est enregistrée pour le moment.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              Publier la première annonce
            </button>
          </div>
        )}

      {!isLoading &&
        !hasError &&
        announcements.length > 0 && (
          <>
            {/* Tableau desktop */}
            <div className="hidden overflow-hidden rounded-2xl border bg-background shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        Annonce
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Contenu
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {announcements.map(
                      (announcement) => (
                        <tr
                          key={announcement.id}
                          className="align-middle">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {announcement.image_url ? (
                                <img
                                  src={announcement.image_url}
                                  alt={`Illustration de ${announcement.title}`}
                                  className="h-14 w-20 rounded-lg border object-cover"
                                />
                              ) : (
                                <div className="flex h-14 w-20 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                                  <Bell className="h-5 w-5" />
                                </div>
                              )}

                              <span className="font-semibold">
                                {announcement.title}
                              </span>
                            </div>
                          </td>

                          <td className="max-w-lg px-5 py-4 text-muted-foreground">
                            <p className="line-clamp-2">
                              {announcement.content}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditModal(
                                    announcement,
                                  )
                                }
                                className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                aria-label={`Modifier ${announcement.title}`}>
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setAnnouncementToDelete(
                                    announcement,
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  announcement.id
                                }
                                className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                                aria-label={`Supprimer ${announcement.title}`}>
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cartes mobile */}
            <div className="grid gap-4 md:hidden">
              {announcements.map(
                (announcement) => (
                  <AnnouncementAdminCard
                    key={announcement.id}
                    announcement={announcement}
                    isDeleting={
                      deletingId === announcement.id
                    }
                    onEdit={openEditModal}
                    onDelete={setAnnouncementToDelete}
                  />
                ),
              )}
            </div>
          </>
        )}

      <AnnouncementFormModal
        key={`${isModalOpen ? "open" : "closed"}-${
          editingAnnouncement?.id ?? "new"
        }`}
        open={isModalOpen}
        announcement={editingAnnouncement}
        isSubmitting={isSubmitting}
        error={formError}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDialog
        open={announcementToDelete !== null}
        title="Confirmer la suppression"
        message={
          announcementToDelete
            ? `Voulez-vous vraiment supprimer l’annonce « ${announcementToDelete.title} » ? Cette action est irréversible.`
            : ""
        }
        isLoading={deletingId !== null}
        onCancel={() =>
          setAnnouncementToDelete(null)
        }
        onConfirm={() =>
          void confirmDelete()
        }
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
