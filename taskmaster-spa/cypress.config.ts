import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081/",
    env: {
      defaultUser: {
        email: "user@taskmaster.test",
        password: "password"
      }
    },
  },
});
