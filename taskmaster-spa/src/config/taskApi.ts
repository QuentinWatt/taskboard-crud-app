import axios from "axios";

export const taskApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL ?? "",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});
