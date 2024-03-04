import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Board from "../pages/Board.vue";
import Login from "../pages/Login.vue";
import { authCheck } from "./guards/authCheck";

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: [authCheck],
  },
  {
    path: "/board/:boardId",
    component: Board,
    beforeEnter: [authCheck],
  },
  {
    path: "/login",
    component: Login,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
