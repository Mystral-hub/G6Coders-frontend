import { createBrowserRouter } from "react-router-dom";

import { visitorRoutes } from "@/routes/visitorRoutes";

export const router = createBrowserRouter([...visitorRoutes]);
