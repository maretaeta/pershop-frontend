/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EmptyLayout from "../views/EmptyLayout.vue";
import dashboardKasir from "../components/kasir/dashboard.vue";
import dashboardAdmin from "../components/admin/Dashboard.vue";
import Barang from "../components/admin/Barang.vue";
import History from "../components/admin/History.vue";
import { useAuthStore } from "../store/auth";
import Account from "../components/Account.vue";

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
    meta: { requiresAuth: true, role: "KASIR" },
  },

  {
    path: "/dashboardAdmin",
    name: "dashboardAdmin",
    component: dashboardAdmin,
    meta: { requiresAuth: true, role: "ADMIN" },
  },

  // {
  //   path: "/kasir",
  //   children: [
  //     {
  //       path: "/barang",
  //       name: "Barang",
  //       component: import("../components/admin/Barang.vue"),
  //     },
  //     {
  //       path: "/history",
  //       name: "History",
  //       component: import("../components/admin/History.vue"),
  //     },
  //   ],
  // },

  {
    path: "/barang",
    name: "Barang",
    component: Barang,
    meta: { requiresAuth: true, role: "ADMIN", role: "KASIR" },
  },

  {
    path: "/history",
    name: "History",
    component: History,
    meta: { requiresAuth: true, role: "ADMIN" },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { default: Register, layout: EmptyLayout },
  },

  { path: "/empty", name: "EmptyLayout", component: EmptyLayout },

  {
    path: "/account",
    name: "Account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated;
  const userRole = useAuthStore().role;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next("/");
    } else {
      const routeRole = to.meta.role;
      const userRole = to.meta.role;
      if (routeRole && userRole !== routeRole) {
        console.error("Unauthorized access! Role mismatch.");
        next("/");
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
