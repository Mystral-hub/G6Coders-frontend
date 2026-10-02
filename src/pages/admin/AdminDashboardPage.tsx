import {
  useEffect,
  useState,
  type ElementType,
} from "react";

import {
  ArrowRight,
  BarChart3,
  Bell,
  FolderKanban,
  Handshake,
  Images,
  MessageSquareQuote,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import { getAnnouncements } from "@/api/announcementsApi";
import { getGalleryPhotos } from "@/api/galleryApi";
import { getPartners } from "@/api/partners";
import { getProjects } from "@/api/projectsApi";

import {
  getPublicStats,
  type PublicStats,
} from "@/api/statsApi";

import { getTeamMembers } from "@/api/team";
import { getTestimonials } from "@/api/testimonialsApi";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";

const DASHBOARD_CACHE_KEY =
  "g6coders_admin_dashboard_cache_v1";

interface DashboardCounts {
  projects: number | null;
  gallery: number | null;
  announcements: number | null;
  testimonials: number | null;
  partners: number | null;
  team: number | null;
}

interface DashboardCache {
  counts: DashboardCounts;
  stats: PublicStats | null;
  savedAt: string;
}

interface DashboardCardProps {
  title: string;
  description: string;
  count: number | null;
  label: string;
  href: string;
  icon: ElementType;
  colorClass: string;
}

const emptyCounts: DashboardCounts = {
  projects: null,
  gallery: null,
  announcements: null,
  testimonials: null,
  partners: null,
  team: null,
};

function readDashboardCache(): DashboardCache {
  if (typeof window === "undefined") {
    return {
      counts: emptyCounts,
      stats: null,
      savedAt: "",
    };
  }

  try {
    const rawCache = window.localStorage.getItem(
      DASHBOARD_CACHE_KEY,
    );

    if (!rawCache) {
      return {
        counts: emptyCounts,
        stats: null,
        savedAt: "",
      };
    }

    const parsedCache = JSON.parse(
      rawCache,
    ) as Partial<DashboardCache>;

    return {
      counts: {
        ...emptyCounts,
        ...(parsedCache.counts ?? {}),
      },
      stats: parsedCache.stats ?? null,
      savedAt: parsedCache.savedAt ?? "",
    };
  } catch (error) {
    console.warn(
      "Impossible de lire le cache du dashboard :",
      error,
    );

    return {
      counts: emptyCounts,
      stats: null,
      savedAt: "",
    };
  }
}

function saveDashboardCache(
  counts: DashboardCounts,
  stats: PublicStats | null,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const cache: DashboardCache = {
      counts,
      stats,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      DASHBOARD_CACHE_KEY,
      JSON.stringify(cache),
    );
  } catch (error) {
    console.warn(
      "Impossible d’enregistrer le cache du dashboard :",
      error,
    );
  }
}

