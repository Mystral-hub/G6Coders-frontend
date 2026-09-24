import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Users } from "lucide-react";

import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
  type TeamMember,
  type TeamMemberFormValues,
} from "@/api/team";

import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import TeamMemberFormModal from "@/components/admin/TeamMemberFormModal";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notice, setNotice] = useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialMembers() {
      try {
        const data = await getTeamMembers();

        if (isMounted) {
          setMembers(data);
          setHasError(false);
        }
      } catch (error) {
        console.error("Impossible de charger les membres de l’équipe :", error);

        if (isMounted) {
          setHasError(true);

          setNotice({
            type: "error",
            title: "Chargement impossible",
            message:
              "Les membres de l’équipe ne peuvent pas être chargés pour le moment.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  async function reloadMembers() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getTeamMembers();
      setMembers(data);
    } catch (error) {
      console.error("Impossible de charger les membres de l’équipe :", error);

      setHasError(true);

      setNotice({
        type: "error",
        title: "Chargement impossible",
        message:
          "Les membres de l’équipe ne peuvent pas être chargés pour le moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingMember(null);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(member: TeamMember) {
    setEditingMember(member);
    setFormError("");
    setIsModalOpen(true);
  }

  function closeFormModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingMember(null);
    setFormError("");
  }

  async function handleSubmit(values: TeamMemberFormValues) {
    setIsSubmitting(true);
    setFormError("");

    try {
      if (editingMember) {
        const updatedMember = await updateTeamMember(editingMember.id, values);

        setMembers((current) =>
          current.map((member) =>
            member.id === updatedMember.id ? updatedMember : member,
          ),
        );

        setNotice({
          type: "success",
          title: "Membre modifié",
          message:
            "Les informations du membre ont été mises à jour avec succès.",
        });
      } else {
        const createdMember = await createTeamMember(values);

        setMembers((current) => [createdMember, ...current]);

        setNotice({
          type: "success",
          title: "Membre ajouté",
          message: "Le membre a été ajouté avec succès.",
        });
      }

      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Impossible d’enregistrer le membre :", error);

      setFormError(
        "L’enregistrement a échoué. Vérifiez les champs et réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!memberToDelete) {
      return;
    }

    const member = memberToDelete;

    setDeletingId(member.id);

    try {
      await deleteTeamMember(member.id);

      setMembers((current) => current.filter((item) => item.id !== member.id));

      setMemberToDelete(null);

      setNotice({
        type: "success",
        title: "Membre supprimé",
        message: `Le membre « ${member.name} » a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error("Impossible de supprimer le membre :", error);

      setMemberToDelete(null);

      setNotice({
        type: "error",
        title: "Suppression impossible",
        message: "La suppression a échoué. Veuillez réessayer.",
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

          <h1 className="mt-2 text-3xl font-bold tracking-tight">Équipe</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Gérez les membres et les compétences affichés sur la page d’accueil.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter un membre
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des membres...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les membres de l’équipe.
          </p>

          <button
            type="button"
            onClick={() => void reloadMembers()}
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            Réessayer
          </button>
        </div>
      )}

      {!isLoading && !hasError && members.length === 0 && (
        <div className="rounded-2xl border bg-background p-10 text-center">
          <Users
            className="mx-auto h-10 w-10 text-primary"
            aria-hidden="true"
          />

          <p className="mt-4 text-muted-foreground">
            Aucun membre d’équipe n’est enregistré pour le moment.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Ajouter le premier membre
          </button>
        </div>
      )}

      {!isLoading && !hasError && members.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
              <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Membre</th>

                  <th className="px-5 py-4 font-semibold">Rôle</th>

                  <th className="px-5 py-4 font-semibold">Compétences</th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {members.map((member) => (
                  <tr key={member.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.image_url}
                          alt={`Photo de ${member.name}`}
                          className="h-12 w-12 rounded-full border object-cover"
                        />

                        <span className="font-semibold">{member.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {member.role}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex max-w-md flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-black">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(member)}
                          className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`Modifier ${member.name}`}>
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setMemberToDelete(member)}
                          disabled={deletingId === member.id}
                          className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          aria-label={`Supprimer ${member.name}`}>
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
      )}

      <TeamMemberFormModal
        key={`${isModalOpen ? "open" : "closed"}-${editingMember?.id ?? "new"}`}
        open={isModalOpen}
        member={editingMember}
        isSubmitting={isSubmitting}
        error={formError}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDialog
        open={memberToDelete !== null}
        title="Confirmer la suppression"
        message={
          memberToDelete
            ? `Voulez-vous vraiment supprimer « ${memberToDelete.name} » ? Cette action est irréversible.`
            : ""
        }
        isLoading={deletingId !== null}
        onCancel={() => setMemberToDelete(null)}
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
