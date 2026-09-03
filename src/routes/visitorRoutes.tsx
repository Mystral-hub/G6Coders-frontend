import type { RouteObject } from "react-router-dom";

import VisitorLayout from "@/layouts/VisitorLayout";
import GalleryPage from "@/pages/visitor/GalleryPage";
import HomePage from "@/pages/visitor/HomePage";
import ProjectsPage from "@/pages/visitor/ProjectsPage";
import { ROUTES } from "@/routes/routePaths";

export const visitorRoutes: RouteObject[] = [
  {
    element: <VisitorLayout />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.gallery,
        element: <GalleryPage />,
      },
      {
        path: ROUTES.projects,
        element: <ProjectsPage />,
      },
    ],
  },
];
