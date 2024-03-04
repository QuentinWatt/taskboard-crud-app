import axios from "axios";

export const taskApi = axios.create({
  baseURL: "http://taskmaster.test/api/",
  timeout: 1000,
});
