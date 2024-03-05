import { defineStore } from "pinia";
import { taskApi } from "../config/taskApi";
import User from "../models/User";
import {
  clearBearerToken,
  setBearerToken,
} from "../helpers/auth/bearerTokenHelper";
import {
  clearTokenCookie,
  storeTokenCookie,
} from "../helpers/auth/cookieHelper";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    errors: [] as string[],
  }),
  actions: {
    async getToken({ email, password }: { email: string; password: string }) {
      try {
        const response = await taskApi.post(`/auth/login`, {
          email,
          password,
        });

        this.user = response.data.data.user;
        this.token = response.data.data.token;

        setBearerToken(this.token!);
        storeTokenCookie(this.token!);
      } catch (error: any) {
        this.errors = [error.response?.data?.message];
      }
    },
    async setToken(token: string) {
      this.token = token;
    },
    async getUser() {
      try {
        const response = await taskApi.get("/auth/user");
        this.user = response.data.data;
      } catch (e: any) {
        this.errors = ["Couldn't fetch your user"];
      }
    },
    async logout() {
      try {
        await taskApi.post("/auth/logout", {});
        clearBearerToken();
        clearTokenCookie();
        this.token = null;
      } catch (e: any) {
        this.errors = ["Had trouble logging you out."];
      }
    },
  },
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token;
    },
  },
});
