import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081/",
    env: {
      apiUrl: "http://laravel_app/",
      defaultUser: {
        email: "user@taskmaster.test",
        password: "password"
      }
    },
    setupNodeEvents(on, config) {

    },
  },
});
