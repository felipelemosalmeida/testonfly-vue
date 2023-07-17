
const routes = [
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/Auth/AuthLayout.vue"),
    children: [{ path: "/login", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/cadastrar",
    component: () => import("layouts/Auth/AuthLayout.vue"),
    children: [
      { path: "/cadastrar", component: () => import("pages/Register.vue") },
    ],
  },

  {
    path: "/user/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/user/profile", component: () => import("pages/user/Profile.vue") },
    ],
  },

  {
    path: "/expenses/create",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/expenses/create", component: () => import("pages/expenses/Create.vue") },
    ],
  },
  {
    path: "/expenses/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/expenses/:id", component: () => import("pages/expenses/Edit.vue") },
    ],
  },

  {
    path: "/expenses",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/expenses", component: () => import("pages/expenses/List.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes
