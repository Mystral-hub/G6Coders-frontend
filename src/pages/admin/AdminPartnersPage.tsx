import { useEffect, useState } from "react";
import { Handshake, Pencil, Plus, Trash2 } from "lucide-react";

import {
  createPartner,
  deletePartner,
  getPartners,
  updatePartner,
  type Partner,
  type PartnerFormValues,
} from "@/api/partners";

import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminNoticeDialog from "@/components/admin/AdminNoticeDialog";
import PartnerFormModal from "@/components/admin/PartnerFormModal";

interface NoticeState {
  type: "success" | "error";
  title: string;
  message: string;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notice, setNotice] = useState<NoticeState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialPartners() {
      try {
        const data = await getPartners();

        if (isMounted) {
          setPartners(data);
          setHasError(false);
        }
      } catch (error) {
        console.error("Impossible de charger les partenaires :", error);

        if (isMounted) {
          setHasError(true);

          setNotice({
            type: "error",
            title: "Chargement impossible",
            message:
              "Les partenaires ne peuvent pas être chargés pour le moment.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  async function reloadPartners() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getPartners();

      setPartners(data);
    } catch (error) {
      console.error("Impossible de charger les partenaires :", error);

      setHasError(true);

      setNotice({
        type: "error",
        title: "Chargement impossible",
        message: "Les partenaires ne peuvent pas être chargés pour le moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingPartner(null);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(partner: Partner) {
    setEditingPartner(partner);
    setFormError("");
    setIsModalOpen(true);
  }

  function closeFormModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingPartner(null);
    setFormError("");
  }

  async function handleSubmit(values: PartnerFormValues) {
    setIsSubmitting(true);
    setFormError("");

    try {
      if (editingPartner) {
        const updatedPartner = await updatePartner(editingPartner.id, values);

        setPartners((current) =>
          current.map((partner) =>
            partner.id === updatedPartner.id ? updatedPartner : partner,
          ),
        );

        setNotice({
          type: "success",
          title: "Partenaire modifié",
          message:
            "Les informations du partenaire ont été mises à jour avec succès.",
        });
      } else {
        const createdPartner = await createPartner(values);

        setPartners((current) => [createdPartner, ...current]);

        setNotice({
          type: "success",
          title: "Partenaire ajouté",
          message: "Le partenaire a été ajouté avec succès.",
        });
      }

      setIsModalOpen(false);
      setEditingPartner(null);
    } catch (error) {
      console.error("Impossible d’enregistrer le partenaire :", error);

      setFormError(
        "L’enregistrement a échoué. Vérifiez les champs et réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!partnerToDelete) {
      return;
    }

    const partner = partnerToDelete;

    setDeletingId(partner.id);

    try {
      await deletePartner(partner.id);

      setPartners((current) =>
        current.filter((item) => item.id !== partner.id),
      );

      setPartnerToDelete(null);

      setNotice({
        type: "success",
        title: "Partenaire supprimé",
        message: `Le partenaire « ${partner.name} » a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error("Impossible de supprimer le partenaire :", error);

      setPartnerToDelete(null);

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

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Partenaires
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Gérez les partenaires affichés sur la page d’accueil.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter un partenaire
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border bg-background p-8 text-center text-sm text-muted-foreground">
          Chargement des partenaires...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="rounded-2xl border bg-background p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les partenaires.
          </p>

          <button
            type="button"
            onClick={() => void reloadPartners()}
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
            Réessayer
          </button>
        </div>
      )}

      {!isLoading && !hasError && partners.length === 0 && (
        <div className="rounded-2xl border bg-background p-10 text-center">
          <Handshake
            className="mx-auto h-10 w-10 text-primary"
            aria-hidden="true"
          />

          <p className="mt-4 text-muted-foreground">
            Aucun partenaire n’est enregistré pour le moment.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Ajouter le premier partenaire
          </button>
        </div>
      )}

      {!isLoading && !hasError && partners.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-sm">
              <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Partenaire</th>

                  <th className="px-5 py-4 font-semibold">Statut</th>

                  <th className="px-5 py-4 font-semibold">Type</th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {partners.map((partner) => (
                  <tr key={partner.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={partner.image_url}
                          alt={`Logo de ${partner.name}`}
                          className="h-12 w-12 rounded-lg border object-contain p-1"
                        />

                        <span className="font-semibold">{partner.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {partner.partner_status}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {partner.partnership_type}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(partner)}
                          className="rounded-lg border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`Modifier ${partner.name}`}>
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setPartnerToDelete(partner)}
                          disabled={deletingId === partner.id}
                          className="rounded-lg border p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          aria-label={`Supprimer ${partner.name}`}>
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

      <PartnerFormModal
        key={`${isModalOpen ? "open" : "closed"}-${
          editingPartner?.id ?? "new"
        }`}
        open={isModalOpen}
        partner={editingPartner}
        isSubmitting={isSubmitting}
        error={formError}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDialog
        open={partnerToDelete !== null}
        title="Confirmer la suppression"
        message={
          partnerToDelete
            ? `Voulez-vous vraiment supprimer le partenaire « ${partnerToDelete.name} » ? Cette action est irréversible.`
            : ""
        }
        isLoading={deletingId !== null}
        onCancel={() => setPartnerToDelete(null)}
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
