import { defineStore } from "pinia";
import { taskApi } from "../config/taskApi";
import User from "../models/User";
import SignupCredentials from "../models/SignupCredentials";
import SignupErrors from "../models/errors/SignupErrors";

export const useSignupStore = defineStore("signup", {
  state: () => ({
    user: null as User | null,
    errors: {} as SignupErrors,
  }),
  actions: {
    async signup({ name, email, password }: SignupCredentials) {
      this.errors = {};
      try {
        await taskApi.post("/auth/signup", {
          name,
          email,
          password,
        });
      } catch (e: any) {
        this.errors = {
          message: e.response.data.message,
          ...e.response.data.errors,
        };
      }
    },
  },
  getters: {
    hasError(state): boolean {
      return !!state.errors.message;
    },
    emailError(state): string | null {
      return state.errors.email?.length ? state.errors.email[0] : null;
    },
    nameError(state): string | null {
      return state.errors.name?.length ? state.errors.name[0] : null;
    },
    passwordError(state): string | null {
      return state.errors.password?.length ? state.errors.password[0] : null;
    },
  },
});
