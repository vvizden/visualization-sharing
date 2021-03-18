import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  { path: "/", component: () => import("@/views/Welcome.vue") },
  { path: "/Bar", component: () => import("@/views/Bar.vue") },
  { path: "/Coordinate", component: () => import("@/views/Coordinate.vue") },
  { path: "/Map", component: () => import("@/views/Map.vue") },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
