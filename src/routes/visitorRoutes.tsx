import type { RouteObject } from "react-router-dom";

import VisitorLayout from "@/layouts/VisitorLayout";
import HomePage from "@/pages/visitor/HomePage";
import { ROUTES } from "@/routes/routePaths";

export const visitorRoutes: RouteObject[] = [
  {
    element: <VisitorLayout />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
    ],
  },
];
