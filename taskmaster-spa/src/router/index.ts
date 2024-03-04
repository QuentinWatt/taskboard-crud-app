import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Board from "../pages/Board.vue";
import Boards from "../pages/Boards.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/boards/",
    component: Boards,
  },
  {
    path: "/board/:boardId",
    component: Board,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
