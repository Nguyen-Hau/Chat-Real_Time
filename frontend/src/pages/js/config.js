import axios from "axios";
export const API_BASE_URL = "http://localhost:5001/api";

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

export default apiClient;
