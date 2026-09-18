import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getGalleryPhotosPage,
  type GalleryPhoto,
  type GalleryPhotoPage,
} from "@/api/galleryApi";

const PHOTOS_PER_PAGE = 10;

function GallerySkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-background">
      <div className="aspect-4/3 bg-muted" />
      <div className="h-5 w-3/4 bg-muted p-5" />
    </div>
  );
}

function Pagination({
  pagination,
  onPrevious,
  onNext,
}: {
  pagination: GalleryPhotoPage;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (pagination.total_pages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination de la galerie"
      className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!pagination.has_previous}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-accent disabled:pointer-events-none disabled:opacity-40">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Précédents
      </button>

      <span className="text-sm font-medium text-muted-foreground">
        Page {pagination.page} sur {pagination.total_pages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={!pagination.has_next}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-accent disabled:pointer-events-none disabled:opacity-40">
        Suivants
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [pagination, setPagination] = useState<GalleryPhotoPage | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPhotos() {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getGalleryPhotosPage(page, PHOTOS_PER_PAGE);

        if (isMounted) {
          setPhotos(data.items);
          setPagination(data);
        }
      } catch (error) {
        console.error("Impossible de charger la galerie :", error);

        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadPhotos();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <main className="min-h-screen bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour à l’accueil
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <Images className="h-4 w-4" aria-hidden="true" />
              Galerie
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Un aperçu de notre univers
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
              Découvrez quelques moments, projets et réalisations qui illustrent
              notre quotidien chez G6Coders.
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GallerySkeleton />
            <GallerySkeleton />
            <GallerySkeleton />
            <GallerySkeleton />
            <GallerySkeleton />
            <GallerySkeleton />
          </div>
        )}

        {!isLoading && photos.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <figure
                  key={photo.id}
                  className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-4/3 overflow-hidden bg-muted">
                    <img
                      src={photo.image_url}
                      alt={photo.caption || "Photo de la galerie G6Coders"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {photo.caption && (
                    <figcaption className="p-5 text-base leading-7 text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            {pagination && (
              <Pagination
                pagination={pagination}
                onPrevious={() => setPage((currentPage) => currentPage - 1)}
                onNext={() => setPage((currentPage) => currentPage + 1)}
              />
            )}
          </>
        )}

        {!isLoading && photos.length === 0 && !hasError && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <Images
              className="mx-auto h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="mt-4 text-lg text-muted-foreground">
              Aucune photo n’est disponible pour le moment.
            </p>
          </div>
        )}

        {!isLoading && hasError && (
          <div className="rounded-2xl border bg-background p-10 text-center">
            <p className="text-lg text-muted-foreground">
              La galerie est momentanément indisponible. Veuillez réessayer plus
              tard.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
