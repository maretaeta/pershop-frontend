/** @format */

// /** @format */

// import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";
// import Register from "../views/Register.vue";
// import EmptyLayout from "../views/EmptyLayout.vue";

// // Kasir
// import dashboardKasir from "../components/kasir/dashboard.vue";
// import dashboardAdmin from "../components/admin/Dashboard.vue";

// // Admin
// import Barang from "../components/admin/Barang.vue";

// const routes = [
//   { path: "/", name: "dashboardKasir", component: dashboardKasir },

//   {
//     path: "/dashboardAdmin",
//     name: "dashboardAdmin",
//     component: dashboardAdmin,
//   },

//   {
//     path: "/barang",
//     name: "Barang",
//     component: Barang,
//   },

//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//     meta: {
//       default: Login,
//       layout: EmptyLayout,
//     },
//   },

//   {
//     path: "/register",
//     name: "Register",
//     component: Register,
//     meta: {
//       default: Register,
//       layout: EmptyLayout,
//     },
//   },
// ];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EmptyLayout from "../views/EmptyLayout.vue";
import dashboardKasir from "../components/kasir/dashboard.vue";
import dashboardAdmin from "../components/admin/Dashboard.vue";
import Barang from "../components/admin/Barang.vue";
import History from "../components//admin/History.vue";

const routes = [
  {
    path: "/",
    name: "dashboardKasir",
    component: dashboardKasir,
  },

  {
    path: "/dashboardAdmin",
    name: "dashboardAdmin",
    component: dashboardAdmin,
  },

  { path: "/barang", 
    name: "Barang", 
    component: Barang 
  },

  {
    path:"/history",
    name: "History",
    component: History
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { default: Login, layout: EmptyLayout },
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
  if (to.meta.required) {
    const requiredData = localStorage.getItem("requiredData");
    if (requiredData) {
      next();
    } else {
      next("/empty");
    }
  } else {
    next();
  }
});

export default router;
