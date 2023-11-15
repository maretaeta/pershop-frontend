/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EmptyLayout from "../views/EmptyLayout.vue";
import dashboardKasir from "../components/kasir/dashboard.vue";
import dashboardAdmin from "../components/admin/Dashboard.vue";
import Barang from "../components/admin/Barang.vue";
import History from "../components/admin/History.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { default: Login, layout: EmptyLayout },
  },

  {
    path: "/dashboardKasir",
    name: "dashboardKasir",
    component: dashboardKasir,
    meta: { requiresAuth: true, role: "kasir" },
  },

  {
    path: "/dashboardAdmin",
    name: "dashboardAdmin",
    component: dashboardAdmin,
    meta: { requiresAuth: true, role: "admin" },
  },

  {
    path: "/kasir",
    children: [
      {
        path: "/barang",
        name: "Barang",
        component: import("../components/admin/Barang.vue"),
      },
      {
        path: "/history",
        name: "History",
        component: import("../components/admin/History.vue"),
      },
    ],
  },

  {
    path: "/barang",
    name: "Barang",
    component: Barang,
  },

  {
    path: "/history",
    name: "History",
    component: History,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { default: Register, layout: EmptyLayout },
  },

  { path: "/empty", name: "EmptyLayout", component: EmptyLayout },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");

    if (!token) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
