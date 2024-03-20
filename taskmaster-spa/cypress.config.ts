import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081/",
    env: {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      defaultUser: {
        email: "user@taskmaster.test",
        password: "password"
      }
    },
  },
});
