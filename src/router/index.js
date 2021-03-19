import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  { path: "/", component: () => import("@/views/Welcome.vue") },
  { path: "/Bar", component: () => import("@/views/Bar.vue") },
  { path: "/Coordinate", component: () => import("@/views/Coordinate.vue") },
  { path: "/SVGD3Map", component: () => import("@/views/SVGD3Map.vue") },
  { path: "/CanvasD3Map", component: () => import("@/views/CanvasD3Map.vue") },
  { path: "/CanvasMap", component: () => import("@/views/CanvasMap.vue") },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
