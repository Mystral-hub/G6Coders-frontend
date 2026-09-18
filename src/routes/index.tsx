import { createBrowserRouter } from "react-router-dom";

import { adminRoutes } from "@/routes/adminRoutes";
import { visitorRoutes } from "@/routes/visitorRoutes";

export const router = createBrowserRouter([
  ...visitorRoutes,
  ...adminRoutes,
]);
