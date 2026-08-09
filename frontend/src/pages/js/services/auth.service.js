import apiClient from "../axios.js";

export const authService = {
  signup: async (username, password, email, firstName, lastName, phone) => {
    return await apiClient.post("/auth/signup", {
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
    });
  },
  signin: async (username, password) => {
    return await apiClient.post("/auth/signin", { username, password });
  },
  logout: async () => {
    return await apiClient.post("/auth/logout");
  },
  refreshToken: async () => {
    return await apiClient.post("/auth/refresh-token");
  },
};
