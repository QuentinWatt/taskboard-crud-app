import Home from "../pages/Home.vue";
import Board from "../pages/Board.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import { authCheck } from "./guards/authCheck";

export const routes = [
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
  {
    path: "/sign-up",
    component: Signup,
  },
];
