import { taskApi } from "../../config/taskApi";

export const setBearerToken = (token: string) => {
  taskApi.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export const clearBearerToken = () => {
  taskApi.defaults.headers["Authorization"] = null;
};
