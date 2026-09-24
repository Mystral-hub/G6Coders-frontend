import type { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/guards/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";

import AdminAnnouncementsPage from "@/pages/admin/AdminAnnouncementsPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminGalleryPage from "@/pages/admin/AdminGalleryPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminPartnersPage from "@/pages/admin/AdminPartnersPage";
import AdminProjectsPage from "@/pages/admin/AdminProjectsPage";
import AdminStatsPage from "@/pages/admin/AdminStatsPage";
import AdminTestimonialsPage from "@/pages/admin/AdminTestimonialsPage";

import { ROUTES } from "@/routes/routePaths";

export const adminRoutes: RouteObject[] = [
  {
    path: ROUTES.admin.login,
    element: <AdminLoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.admin.dashboard,
            element: <AdminDashboardPage />,
          },

          {
            path: ROUTES.admin.projects,
            element: <AdminProjectsPage />,
          },

          {
            path: ROUTES.admin.partners,
            element: <AdminPartnersPage />,
          },

          {
            path: ROUTES.admin.announcements,
            element: <AdminAnnouncementsPage />,
          },

          {
            path: ROUTES.admin.gallery,
            element: <AdminGalleryPage />,
          },

          {
            path: ROUTES.admin.testimonials,
            element: <AdminTestimonialsPage />,
          },

          {
            path: ROUTES.admin.stats,
            element: <AdminStatsPage />,
          },
        ],
      },
    ],
  },
];
