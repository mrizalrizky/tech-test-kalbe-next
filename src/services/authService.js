import axiosPublic, { api } from "../lib/axios";
import axios from "../lib/axios";

export const authApi = {
  login: (requestBody) => axiosPublic.post("/auth/login", requestBody),
  logout: () => api.post("/auth/logout"),
};
