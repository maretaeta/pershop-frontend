/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import product from "../components/product.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/product",
    component: product,
    children: [{ path: "/", redirect: { name: "Home" } }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
