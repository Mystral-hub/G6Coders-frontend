import { useState } from "react";
import { X } from "lucide-react";

import type {
  TeamMember,
  TeamMemberFormValues,
} from "@/api/team";

interface TeamMemberFormModalProps {
  open: boolean;
  member: TeamMember | null;
  isSubmitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (
    values: TeamMemberFormValues,
  ) => Promise<void>;
}

function getInitialValues(
  member: TeamMember | null,
): TeamMemberFormValues {
  if (!member) {
    return {
      name: "",
      role: "",
      skills: [],
      linkedin_url: "",
      github_url: "",
      image: null,
    };
  }

  return {
    name: member.name,
    role: member.role,
    skills: member.skills,
    linkedin_url: member.linkedin_url ?? "",
    github_url: member.github_url ?? "",
    image: null,
  };
}

function skillsToText(skills: string[]) {
  return skills.join(", ");
}

function textToSkills(value: string) {
  return value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export default function TeamMemberFormModal({
  open,
  member,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: TeamMemberFormModalProps) {
  const [values, setValues] =
    useState<TeamMemberFormValues>(() =>
      getInitialValues(member),
    );

  const [skillsText, setSkillsText] =
    useState(() =>
      skillsToText(
        getInitialValues(member).skills,
      ),
    );

  const [imageName, setImageName] = useState("");

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof TeamMemberFormValues,
    value: string | null,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-member-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-background p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Équipe
            </p>

            <h2
              id="team-member-form-title"
              className="mt-1 text-2xl font-bold">
              {member
                ? "Modifier le membre"
                : "Ajouter un membre"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Fermer le formulaire"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            void onSubmit({
              ...values,
              skills: textToSkills(skillsText),
            });
          }}
          className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="team-member-name"
                className="text-sm font-medium">
                Nom
              </label>

              <input
                id="team-member-name"
                required
                value={values.name}
                onChange={(event) =>
                  updateField(
                    "name",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="team-member-role"
                className="text-sm font-medium">
                Rôle
              </label>

              <input
                id="team-member-role"
                required
                value={values.role}
                onChange={(event) =>
                  updateField(
                    "role",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="team-member-skills"
              className="text-sm font-medium">
              Compétences
            </label>

            <input
              id="team-member-skills"
              required
              placeholder="Python, React, FastAPI, PostgreSQL"
              value={skillsText}
              onChange={(event) =>
                setSkillsText(event.target.value)
              }
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <p className="text-sm text-muted-foreground">
              Séparez les compétences avec des virgules.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="team-member-linkedin"
                className="text-sm font-medium">
                URL LinkedIn{" "}
                <span className="text-muted-foreground">
                  (facultatif)
                </span>
              </label>

              <input
                id="team-member-linkedin"
                type="url"
                value={values.linkedin_url ?? ""}
                onChange={(event) =>
                  updateField(
                    "linkedin_url",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="team-member-github"
                className="text-sm font-medium">
                URL GitHub{" "}
                <span className="text-muted-foreground">
                  (facultatif)
                </span>
              </label>

              <input
                id="team-member-github"
                type="url"
                value={values.github_url ?? ""}
                onChange={(event) =>
                  updateField(
                    "github_url",
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="team-member-image"
              className="text-sm font-medium">
              Photo{" "}
              {member
                ? "(facultatif lors de la modification)"
                : ""}
            </label>

            <input
              id="team-member-image"
              required={!member}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file =
                  event.target.files?.[0] ?? null;

                setValues((current) => ({
                  ...current,
                  image: file,
                }));

                setImageName(file?.name ?? "");
              }}
              className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:font-medium"
            />

            {imageName && (
              <p className="text-xs text-muted-foreground">
                Fichier : {imageName}
              </p>
            )}

            {member?.image_url && !imageName && (
              <img
                src={member.image_url}
                alt={`Photo de ${member.name}`}
                className="mt-2 h-20 w-20 rounded-lg border object-cover"
              />
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted disabled:opacity-50">
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50">
              {isSubmitting
                ? "Enregistrement..."
                : member
                  ? "Enregistrer les modifications"
                  : "Ajouter le membre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
