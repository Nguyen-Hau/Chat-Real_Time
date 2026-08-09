import axios from "axios";
import { API_BASE_URL } from "./config.js";

// 1. Quản lý AccessToken trong bộ nhớ RAM
let inMemoryToken = null;
// Ghi
export const setToken = (token) => {
  inMemoryToken = token;
};
// Đọc
export const getToken = () => {
  return inMemoryToken;
};

// 2. Khởi tạo Axios Instance
// Cấu trúc: axios.create() — tạo instance riêng với config mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Địa chỉ gốc của BE
  headers: {
    "Content-Type": "application/json", // Báo BE biết body là JSON
  },
  withCredentials: true, // Tự động gửi Cookie trong mỗi request
});

// 3. Request Interceptor: Đính kèm Token vào Header trước khi gửi request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Đính kèm vào Header
  }
  return config; // Cho request tiếp tục đi
});

// 4. Response Interceptor: Tự động xin lại Token mới khi AccessToken bị hết hạn (Lỗi 401)
apiClient.interceptors.response.use(
  (response) => response, // Nếu resquest thành công (200) -> Trả kết quả bình thường
  async (error) => {
    const originalResquest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshTokenApi = originalResquest.url?.includes(
      "/auth/refresh-token",
    );
    if (isUnauthorized && !originalResquest._retry && !isRefreshTokenApi) {
      originalResquest._retry = true;
      try {
        const response = await apiClient.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        setToken(newAccessToken);

        originalResquest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalResquest);
      } catch (error) {
        setToken(null);
        window.location.href = "index.html";
        return Promise.reject(refreshError);
      }
    }
    return Promise;
  },
);
export default apiClient;
