import apiClient from "../axios.js";
export const userService = {
  getProfile: async () => {
    return await apiClient.get("/auth/profile");
  },
  getUser: async () => {
    return await apiClient.get("/auth/user");
  },
};
