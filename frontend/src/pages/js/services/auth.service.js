import apiClient from "../config.js";

export const authService = {
  signup: async (username, password, email, firstName, lastName) => {
    return await apiClient.post("/auth/signup", {
      username,
      password,
      email,
      firstName,
      lastName,
    });
  },
  signin: async (username, password) => {
    return await apiClient.post("/auth/signin", { username, password });
  },
  logout: async () => {
    return await apiClient.post("/auth/logout");
  },
};
