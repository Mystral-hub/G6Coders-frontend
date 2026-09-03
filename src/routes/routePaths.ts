export const ROUTES = {
  home: "/",
  gallery: "/gallery",
  projects: "/projects",
  admin: {
    login: "/admin/login",
    dashboard: "/admin",
    projects: "/admin/projects",
    announcements: "/admin/announcements",
    gallery: "/admin/gallery",
    testimonials: "/admin/testimonials",
    stats: "/admin/stats",
  },
} as const;