function DashboardCard({
  title,
  description,
  count,
  label,
  href,
  icon: Icon,
  colorClass,
}: DashboardCardProps) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClass}`}>
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>

        <ArrowRight
          className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold tracking-tight">
            {count === null ? "—" : count}
          </p>

          <span className="text-sm text-muted-foreground">
            {label}
          </span>
        </div>

        <h2 className="mt-2 font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}

function MetricCard({
  value,
  suffix,
  label,
}: {
  value: number | null;
  suffix: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      <p className="text-3xl font-bold tracking-tight text-primary">
        {value === null ? "—" : value}

        <span className="text-xl">
          {suffix}
        </span>
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { admin } = useAuth();

  const cachedDashboard = readDashboardCache();

  const [counts, setCounts] =
    useState<DashboardCounts>(
      cachedDashboard.counts,
    );

  const [stats, setStats] =
    useState<PublicStats | null>(
      cachedDashboard.stats,
    );

  const [hasError, setHasError] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const results = await Promise.allSettled([
        getProjects(),
        getGalleryPhotos(),
        getAnnouncements(),
        getTestimonials(),
        getPartners(),
        getTeamMembers(),
        getPublicStats(),
      ]);

      if (!isMounted) {
        return;
      }

      const [
        projects,
        gallery,
        announcements,
        testimonials,
        partners,
        team,
        publicStats,
      ] = results;

      const hasFailedRequest = results.some(
        (result) =>
          result.status === "rejected",
      );

      const nextCounts: DashboardCounts = {
        projects:
          projects.status === "fulfilled"
            ? projects.value.length
            : cachedDashboard.counts.projects,

        gallery:
          gallery.status === "fulfilled"
            ? gallery.value.length
            : cachedDashboard.counts.gallery,

        announcements:
          announcements.status === "fulfilled"
            ? announcements.value.length
            : cachedDashboard.counts.announcements,

        testimonials:
          testimonials.status === "fulfilled"
            ? testimonials.value.length
            : cachedDashboard.counts.testimonials,

        partners:
          partners.status === "fulfilled"
            ? partners.value.length
            : cachedDashboard.counts.partners,

        team:
          team.status === "fulfilled"
            ? team.value.length
            : cachedDashboard.counts.team,
      };

      const nextStats =
        publicStats.status === "fulfilled"
          ? publicStats.value
          : cachedDashboard.stats;

      setCounts(nextCounts);
      setStats(nextStats);
      setHasError(hasFailedRequest);

      saveDashboardCache(
        nextCounts,
        nextStats,
      );
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Tableau de bord
        </h1>

        <p className="mt-2 text-muted-foreground">
          Bienvenue {admin?.username}. Suivez l’activité du contenu public de G6Coders.
        </p>
      </div>

      {hasError && (
        <div className="rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
          Certaines données n’ont pas pu être actualisées. Les dernières valeurs connues sont affichées.
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              Vue d’ensemble
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Accédez rapidement aux différents contenus du site.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="Projets"
            description="Gérez les réalisations et leurs liens publics."
            count={counts.projects}
            label="projets"
            href={ROUTES.admin.projects}
            icon={FolderKanban}
            colorClass="bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
          />

          <DashboardCard
            title="Membres de l’équipe"
            description="Gérez les profils et les compétences affichées."
            count={counts.team}
            label="membres"
            href={ROUTES.admin.team}
            icon={Users}
            colorClass="bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
          />

          <DashboardCard
            title="Partenaires"
            description="Gérez les partenaires présentés sur l’accueil."
            count={counts.partners}
            label="partenaires"
            href={ROUTES.admin.partners}
            icon={Handshake}
            colorClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          />

          <DashboardCard
            title="Galerie"
            description="Gérez les photos et les médias du site."
            count={counts.gallery}
            label="photos"
            href={ROUTES.admin.gallery}
            icon={Images}
            colorClass="bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
          />

          <DashboardCard
            title="Annonces"
            description="Publiez les actualités visibles par les visiteurs."
            count={counts.announcements}
            label="annonces"
            href={ROUTES.admin.announcements}
            icon={Bell}
            colorClass="bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300"
          />

          <DashboardCard
            title="Témoignages"
            description="Consultez et modérez les retours des visiteurs."
            count={counts.testimonials}
            label="témoignages"
            href={ROUTES.admin.testimonials}
            icon={MessageSquareQuote}
            colorClass="bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300"
          />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              Indicateurs publics
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Les chiffres actuellement affichés sur la page d’accueil.
            </p>
          </div>

          <Link
            to={ROUTES.admin.stats}
            className="hidden items-center gap-2 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            Modifier

            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <MetricCard
            value={
              stats?.delivered_projects_count ??
              null
            }
            suffix="+"
            label="Projets livrés"
          />

          <MetricCard
            value={
              stats?.active_clients_count ??
              null
            }
            suffix="+"
            label="Clients actifs"
          />

          <MetricCard
            value={
              stats?.trained_talents_count ??
              null
            }
            suffix="+"
            label="Talents formés"
          />

          <MetricCard
            value={
              stats?.recommendation_rate ??
              null
            }
            suffix="%"
            label="Taux de recommandation"
          />

          <MetricCard
            value={
              stats?.average_rating ??
              null
            }
            suffix="/5"
            label="Note moyenne"
          />
        </div>

        <Link
          to={ROUTES.admin.stats}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline sm:hidden">
          Modifier les indicateurs

          <ArrowRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      </div>

      <Link
        to={ROUTES.admin.stats}
        className="group flex items-center justify-between gap-4 rounded-2xl border bg-background p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3
              className="h-5 w-5"
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold">
              Gérer les statistiques
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Mettez à jour les indicateurs visibles par vos visiteurs.
            </p>
          </div>
        </div>

        <ArrowRight
          className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}
